#!/bin/bash
cd ~/rankpilot-app
export CHOKIDAR_USEPOLLING=1
export NEXT_DISABLE_SWC_NATIVE=1
export NEXT_DISABLE_LIGHTNINGCSS_NATIVE=1
node node_modules/next/dist/bin/next dev -p 3000 --hostname 127.0.0.1
