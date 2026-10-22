# Public practice sample

Eleven-second public-domain excerpt from John F. Kennedy’s January 20, 1961 inaugural address. See the recording provenance. The sample demonstrates this codec in the tested browser, not every file configuration, recording length or multi-speaker podcast.

Source details: [original WAV provenance](https://instascript.app/assets/demo/SOURCE.md).

File: kennedy-practice.ogg

SHA256: f207c73fa3883f963c52fc034ec53ea10666bbba25edfa2389d604806c07755b

Conversion: ffmpeg version 7.1-essentials_build-www.gyan.dev Copyright (c) 2000-2024 the FFmpeg developers

Parameters: `-y -i kennedy-1961.wav -c:a libopus -b:a 64k kennedy-practice.ogg`

Inspection:
```text
Duration: 00:00:11.01, start: 0.000000, bitrate: 57 kb/s
  Stream #0:0: Audio: opus, 48000 Hz, stereo, fltp
      Metadata:
        encoder         : Lavc61.19.100 libopus
```

Actual local recognition was tested on October 23, 2026. This sample is not a benchmark or a guarantee for other encodings, lengths or platforms. No endorsement is implied.
