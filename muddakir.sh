#!/bin/bash

DATA_DIR="${MUDDAKIR_DATA:-$HOME/.muddakir}"

mkdir -p "$DATA_DIR"

docker run --rm -v "$DATA_DIR:/app/data" muddakir "$@"