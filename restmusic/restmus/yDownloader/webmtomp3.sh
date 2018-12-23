#!/usr/bin/env bash
quoted="$(printf " %q" "$1")"
echo quoted
eval ffmpeg -i "${quoted}.webm" -vn -acodec libmp3lame -ac 2 -qscale:a 4 -ar 48000 "$quoted.mp3"