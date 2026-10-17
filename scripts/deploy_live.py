#!/usr/bin/env python3
"""Deploy Belal portfolio without touching tarqumi.com."""
from __future__ import annotations

import io
import os
import sys
import tarfile
import time
from pathlib import Path

import paramiko

HOSTS = ["161.97.164.198", "161.97.128.156"]
PASSWORD = r"T3lItOT,^D,6j8KGj3iCEGteqPlf"
USER = "root"
APP_LOCAL = Path(__file__).resolve().parents[1]
SSH_DIR = Path.home() / ".ssh"
REMOTE_ROOT = "/var/www/belalmoustafa_portfolio"
APP_PATH = f"{REMOTE_ROOT}/app"
EXCLUDE_DIRS = {"node_modules", ".next", ".git", ".turbo", "coverage", "scripts"}
EXCLUDE_FILES = {".env", "dev.db", "dev.db-journal", "production.db"}


def connect(host: str) -> paramiko.SSHClient | None:
    c = paramiko.SSHClient()
    c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    for key_name in ("care-synq-server", "aimers_e2e", "id_ed25519", "id_rsa"):
        path = SSH_DIR / key_name
        if not path.exists():
            continue
        for loader in (
            paramiko.Ed25519Key.from_private_key_file,
            paramiko.RSAKey.from_private_key_file,
        ):
            try:
                key = loader(str(path))
                c.connect(
                    host,
                    username=USER,
                    pkey=key,
                    timeout=25,
                    allow_agent=False,
                    look_for_keys=False,
                )
                print(f"Connected to {host} via key {key_name}", flush=True)
                return c
            except Exception:
                continue
    try:
        c.connect(
            host,
            username=USER,
            password=PASSWORD,
            timeout=25,
            allow_agent=False,
            look_for_keys=False,
        )
        print(f"Connected to {host} via password", flush=True)
        return c
    except Exception as e:
        print(f"Failed {host}: {e}", flush=True)
        return None


def run(client: paramiko.SSHClient, cmd: str, timeout: int = 2400) -> int:
    print(f"\n$ {cmd[:180]}", flush=True)
    _i, stdout, _e = client.exec_command(cmd, timeout=timeout, get_pty=True)
    while not stdout.channel.exit_status_ready():
        if stdout.channel.recv_ready():
            chunk = stdout.channel.recv(65535).decode("utf-8", errors="replace")
            try:
                sys.stdout.write(chunk)
            except UnicodeEncodeError:
                sys.stdout.buffer.write(chunk.encode("utf-8", errors="replace"))
            sys.stdout.flush()
        time.sleep(0.05)
    while stdout.channel.recv_ready():
        chunk = stdout.channel.recv(65535).decode("utf-8", errors="replace")
        try:
            sys.stdout.write(chunk)
        except UnicodeEncodeError:
            sys.stdout.buffer.write(chunk.encode("utf-8", errors="replace"))
        sys.stdout.flush()
    code = stdout.channel.recv_exit_status()
    print(f"\n[exit {code}]", flush=True)
    return code


def tarball() -> bytes:
    buf = io.BytesIO()
    with tarfile.open(fileobj=buf, mode="w:gz") as tar:
        for root, dirs, files in os.walk(APP_LOCAL):
            dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
            for name in files:
                if name in EXCLUDE_FILES or name.endswith(".db"):
                    continue
                full = Path(root) / name
                rel = full.relative_to(APP_LOCAL).as_posix()
                tar.add(full, arcname=f"app/{rel}")
    print(f"Tarball {buf.tell()} bytes", flush=True)
    return buf.getvalue()


SETUP = r'''
set -euo pipefail
PORT=3100
if ss -tulpn | grep -q ":$PORT "; then
  for p in 3101 3102 3088 3110 3200; do
    if ! ss -tulpn | grep -q ":$p "; then PORT=$p; break; fi
  done
fi
echo "Using PORT=$PORT"

mkdir -p /var/www/belalmoustafa_portfolio
rm -rf /var/www/belalmoustafa_portfolio/app
tar -xzf /tmp/belal_portfolio.tar.gz -C /var/www/belalmoustafa_portfolio
cd /var/www/belalmoustafa_portfolio/app

AUTH_SECRET=$(openssl rand -hex 32)
cat > .env <<EOF
DATABASE_URL="file:./production.db"
AUTH_SECRET="${AUTH_SECRET}"
NEXT_PUBLIC_SITE_URL="https://belalmoustafa.tarqumi.com"
ADMIN_EMAIL="belalmoustafa65@gmail.com"
ADMIN_PASSWORD="Belal@Lead2026!X9kQ"
PORT=${PORT}
EOF

npm ci || npm install
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts
npm run build

cat > /tmp/belal.ecosystem.config.cjs <<EOF
module.exports = {
  apps: [{
    name: "belal-portfolio",
    cwd: "/var/www/belalmoustafa_portfolio/app",
    script: "node_modules/next/dist/bin/next",
    args: "start -p ${PORT}",
    env: {
      NODE_ENV: "production",
      PORT: "${PORT}",
      DATABASE_URL: "file:./production.db",
      NEXT_PUBLIC_SITE_URL: "https://belalmoustafa.tarqumi.com"
    }
  }]
};
EOF

pm2 delete belal-portfolio 2>/dev/null || true
pm2 start /tmp/belal.ecosystem.config.cjs
pm2 save

# Write nginx with PORT substituted
cat > /etc/nginx/sites-available/belalmoustafa.tarqumi.com <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name belalmoustafa.tarqumi.com;
    client_max_body_size 25M;
    location /.well-known/acme-challenge/ { root /var/www/html; }
    location / {
        proxy_pass http://127.0.0.1:${PORT};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF
ln -sfn /etc/nginx/sites-available/belalmoustafa.tarqumi.com /etc/nginx/sites-enabled/belalmoustafa.tarqumi.com
nginx -t && systemctl reload nginx

certbot --nginx -d belalmoustafa.tarqumi.com --non-interactive --agree-tos -m belalmoustafa65@gmail.com --redirect || true
nginx -t && systemctl reload nginx

# Confirm tarqumi still healthy
curl -s -o /dev/null -w "TARQUMI:%{http_code}\n" https://tarqumi.com/ || true
curl -s -o /dev/null -w "BELAL_LOCAL:%{http_code}\n" http://127.0.0.1:${PORT}/ || true
echo "PORT=${PORT}"
echo DEPLOY_OK
'''


def main() -> None:
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")  # type: ignore[attr-defined]
    except Exception:
        pass
    data = tarball()
    client = None
    used_host = None
    for host in HOSTS:
        client = connect(host)
        if client:
            used_host = host
            break
    if not client:
        raise SystemExit("Unable to SSH to any host")

    run(client, "echo PORT_SCAN; ss -tulpn | grep -E ':(3099|3100|3101|80|443)\\s' || true; pm2 jlist | head -c 2000 || pm2 list", timeout=60)

    sftp = client.open_sftp()
    with sftp.file("/tmp/belal_portfolio.tar.gz", "wb") as f:
        f.write(data)
    with sftp.file("/tmp/belal_deploy.sh", "w") as f:
        f.write("#!/bin/bash\n" + SETUP)
    sftp.chmod("/tmp/belal_deploy.sh", 0o755)
    sftp.close()
    code = run(client, "bash /tmp/belal_deploy.sh", timeout=2400)
    print(f"Deployed on host={used_host}", flush=True)
    client.close()
    raise SystemExit(code)


if __name__ == "__main__":
    main()
