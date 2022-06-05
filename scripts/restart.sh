#!/bin/bash

echo "[deploy] restarting..."
pm2 restart /miniData/mini-shop-server/dist/main.js
echo "[deploy] restart done"
