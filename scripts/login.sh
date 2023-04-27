#!/usr/bin/env bash
set -e

profile=""
if [ ! "$1" == "" ]; then
  echo "use aws profile [$1]"
  profile="--profile $1"
fi

registry="https://registry.neuralgalaxy.net/repository/npm-group/"
echo "Login NPM Registry"

username=jenkins
password=$(aws $profile ssm get-parameter --name /common/cicd/jenkins/${username}_password --with-decryption | jq -r .Parameter.Value)

token=$(curl -s \
  -H "Accept: application/json" \
  -H "Content-Type:application/json" \
  -X PUT --data "{\"name\": \"${username}\", \"password\": \"${password}\"}" \
  ${registry}/-/user/org.couchdb.user:${username} | jq -r .token)

echo "@ngiq:registry=$registry" >> .npmrc
echo "$(echo "$registry" | sed 's/https://g'):_authToken=${token}" >> .npmrc
echo "Login NPM Registry succeeded"
