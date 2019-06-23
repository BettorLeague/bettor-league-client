#!/bin/bash
docker pull nadjim/bettor-league-client
docker-compose -f /bettor-league-client/docker-compose.prod.yml down
docker-compose -f /bettor-league-client/docker-compose.prod.yml up -d
