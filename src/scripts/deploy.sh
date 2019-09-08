#!/bin/sh

if [ -d "./build" ]
then
    echo "Deploying build folder..."
    rsync -avz build/ bramjoosten.nl:/home/deb115168/domains/bramjoosten.nl/public_html/crypto-converter --delete --delete-excluded --recursive
else
    echo "Error: Directory /build does not exist."
fi
