# Browser speech timing: historical and current workflows

This directory separates the 2026-09-14 **single-model historical test** from the 2026-10-14 **current two-checkpoint English workflow**. Both contain observed wall-clock timings on one machine. Neither predicts a visitor's time or measures CPU time, recognition accuracy or Instagram fetching.

## Current workflow — measured 2026-10-14

Raw data: [current-english-browser-20261014.csv](current-english-browser-20261014.csv). It contains **22 attempted runs**: eight completed runs from initial series A, one interrupted attempt with no completed timer, and 13 completed reruns in series B. No initial observations or failure have been removed.

Series B closes the isolated browser after each run, retaining only the dedicated profile's Transformers Cache API resources. Its 13 runs comprise one cold 11-second run and three repeats at each of 11, 30, 60 and 120 seconds.

| Audio construction | Resource state | Completed observations | Wall-clock minimum | Median (calculated) | Maximum |
| --- | --- | ---: | ---: | ---: | ---: |
| 11 s | Empty Transformers resource cache | 1 | 21.740 s | 21.740 s | 21.740 s |
| 11 s | Model resources cached; new browser and model instances | 3 | 10.720 s | 10.794 s | 11.010 s |
| 30 s | Model resources cached; new browser and model instances | 3 | 12.814 s | 13.275 s | 13.531 s |
| 60 s | Model resources cached; new browser and model instances | 3 | 20.077 s | 23.684 s | 27.014 s |
| 120 s | Model resources cached; new browser and model instances | 3 | 33.171 s | 34.288 s | 35.799 s |

The median and extrema are arithmetic summaries of the raw observations, not separately measured timings. With only three repeats there is no confidence interval or percentile claim. All 13 reruns produced editable non-empty text. **The three 120-second constructions failed complete subtitle timing validation, so SRT/VTT and editor transfer were disabled while text remained available.** These are successful text-result timings, not successful-subtitle quality claims. The final screenshot reported an invalid time boundary at cue 17; missing times were not estimated.

### Environment and version

| Item | Recorded value |
| --- | --- |
| Page | Local copy of `/audio-to-text`, served at 127.0.0.1; no Instagram/media lookup |
| Speech code commit | `2219e6d39bf915a9b94d51403ac769387c96d60b` |
| Library | Transformers.js 3.0.0, original CDN import |
| Language check | `onnx-community/whisper-tiny`, first 20 seconds, decoder start token then one generated language token |
| Detection revision | `ff4177021cc41f7db950912b73ea4fdf7d01d8e7` |
| English transcription | `onnx-community/whisper-tiny.en`, 30-second chunks with 5-second strides and segment timestamps |
| Transcription revision | `2575352d61be1bf7225cf8f8b268a4678025fc58` |
| Model files | `onnx/encoder_model_quantized.onnx` and `onnx/decoder_model_merged_quantized.onnx` in each pinned model repository; q8 WASM |
| Browser | Google Chrome 155.0.8059.40, headless, 1280×900 |
| OS | Windows 11 Pro 10.0.28000 |
| Device | AMD EPYC 9754 as reported by the VM; 1 assigned core / 2 logical processors; approximately 4 GB visible RAM |
| Network | Existing connection to public model/CDN endpoints; bandwidth, latency, proxy routing and OS cache were not separately measured |
| Background conditions | Shared development machine; light source/document checks occurred during the series. It was not an idle, thermally controlled laboratory environment |
| Sample | Existing public JFK sample from the Transformers.js documentation, decoded to 16 kHz mono and repeated/truncated to exactly 11/30/60/120 seconds; PCM16 constructions, SHA256 per row |

Source audio: [JFK sample in the Transformers.js documentation dataset](https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/jfk.wav). Only public sample identifiers, content hashes, counts and timings are recorded in the CSV. No user recording, filename, transcript or URL is included.

### Timer and instrumentation

Start is the browser's captured Transcribe button click. Stop is after the real task settles, controls are enabled and two animation frames allow the interactive result to paint. File selection and audio-construction preparation are outside the timer. The speech logic and result/export helpers match the stated commit. The page's historical benchmark labels were being corrected during the measurement session; this did not alter the speech logic. The local harness adds timing wrappers and pins model revisions, without replacing model results or changing recognition options.

Directly observed stage fields:

