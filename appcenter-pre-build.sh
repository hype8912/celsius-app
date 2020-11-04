#!/usr/bin/env bash

# Clone celsius-app-creds
git clone https://github.com/CelsiusNetwork/celsius-app-creds

# Pods
cd ios
pod install
cd ..

node set-env.js

ls