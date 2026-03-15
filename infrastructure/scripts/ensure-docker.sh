#!/usr/bin/env bash
# Ensure Docker/Colima is running before starting containers.
set -e
cd "$(dirname "$0")/../.."

if docker info &>/dev/null 2>&1; then
  echo "Docker is running."
  exit 0
fi

echo "Docker daemon not running. Attempting to start Colima..."
if command -v colima >/dev/null 2>&1; then
  colima start
  echo "Waiting for Docker to be ready..."
  for i in $(seq 1 30); do
    if docker info &>/dev/null 2>&1; then
      echo "Docker is ready."
      exit 0
    fi
    sleep 2
  done
  echo "Docker failed to start. Run 'colima start' manually and try again."
  exit 1
else
  if [[ "$(uname)" = "Darwin" ]] && [[ -d "/Applications/Docker.app" ]]; then
    echo "Starting Docker Desktop..."
    open -a Docker
    echo "Waiting for Docker to be ready..."
    for i in $(seq 1 60); do
      if docker info &>/dev/null 2>&1; then
        echo "Docker is ready."
        exit 0
      fi
      sleep 2
    done
  fi
  echo "Docker not available. Start Docker Desktop or run 'colima start', then try again."
  exit 1
fi