- `decode_seconds`: reading the local File, AudioContext decode, mono extraction and context cleanup.
- `previous_model_dispose_seconds`: prior English-instance release call, normally empty after a fresh browser start.
- `language_load_seconds`: detector pipeline creation, including resource retrieval and initialization together.
- `language_features_seconds` and `language_inference_seconds`: detector feature processing and its one-token generate call.
- `language_check_total_seconds`: the entire detector operation, **including** its loader, features, generation, decision and disposal. It overlaps those subfields; do not add them all together.
- `recognition_load_seconds`: English pipeline creation, including retrieval and initialization together.
- `recognition_inference_seconds`: the full ASR pipeline call, including features, chunk generation and timestamp/text decoding; it is not isolated ONNX kernel or CPU time.
- `render_sync_seconds`: synchronous result construction/rendering. The total also includes task cleanup and paint frames.

Separate download time and separate initialization time are **not measured**. URL fetching is **not applicable** to these local-file runs. Blank numeric fields in interrupted attempt A9 mean unavailable, not zero.

Resource cache is distinct from instance reuse: production releases the English instance before each language check, then disposes the detector before loading English again. No current complete job can reuse both retained checkpoints. Transformers Cache API was empty for each series' cold run; later series B runs had zero observed Hugging Face model/config requests and the expected model entries already cached. Playwright's timing interception disables ordinary browser HTTP caching; the Cache API remains active. Thus “cached” here applies to model resources, not all CDN/WASM resources or OS caches. Library import happens before clicking, while runtime retrieval during loader calls can still contribute.

Series A reused one browser and reloaded pages. It completed eight observations before the next 60-second attempt coincided with Windows memory exhaustion; shell initialization then failed, and the test process group was interrupted. A9 has no completed timer. Series B reran the full matrix with browser shutdown between runs and completed all 13. This does not certify memory safety on phones or establish whether the initial exhaustion arose solely from application, harness, or other machine processes.

### Reproduction

Use the fixed library/model revisions, decoded sample constructions, device/browser and timer boundaries above. On an isolated profile, select a local sample, capture the click timestamp with `performance.now()`, wrap the listed actual operations with before/after timestamps in `try/finally`, and stop after the task re-enables controls and paints its result. Preserve the profile's Cache API while closing the full browser between resource-cached repeats. Record failed/empty/interrupted runs too. Do not bypass language detection or keep the English model resident merely to match the historical table. Inspect actual cached keys and network requests instead of assuming a second run is fully warm.

The local timing harness and full execution logs are review artifacts outside the application repository, so they are not public routes. The raw CSV and these method notes are the public reference resources.

## Historical single-model workflow — 2026-09-14

Original raw data, unchanged: [whisper-tiny-en-browser-benchmark.csv](whisper-tiny-en-browser-benchmark.csv).

| Run | Audio length | Historical wall clock | Historical model state | Output characters |
| --- | --- | ---: | --- | ---: |
| 1 | 11 s | 16.89 s | Model loading included | 120 |
| 2 | 11 s | 6.49 s | English model already in memory | 120 |
| 3 | 30 s | 8.98 s | English model already in memory | 318 |
| 4 | 60 s | 16.06 s | English model already in memory | 603 |
| 5 | 120 s | 28.58 s | English model already in memory | 1160 |

The original method reports click → visible non-empty transcript, covering audio decoding, chunk processing and rendering but excluding file selection. Run 1 also included model retrieval and initialization; runs 2–5 retained the English model. It did not measure today's additional language checkpoint, model disposal/reinitialization or Instagram lookup/download.

The originally reported environment was `/audio-to-text` on instascript.app; whisper-tiny.en q8 WASM, roughly 30-second chunks; headless Microsoft Edge 1280×900; Windows 11 build 26200; Intel Core Family 6 Model 158; residential network through a local HTTP proxy. Those historical details are retained as reported and were not remeasured in this session. The exact historical library version, model revision, stage timings, repeat variance and accuracy were not recorded.

The previous `16.89 − 6.49 = 10.4 s` calculation is only a difference between two observed totals. **It is not a measured download/init duration or a one-off initialization guarantee.** Dividing 28.58 by 120 gives approximately 0.238 wall-clock seconds per audio second in that single historical run; it is not CPU time. Different devices and workflows prevent attributing differences between these historical and current rows to any particular optimization.

All historical lengths used the same public short clip repeated for the longer recordings, one run per data point. No average, accuracy, variance or visitor performance estimate can be inferred.

## API and MCP compatibility

`GET /api/benchmark` and MCP `get_benchmark` retain their five historical rows and existing `source_url`, `rows`, numeric and boolean fields. Additive metadata now names the historical date/pipeline and links `current_source_url` to the separate current CSV and `method_url` to this file. The closest-length option selects a historical observation; it does not interpolate or predict an unmeasured duration. The static historical fallback has the same provenance. No new transcription capability or multilingual beta is enabled by this benchmark work.
