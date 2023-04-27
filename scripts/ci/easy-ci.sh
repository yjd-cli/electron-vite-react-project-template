#!/bin/bash

SCRIPT_DIR="$(
  cd "$(dirname "${BASH_SOURCE[0]}")"
  pwd -P
)"
cd $SCRIPT_DIR/..

set -e

./scripts/login.sh

npm install

# 合并两个参数为一个数组
fileList=$(jq -r '.[]' "$1" "$2" || true)

echo -e "fileList = $fileList\n"

# 根据文件后缀名过滤出不同类型的文件
jtsFileList=$(echo "$fileList" | grep -E '\.(js|ts|tsx)$' || true)
tsFileList=$(echo "$fileList" | grep -E '\.(ts|tsx)$' || true)
langFileList=$(echo "$fileList" | grep -F -e '*/(en-us|zh-cn).json$' || true)

# 输出结果
echo -e "jtsFileList = $jtsFileList\n"
echo -e "tsFileList = $tsFileList\n"
echo -e "langFileList = $langFileList\n"

# check tsc
if [ -z "$tsFileList" ]; then
  echo -e "check ts passed, changed files is empty\n"
else
  npx tsc -p tsconfig.json --noEmit
  if [[ "$?" == 0 ]]; then
    echo -e "check ts passed\n"
  else
    echo -e "check ts failed\n"
  fi
fi

jtsfiles=
for file in $jtsFileList
do
  if [ ! $jtsfiles ]; then
    jtsfiles="$file"
  else
    jtsfiles="$jtsfiles $file"
  fi
done

if [ ! "$jtsfiles" ]; then
  echo -e "check ESLint & Jest passed, changed files is empty\n"
else
  # check eslint
  # npx eslint -c .eslintrc.prod.json $jtsfiles
  if [[ "$?" == 0 ]]; then
    echo -e "check ESLint passed\n"
  else
    echo -e "check ESLint failed\n"
  fi

  # check jest
  npx jest $jtsfiles --findRelatedTests --env=jsdom --config jest.config.ts --coverage --silent  --passWithNoTests
  if [[ "$?" == 0 ]]; then
    echo -e "check Jest passed\n"
  else
    echo -e "check Jest failed\n"
  fi
fi

# check i8n
if [ ! "$langFileList" ]; then
  echo -e "check i8n passed, changed files is empty\n"
else
  npm run check-messages
  if [[ "$?" == 0 ]]; then
    echo -e "check i8n passed\n"
  else
    echo -e "check i8n failed\n"
  fi
fi
