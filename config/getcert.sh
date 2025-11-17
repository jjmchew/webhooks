#! /bin/bash

if [ -n "$1" ]; then
  sudo certbot certonly \
    --server https://acme-v02.api.letsencrypt.org/directory \
    --agree-tos \
    --manual \
    --preferred-challenges dns \
    -d *.$1 \
    -d $1
else
  echo "Follow instructions at https://certbot.eff.org to install certbot before running this script."
  echo "Usage: ./getcert.sh [base domain name]"
  echo ""
  echo "Example: ./getcert.sh example.com"
fi
