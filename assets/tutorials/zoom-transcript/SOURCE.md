# Public practice sample

Eleven-second public-domain excerpt from John F. Kennedy’s January 20, 1961 inaugural address. See the recording provenance. The MP4 uses a neutral picture; it is not a platform export or meeting. The sample demonstrates this codec in the tested browser, not every file configuration, recording length or multi-speaker podcast.

Source details: [original WAV provenance](https://instascript.app/assets/demo/SOURCE.md).

File: kennedy-practice.mp4

SHA256: 401ca32de7e9b70d12f5db4fc8a794e5f176ec9f7aadb8fbaad99fe30c43c3a0

Conversion: ffmpeg version 7.1-essentials_build-www.gyan.dev Copyright (c) 2000-2024 the FFmpeg developers

Parameters: `-y -i kennedy-1961.wav -f lavfi -i color=c=0xf5f7fa:s=320x180:r=10 -c:v libx264 -pix_fmt yuv420p -c:a aac -b:a 96k -shortest kennedy-practice.mp4`

Inspection:
```text
Duration: 00:00:17.80, start: 0.000000, bitrate: 64 kb/s
  Stream #0:0[0x1](und): Video: h264 (High) (avc1 / 0x31637661), yuv420p(progressive), 320x180 [SAR 1:1 DAR 16:9], 1 kb/s, 10 fps, 10 tbr, 10240 tbn (default)
      Metadata:
        handler_name    : VideoHandler
        vendor_id       : [0][0][0][0]
        encoder         : Lavc61.19.100 libx264
  Stream #0:1[0x2](und): Audio: aac (LC) (mp4a / 0x6134706D), 44100 Hz, stereo, fltp, 96 kb/s (default)
      Metadata:
        handler_name    : SoundHandler
        vendor_id       : [0][0][0][0]
```

Actual local recognition was tested on October 23, 2026. This sample is not a benchmark or a guarantee for other encodings, lengths or platforms. No endorsement is implied.
