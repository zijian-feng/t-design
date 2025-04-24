# 解决在不同目录下执行此shell文件时，not found的情况
DIRNAME=$0
if [ "${DIRNAME:0:1}" = "/" ];then
    CURDIR=$(dirname "$DIRNAME")
else
    CURDIR=$(dirname "$(pwd)/$DIRNAME")
fi

echo "当前目录: $CURDIR"

# 执行脚本生成 package.json，并通过终端接收版本号
node "$CURDIR"/../scripts/generate-package.json.js --ready --version="$1"

# 执行脚本生成 tsconfig.json
node "$CURDIR"/../scripts/generate-tsconfig.json.js

# 将根目录下的src/env.d.ts文件复制到当前目录下
cp "$CURDIR"/../src/env.d.ts "$CURDIR"/../src/components/env.d.ts

# 开始构建项目
npx rslib build -c "$CURDIR"/../config/rslib.config.ts

# 移除 components 目录下的 package.json & tsconfig.json & env.d.ts
rm -rf "$CURDIR"/../src/components/package.json
rm -rf "$CURDIR"/../src/components/tsconfig.json
rm -rf "$CURDIR"/../src/components/env.d.ts

# 重新组织类型
node "$CURDIR"/../scripts/reorganize-types.js

# 执行脚本生成 package.json
node "$CURDIR"/../scripts/generate-package.json.js --version="$1"
