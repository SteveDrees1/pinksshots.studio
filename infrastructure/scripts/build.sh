#!/usr/bin/env bash
# Wrapper for pnpm build. Runs real build, plays sound on failure.
set -e
cd "$(dirname "$0")/../.."

_run_build() {
  pnpm -r run build
}

_play_trap() {
  [[ -n "${CI}" ]] && return
  [[ "${TERM}" = "dumb" ]] && return
  [[ ! -t 1 ]] && return

  if [[ -f "infrastructure/scripts/.x/trap.mp3" ]]; then
    (command -v afplay >/dev/null && afplay "infrastructure/scripts/.x/trap.mp3" &) 2>/dev/null || true
  elif command -v say >/dev/null 2>&1; then
    (say "It's a trap!" &) 2>/dev/null || true
  elif command -v espeak >/dev/null 2>&1; then
    (espeak "It's a trap!" &) 2>/dev/null || true
  fi
}

_run_build || { _play_trap; exit 1; }
