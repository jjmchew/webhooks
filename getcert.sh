#! /bin/bash

sudo certbot certonly \
--server https://acme-v02.api.letsencrypt.org/directory \
--agree-tos \
--manual \
--preferred-challenges dns \
-d *.77345.site \
