# post-export: create subpath folders with index.html (default: en)
cd build
# root index
[ -f en.html ] && cp -f en.html index.html
# per-route
find . -type f -name "*.en.html" | while read -r f; do
  base="${f%.en.html}"
  mkdir -p "$base"
  cp -f "$f" "$base/index.html"
done
# repeat for zh if you want /zh/... paths too:
find . -type f -name "*.zh.html" | while read -r f; do
  base="${f%.zh.html}"
  mkdir -p "zh${base#.}"              # ./about → zh/about
  cp -f "$f" "zh${base#.}/index.html"
done
