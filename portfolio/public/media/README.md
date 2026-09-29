# Hero animation

User-supplied website build animation, used by `HeroAnimation.astro` on both homepages.
The animation's embedded labels are Dutch; the playback controls and accessible description follow the page language.

- Source: 16 seconds, 1280 x 1254, 60 fps H.264, 1,828,576 bytes; no audio.
- Web MP4: 1,405,804 bytes (23.1% smaller), original dimensions and frame rate retained.
- Encoding: `ffmpeg -i input.mp4 -an -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -movflags +faststart hero-build.mp4`.
- Poster: frame at 9 seconds, WebP quality 85, 44,120 bytes.
- Full-clip SSIM against the supplied source: 0.997483.

The component attaches the video source and starts muted inline playback when visible.
It loops, pauses offscreen/in a hidden tab, and preserves a manual pause.
Reduced-motion and Save-Data preferences suppress automatic video loading; users can still choose Play.
Without JavaScript, the poster remains visible.
