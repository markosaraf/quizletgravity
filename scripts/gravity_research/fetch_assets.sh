#!/bin/bash
# Download original Quizlet Gravity assets from the Wayback Machine
OUT=/home/z/my-project/scripts/gravity_research/orig/assets
mkdir -p "$OUT/asteroids" "$OUT/planets"
BASE="https://assets.quizlet.com/a/j/dist/app/i/gravity"

fetch() {
  local path="$1"; local dir="$2"
  local name=$(basename "$path")
  # Try multiple snapshot dates
  for ts in 20231109135624 20230928234054 20240106112521 20230601152748 2022; do
    ts=$(echo $ts | cut -c1-14)
    url="https://web.archive.org/web/${ts}id_/${BASE}/${path}"
    code=$(curl -sL --max-time 40 -o "${OUT}/${dir}/${name}" -w "%{http_code}" "$url" 2>/dev/null)
    ftype=$(file -b "${OUT}/${dir}/${name}" 2>/dev/null)
    if [[ "$code" == "200" && "$ftype" == PNG* ]]; then
      echo "OK  $name ($code, $ftype)"
      return 0
    fi
  done
  echo "FAIL $name (last code: $code, $ftype)"
  rm -f "${OUT}/${dir}/${name}"
  return 1
}

fetch "asteroids/BlueLargeAsteroid.7e1ab2f869cf89e.png" asteroids
fetch "asteroids/BlueLargeAsteroid@2x.f6b902f06cd6ea4.png" asteroids
fetch "asteroids/RedLargeAsteroid.c108a3a203a8cca.png" asteroids
fetch "asteroids/RedLargeAsteroid@2x.467b36b0d344501.png" asteroids
fetch "asteroids/IntroRedAsteroid.5653074ea78dccb.png" asteroids
fetch "asteroids/IntroRedAsteroid@2x.98e37c3b207d887.png" asteroids
fetch "intro-bg.387e6732387c12a.jpg" . 
fetch "intro-bg@2x.e1cab4f796d3301.jpg" .
fetch "stars.109ec79091c1f09.jpg" .
fetch "planets/level1-placeholder.ea4b94e649865cc.png" planets
for i in 1 2 3 4 5 6 7 8 9 10; do
  case $i in
    1) h=6b9a2ca90f7ba5e;; 2) h=0a74a6bd7817131;; 3) h=b66c0f0fc26a3e3;; 4) h=ec6e59a76389eb2;;
    5) h=a75ba07e0f9282c;; 6) h=d479d51b9579bdb;; 7) h=6055608ea50094a;; 8) h=c06fcb13f30750a;;
    9) h=85d6badb4097bd6;; 10) h=d1d89b47ca65b8c;;
  esac
  fetch "planets/level${i}.${h}.png" planets
done
echo "=== done ==="
ls -la "$OUT" "$OUT/asteroids" "$OUT/planets" 2>/dev/null
