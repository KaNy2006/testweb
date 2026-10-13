#!/usr/bin/env bash
# Ensure a local MariaDB service exists in GitHub Codespaces before starting Express.
# Existing tables/data are left untouched.
set -euo pipefail
cd "$(dirname "$0")/.."

if [[ -f .env ]]; then
  # Load basic DB settings without executing .env as shell code.
  while IFS='=' read -r key value || [[ -n "${key:-}" ]]; do
    key="${key%$'\r'}"; value="${value%$'\r'}"
    [[ "$key" =~ ^[A-Za-z_][A-Za-z0-9_]*$ ]] || continue
    [[ "$key" == DB_* ]] || continue
    value="${value%\"}"; value="${value#\"}"
    export "$key=$value"
  done < .env
fi

DB_HOST="${DB_HOST:-127.0.0.1}"
DB_USER="${DB_USER:-root}"
DB_PASS="${DB_PASS:-200606}"
DB_NAME="${DB_NAME:-Database_Computer}"

# Never install a local database when the app is configured for a remote server.
if [[ "$DB_HOST" != "127.0.0.1" && "$DB_HOST" != "localhost" ]]; then
  exec node app.js
fi

# Auto-provision only in Codespaces; avoid surprising changes on other machines.
if [[ "${CODESPACES:-}" == "true" || "$PWD" == /workspaces/* ]]; then
  if ! command -v mariadbd >/dev/null 2>&1 && ! command -v mysqld >/dev/null 2>&1; then
    echo "[setup] MariaDB not installed. Installing once in this Codespace..."
    sudo -n apt-get update
    sudo -n env DEBIAN_FRONTEND=noninteractive apt-get install -y mariadb-server mariadb-client
  fi

  if ! MYSQL_PWD="$DB_PASS" mysqladmin -h "$DB_HOST" -u "$DB_USER" ping >/dev/null 2>&1; then
    echo "[setup] Starting local database service..."
    sudo -n service mariadb start || sudo -n service mysql start
  fi

  if ! MYSQL_PWD="$DB_PASS" mysql -h "$DB_HOST" -u "$DB_USER" -e "SELECT 1" >/dev/null 2>&1; then
    if [[ "$DB_USER" != "root" || ! "$DB_NAME" =~ ^[A-Za-z0-9_]+$ || "$DB_PASS" == *"'"* ]]; then
      echo "[setup] Cannot automatically configure the specified DB credentials." >&2
      exit 1
    fi
    echo "[setup] Configuring local MariaDB credentials..."
    sudo -n mariadb -e "ALTER USER 'root'@'localhost' IDENTIFIED BY '$DB_PASS'; FLUSH PRIVILEGES;"
  fi

  if [[ ! "$DB_NAME" =~ ^[A-Za-z0-9_]+$ ]]; then
    echo "[setup] Unsupported database name format: $DB_NAME" >&2
    exit 1
  fi
  EXISTING_TABLES="$(MYSQL_PWD="$DB_PASS" mysql -h "$DB_HOST" -u "$DB_USER" -N -B -e "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='$DB_NAME' AND table_name='products'")"
  if [[ "$EXISTING_TABLES" == "0" ]]; then
    echo "[setup] Initializing missing database tables (first run only)..."
    MYSQL_PWD="$DB_PASS" mysql -h "$DB_HOST" -u "$DB_USER" < database/schema.sql
  else
    echo "[setup] Existing database found. Keeping all current data."
  fi
else
  echo "[setup] Outside Codespaces: please start your configured MySQL/MariaDB service." >&2
fi

exec node app.js
