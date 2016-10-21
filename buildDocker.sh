#!/bin/bash

set -e

PROJECT_ID=$(gcloud config list project --format "value(core.project)" 2> /dev/null)
PUSH=false
TAG="latest"

while [ "$1" != "" ]; do
    PARAM=`echo $1 | awk -F= '{print $1}'`
    VALUE=`echo $1 | awk -F= '{print $2}'`
    case $PARAM in
        -d |--push)
            PUSH=$VALUE
            ;;
        -t | --tag)
            TAG=$VALUE
            ;;
        *)
            echo "ERROR: unknown parameter \"$PARAM\""
            exit 1
            ;;
    esac
    shift
done

NODE_ENV=development npm run build
docker build -t gcr.io/$PROJECT_ID/app-client:$TAG .

if $PUSH; then
  gcloud docker push gcr.io/$PROJECT_ID/app-client:$TAG
fi
