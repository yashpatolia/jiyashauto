#!/bin/bash
set -e
cd ~/jiyashauto

# Backup DB before deploying
bash ~/jiyashauto/backup.sh || echo "Warning: backup failed, continuing deploy"

git stash
git pull origin master
docker compose up --build -d
echo "Deploy complete"
