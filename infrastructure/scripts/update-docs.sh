#!/usr/bin/env bash
# Doc placeholder (invoked by run.sh and full.sh). Add project-specific doc generation here.
set -e
cd "$(dirname "$0")/../.."
echo "Docs: README.md, CHANGELOG.md, RELEASENOTES.md, infrastructure/*/README.md"
# Future: generate API docs, typedoc, etc.
