#! /bin/bash

source ../.env && docker exec -it pg psql -U ${POSTGRES_USER}
