#!/usr/bin/env bash
set -e

cp -n .env.example .env || true

for i in {1..30}; do
  if mysqladmin -h 127.0.0.1 -u root -p200606 ping --silent; then
    break
  fi
  sleep 1
done

mysql -h 127.0.0.1 -u root -p200606 < database/schema.sql
