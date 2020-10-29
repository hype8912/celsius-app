#!/usr/bin/env bash

# Example: Clone a required repository
git clone https://github.com/CelsiusNetwork/celsius-app-creds

sudo xcode-select --switch /Applications/Xcode.app
cd ios && pod install && cd ..

node set-env.js

ls