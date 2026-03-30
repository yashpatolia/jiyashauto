#!/bin/bash
set -e
cd ~/jiyashauto
git stash
git pull origin master
npm install
npm run build
pm2 restart jiyashauto
echo "Deploy complete"
