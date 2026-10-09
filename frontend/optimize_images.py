from pathlib import Path
from PIL import Image

PUBLIC_DIR = Path("public")

QUALITY = 82
MAX_SIZE = 2560

total_before = 0
total_after = 0
converted = 0

for source in PUBLIC_DIR.rglob("*"):
    if source.suffix.lower() not in {".jpg", ".jpeg"}:
        continue

    destination = source.with_suffix(".webp")

    try:
        original_size = source.stat().st_size

        with Image.open(source) as image:
            image.thumbnail(
                (MAX_SIZE, MAX_SIZE),
                Image.Resampling.LANCZOS
            )

            image.save(
                destination,
                "WEBP",
                quality=QUALITY,
                method=6,
            )

            width, height = image.size

        new_size = destination.stat().st_size

        total_before += original_size
        total_after += new_size
        converted += 1

        print(
            f"{source} | "
            f"{original_size / 1024 / 1024:.2f} MB -> "
            f"{new_size / 1024 / 1024:.2f} MB | "
            f"{width}x{height}"
        )

    except Exception as error:
        print(f"ERROR: {source}: {error}")

print()
print(f"Converted: {converted} images")
print(f"Before: {total_before / 1024 / 1024:.2f} MB")
print(f"After:  {total_after / 1024 / 1024:.2f} MB")

if total_before:
    reduction = (1 - total_after / total_before) * 100
    print(f"Reduction: {reduction:.1f}%")