#!/bin/bash
set -e
cd ~/jiyashauto
git stash
git pull origin master
docker compose up --build -d
echo "Deploy complete"
