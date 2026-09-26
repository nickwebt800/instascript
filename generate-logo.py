"""
Generate InstaScript product logo - 512x512 PNG
Instagram gradient + InstaScript text + waveform icon
"""
from PIL import Image, ImageDraw, ImageFont
import math
import os

SIZE = 512

# Instagram gradient colors (top-left to bottom-right)
GRADIENT_COLORS = [
    (131, 58, 180),    # #833AB4 purple
    (193, 53, 132),    # #C13584 pink-purple
    (253, 29, 29),     # #FD1D1D red-pink
    (247, 119, 55),    # #F77737 orange
    (252, 175, 69),    # #FCAF45 yellow-orange
]

def make_gradient(size):
    """Create diagonal Instagram gradient"""
    img = Image.new('RGB', (size, size), GRADIENT_COLORS[0])
    draw = ImageDraw.Draw(img)

    # Diagonal gradient from top-left to bottom-right
    n = len(GRADIENT_COLORS)
    for y in range(size):
        # Calculate color at this position (0.0 to 1.0)
        # Add slight curve for more visual interest
        t = (y / size)
        # Find which two colors to interpolate between
        pos = t * (n - 1)
        idx = int(pos)
        if idx >= n - 1:
            idx = n - 2
            frac = 1.0
        else:
            frac = pos - idx
        c1 = GRADIENT_COLORS[idx]
        c2 = GRADIENT_COLORS[idx + 1]
        r = int(c1[0] + (c2[0] - c1[0]) * frac)
        g = int(c1[1] + (c2[1] - c1[1]) * frac)
        b = int(c1[2] + (c2[2] - c1[2]) * frac)
        draw.line([(0, y), (size, y)], fill=(r, g, b))

    return img

def draw_waveform(draw, center_x, center_y, width, height, color):
    """Draw a simple audio waveform icon"""
    # 9 vertical bars, varying heights following a sine-like pattern
    bar_count = 9
    bar_width = width // (bar_count * 2)
    spacing = bar_width
    heights = [0.4, 0.6, 0.85, 1.0, 0.7, 0.95, 0.75, 0.55, 0.35]
    total_width = bar_count * bar_width + (bar_count - 1) * spacing
    start_x = center_x - total_width // 2

    for i in range(bar_count):
        bar_h = int(height * heights[i])
        x = start_x + i * (bar_width + spacing)
        # Rounded top bar
        draw.rounded_rectangle(
            [x, center_y - bar_h // 2, x + bar_width, center_y + bar_h // 2],
            radius=bar_width // 2,
            fill=color
        )

def draw_text(draw, text, font_path, center_x, center_y, color):
    """Draw centered text"""
    font = ImageFont.truetype(font_path, 80)
    bbox = draw.textbbox((0, 0), text, font=font)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]
    x = center_x - text_w // 2 - bbox[0]
    y = center_y - text_h // 2 - bbox[1]
    draw.text((x, y), text, fill=color, font=font)

def draw_subtitle(draw, text, font_path, center_x, center_y, color):
    """Draw smaller subtitle text"""
    font = ImageFont.truetype(font_path, 28)
    bbox = draw.textbbox((0, 0), text, font=font)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]
    x = center_x - text_w // 2 - bbox[0]
    y = center_y - text_h // 2 - bbox[1]
    draw.text((x, y), text, fill=color, font=font)

# Create base
img = make_gradient(SIZE)
draw = ImageDraw.Draw(img)

# Add a subtle inner rounded corner effect by drawing a slightly darker rounded rect
# Actually skip this to keep it clean

# Draw waveform icon (top portion)
waveform_y = 175
draw_waveform(draw, SIZE // 2, waveform_y, 280, 90, (255, 255, 255))

# Draw "InstaScript" main text (middle)
text_y = 290
draw_text(draw, "InstaScript", "C:/Windows/Fonts/impact.ttf", SIZE // 2, text_y, (255, 255, 255))

# Draw subtitle (bottom)
subtitle_y = 380
draw_subtitle(draw, "INSTAGRAM & VIDEO TRANSCRIPT", "C:/Windows/Fonts/arialbd.ttf", SIZE // 2, subtitle_y, (255, 255, 255, 200))

# Save
output_dir = "C:/Users/Administrator/workbuddy-ai/oversea_tools/instascript-repo/assets"
os.makedirs(output_dir, exist_ok=True)
output_path = os.path.join(output_dir, "logo-512.png")
img.save(output_path, "PNG", optimize=True)
print(f"Saved: {output_path}")
print(f"Size: {os.path.getsize(output_path)} bytes")
print(f"Dimensions: {SIZE}x{SIZE}")

# Also create a smaller 256x256 version for profile pictures
small = img.resize((256, 256), Image.LANCZOS)
small_path = os.path.join(output_dir, "logo-256.png")
small.save(small_path, "PNG", optimize=True)
print(f"Saved: {small_path}")