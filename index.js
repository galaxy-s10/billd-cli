const inquirer = require("inquirer");
const { download } = require("./utils/download");
const {
  vue3Webpack5Repo,
  vue3Vite2Repo,
  react17Vite2Repo,
  react17Webpack5Repo,
} = require("./repo/index");

const fs = require("fs");
const path = require("path");
const execa = require("execa");

const promptList = [
  {
    type: "input",
    message: "请填写项目名称",
    name: "projectname",
    default: "my-app", // 默认值
  },
  {
    type: "list",
    message: "请选择前端框架",
    name: "framework",
    default: "vue3", // 默认值
    choices: ["vue3", "react17"],
  },
  {
    type: "list",
    message: "请选择构建工具",
    name: "bundle",
    default: "vite2", // 默认值
    choices: ["vite2", "webpack5"],
  },
];

console.log(this.run);
return;

async function yarnInstall(destDir) {
  return await execa("yarn", {
    cwd: destDir,
    stdio: [2, 2, 2],
  });
}

inquirer.prompt(promptList).then(async (answers) => {
  console.log(answers); // 返回的结果
  const { projectname, framework, bundle } = answers;
  const destDir = path.resolve(__dirname, projectname);
  let isExit = fs.existsSync(destDir);
  if (isExit) {
    console.log(destDir + "目录已存在，请先删除该目录或换个项目名称！");
    return;
  } else {
    console.log(destDir + "目录不存在，继续走");
  }
  let repo = null;
  if (framework === "vue3") {
    if (bundle === "vite2") {
      repo = vue3Vite2Repo;
    } else if (bundle === "webpack5") {
      repo = vue3Webpack5Repo;
    }
  } else if (framework === "react17") {
    if (bundle === "vite2") {
      repo = react17Vite2Repo;
    } else if (bundle === "webpack5") {
      repo = react17Webpack5Repo;
    }
  }
  let err = await download(vue3Vite2Repo, destDir);
  if (err) {
    console.log("download-git-repo 错误！");
    console.log(err);
    return;
  } else {
    console.log("download-git-repo 成功！");
  }
  console.log("开始安装依赖");
  await yarnInstall(destDir);
});
