#!/usr/bin/env bash
set -e

echo "Setting up Computer Store Codespace..."

sudo apt-get update
sudo DEBIAN_FRONTEND=noninteractive apt-get install -y mariadb-server mariadb-client

sudo service mariadb start

sudo mysql <<'SQL'
ALTER USER 'root'@'localhost' IDENTIFIED BY '200606';
FLUSH PRIVILEGES;
SQL

cp -n .env.example .env || true

mysql -h 127.0.0.1 -u root -p200606 < database/schema.sql

echo "Database ready. Run: npm install && npm start"
