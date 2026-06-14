#!/bin/bash
set -e
BACKUP_DIR=~/jiyashauto/db/backups
mkdir -p "$BACKUP_DIR"
docker compose -f ~/jiyashauto/docker-compose.yml cp app:/app/db/jiyashauto.db "$BACKUP_DIR/jiyashauto-$(date +%Y%m%d-%H%M%S).db"
find "$BACKUP_DIR" -name "*.db" -mtime +7 -delete
echo "Backup complete: $(ls -lh $BACKUP_DIR | tail -1)"
