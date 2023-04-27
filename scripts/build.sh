#!/bin/bash
set -e

SCRIPT_DIR="$(
  cd "$(dirname "${BASH_SOURCE[0]}")"
  pwd -P
)"
cd $SCRIPT_DIR/..

./scripts/login.sh

npm install

npm run build
