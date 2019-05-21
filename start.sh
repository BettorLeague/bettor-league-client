#!/bin/bash
docker pull nadjim/angular-social
docker-compose -f /angular-social/docker-compose.yml down
docker-compose -f /angular-social/docker-compose.yml up -d
