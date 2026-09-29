#!/usr/bin/env bash
# Downloads the 4 chosen Unsplash images and converts them to WebP, locally.
# Run on your machine (needs internet). Converter: uses cwebp if present,
# else ImageMagick `magick`/`convert`, else leaves the .jpg in place.
#   brew install webp        # for cwebp     (recommended)
#   brew install imagemagick # alternative
set -euo pipefail
cd "$(dirname "$0")/img"

# name|unsplash-photo-id|width
rows=(
  "shutters-plantation|1483247416020-58799b6de4c1|1100"
  "fabric-samples|1668956343245-c6330043be83|1100"
  "cushions-piped|1628512743826-2c28a508ad5e|1100"
  "band-linen-texture|1705290304455-35ffb433f560|1600"
)
to_webp () { # $1 src.jpg  $2 out.webp
  if command -v cwebp >/dev/null; then cwebp -q 80 "$1" -o "$2" && rm -f "$1"
  elif command -v magick >/dev/null; then magick "$1" -quality 80 "$2" && rm -f "$1"
  elif command -v convert >/dev/null; then convert "$1" -quality 80 "$2" && rm -f "$1"
  else echo "  (no webp tool — keeping $1; install webp or imagemagick)"; fi
}
for r in "${rows[@]}"; do
  IFS='|' read -r name id w <<< "$r"
  url="https://images.unsplash.com/photo-${id}?w=${w}&q=80&fit=max&auto=format&fm=jpg"
  echo "→ $name"
  curl -fsSL "$url" -o "${name}.jpg"
  to_webp "${name}.jpg" "${name}.webp"
done
echo "Done. Files in: $(pwd)"
ls -la *.webp 2>/dev/null || true
