import * as fs from "fs";
import { execSync } from "child_process";

// https://mqhfidmks7.feishu.cn/docs/doccnjuD0d7tTdeUN3bHfCpUKqb
try {
  // 读取 package.json 文件
  fs.readFile("package.json", "utf8", (err, data) => {
    if (err) {
      throw err;
    }

    // 将 JSON 字符串转换为对象
    const packageJson = JSON.parse(data);

    // 搜索以 "@ngiq/" 开头的依赖
    const ngDependencies = {};
    for (const [dep, version] of Object.entries(packageJson.dependencies)) {
      if (dep.startsWith("@ngiq/")) {
        ngDependencies[dep] = version;
      }
    }

    // 最终需要安装的私有 npm 包字符串
    let codeStr = "";
    Object.entries(ngDependencies).forEach(it => {
      const [key, value] = it;
      if (key && value) {
        // 注意：不要删除后面的空格
        codeStr += `${key}@${value} `;
      }
    });

    if (codeStr) {
      console.log(`npm install ${codeStr} -f --no-save`);
      // 强制安装私有 npm 包
      // --no-save：禁止更新package.json
      execSync(`npm install ${codeStr} -f --no-save`, { stdio: "inherit" });
    }
  });
} catch (error) {
  console.log("preinstall 执行失败 => ", error);
}
