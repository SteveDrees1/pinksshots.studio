#!/usr/bin/env bash
# Remove from git index any files that match .gitignore (stops tracking them).
set -e
cd "$(dirname "$0")/../.."

TRACKED_IGNORED=$(git ls-files -i --exclude-standard 2>/dev/null || true)
if [[ -z "$TRACKED_IGNORED" ]]; then
  echo "No ignored files are currently tracked."
  exit 0
fi

echo "Removing ignored files from git index..."
echo "$TRACKED_IGNORED" | while IFS= read -r f; do
  [[ -n "$f" ]] && git rm --cached "$f" 2>/dev/null || true
done
echo "Done. Run 'git status' to review. Commit to stop tracking these files."
