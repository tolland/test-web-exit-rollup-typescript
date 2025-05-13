#!/bin/bash
set -eu
set -o pipefail

for scenario in base no-base-url with-base-url typescript-only js-only; do
    echo "Testing scenario: $scenario"
    cd "$scenario"
    pnpm install
    pnpm build
    echo "Generated files in $scenario/dist:"
    find dist -type f -name "*.js" -o -name "*.map" | sort
    echo "Source map URLs in JS files:"
    grep -r "sourceMappingURL" dist/
    echo "Source paths in map files:"
    grep -r '"sources":' dist/
    echo "----------------------------------------"
    cd ..
done 