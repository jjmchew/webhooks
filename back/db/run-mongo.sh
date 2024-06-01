#! /bin/bash

source ../.env && docker exec -it mongo mongosh \
	-u ${MONGO_USER} -p ${MONGO_PW} \
	--authenticationDatabase admin \
	miniProj
