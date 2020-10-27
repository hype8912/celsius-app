#!/usr/bin/env bash

# Example: Clone a required repository
git clone https://github.com/CelsiusNetwork/celsius-app-creds

cd ios && pod install

node set-env.js

ls