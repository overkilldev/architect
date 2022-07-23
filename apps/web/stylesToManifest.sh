#!/usr/bin/env bash

sed -e '$ d' ./build/manifest.json > ./build/manifest-temp.json

STYLES=$(cd ./build && ls assets/*.css)

echo ,\"styles.css\": \"${STYLES}\"} >> ./build/manifest-temp.json

mv -f ./build/manifest-temp.json ./build/manifest.json
