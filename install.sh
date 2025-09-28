#!/bin/bash

set -e

echo "Building Docker image..."
docker build -t muddakir .

echo "Installing mdk CLI..."
sudo cp mdk.sh /usr/local/bin/mdk
sudo chmod +x /usr/local/bin/mdk

echo "✓ Installation complete!"
echo "Run 'mdk --help' from anywhere to get started."