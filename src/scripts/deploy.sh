#!/bin/sh
SSH_DEST="bramjoosten.nl:/home/deb115168/domains/bramjoosten.nl/public_html/crypto-converter"

#ignore files
if [ -f "./build/proxy/env.sample.php" ]; 
then
    rm build/proxy/env.sample.php
fi

#deploy
if [ -d "./build" ]; 
then
    echo "Deploying build folder..."
    rsync -avz build/ $SSH_DEST --delete --delete-excluded --recursive
else
    echo "Error: Directory /build does not exist."
fi
