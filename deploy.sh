#!/bin/bash
set -e
cd ~/jiyashauto
git pull origin master
npm install --omit=dev
npm run build
pm2 restart jiyashauto
echo "Deploy complete"
