#!/bin/bash
set -ex
cd "$(dirname "${BASH_SOURCE[0]}")/../.."
export stack_name="$1"
if [ "$stack_name" == "" ]; then
    echo "STACK_NAME not found"
    exit 1
fi
export app_version=$(cat package.json | jq -r '.version')

export show_version=$(cat package.json | jq -r '.show_version')

cat build/install-linux-desktop-tmp.sh | \
sed "s/\$SNPlaceholder/${stack_name}/g" | \
sed "s/\$DMPlaceholder/${stack_name}.neuralgalaxy.cn/g" | \
sed "s/\$HTPlaceholder/ng-software.s3.cn-northwest-1.amazonaws.com.cn/g" > build/install-linux-desktop.sh

rm -f build/version.json

cat <<EOF | tee build/version.json
{
    "version": "${app_version}",
    "show_version":"${show_version}",
    "REACT_APP_NG_API_BASEURL": "https://${stack_name}-api.neuralgalaxy.cn",
    "REACT_APP_AWS_SOFTWARE_S3_BUCKET_HREF": "https://ng-software.s3.cn-northwest-1.amazonaws.com.cn",
    "REACT_APP_STACK_NAME": "${stack_name}"
}
EOF

version_bucket_dir="s3://ng-software/${stack_name}/product_name/${app_version}"
echo "upload build to: ${version_bucket_dir}"

aws s3 sync build $version_bucket_dir
