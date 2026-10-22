# Public practice sample

Eleven-second public-domain excerpt from John F. Kennedy’s January 20, 1961 inaugural address. See the recording provenance. The sample demonstrates this codec in the tested browser, not every file configuration, recording length or multi-speaker podcast.

Source details: [original WAV provenance](https://instascript.app/assets/demo/SOURCE.md).

File: kennedy-practice.mp3

SHA256: bc4d4645181630e7e4d12755a523dcb4e78086372e8f9d875e6880b0cdf2fc59

Conversion: ffmpeg version 7.1-essentials_build-www.gyan.dev Copyright (c) 2000-2024 the FFmpeg developers

Parameters: `-y -i kennedy-1961.wav -c:a libmp3lame -b:a 96k kennedy-practice.mp3`

Inspection:
```text
Duration: 00:00:11.05, start: 0.025057, bitrate: 96 kb/s
  Stream #0:0: Audio: mp3 (mp3float), 44100 Hz, stereo, fltp, 96 kb/s
      Metadata:
        encoder         : Lavc61.19
```

Actual local recognition was tested on October 23, 2026. This sample is not a benchmark or a guarantee for other encodings, lengths or platforms. No endorsement is implied.
