#!/usr/bin/env bash
# Cleanup script to reclaim disk space by removing installed node runtime and node_modules.
# Everything installed for this project is strictly isolated to .tools and node_modules.

set -e

echo "=== Portfolio Disk Space Cleanup ==="
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
cd "$DIR"

echo "Current sizes:"
du -sh .tools 2>/dev/null || echo "No .tools found"
du -sh node_modules 2>/dev/null || echo "No node_modules found"
du -sh dist 2>/dev/null || echo "No dist found"

read -p "Are you sure you want to remove .tools and node_modules? [y/N] " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "Removing .tools/ ..."
  rm -rf .tools
  echo "Removing node_modules/ ..."
  rm -rf node_modules
  echo "Removing dist/ ..."
  rm -rf dist
  echo "Cleanup complete! All toolchain artifacts and packages have been removed."
  echo "To restore them at any time, run: export PATH=\"\$PWD/.tools/bin:\$PATH\""
fi
