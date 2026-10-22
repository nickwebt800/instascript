# Public practice sample

Eleven-second public-domain excerpt from John F. Kennedy’s January 20, 1961 inaugural address. See the recording provenance. The sample demonstrates this codec in the tested browser, not every file configuration, recording length or multi-speaker podcast.

Source details: [original WAV provenance](https://instascript.app/assets/demo/SOURCE.md).

File: kennedy-practice.m4a

SHA256: 05a977cb91597f9c7bf34e152253d781ad50e417f20bc422d1ead2bf03595365

Conversion: ffmpeg version 7.1-essentials_build-www.gyan.dev Copyright (c) 2000-2024 the FFmpeg developers

Parameters: `-y -i kennedy-1961.wav -c:a aac -b:a 96k kennedy-practice.m4a`

Inspection:
```text
Duration: 00:00:11.00, start: 0.000000, bitrate: 98 kb/s
  Stream #0:0[0x1](und): Audio: aac (LC) (mp4a / 0x6134706D), 44100 Hz, stereo, fltp, 96 kb/s (default)
      Metadata:
        handler_name    : SoundHandler
        vendor_id       : [0][0][0][0]
```

Actual local recognition was tested on October 23, 2026. This sample is not a benchmark or a guarantee for other encodings, lengths or platforms. No endorsement is implied.
