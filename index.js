const { promisify } = require("util");

const inquirer = require("inquirer");
const { download } = require("./download");
const { vue3Webpack5Repo, vue3Vite2Repo } = require("./repo/index");
const promptList = [
  {
    type: "input",
    message: "请填写项目名称",
    name: "name",
    default: "my-app", // 默认值
  },
  {
    type: "list",
    message: "请选择前端框架",
    name: "framework",
    default: "vue3", // 默认值
    choices: ["vue2", "vue3", "react17"],
  },
  {
    type: "list",
    message: "请选择构建工具",
    name: "bundle",
    default: "vite2", // 默认值
    choices: ["vite2", "webpack5"],
  },
];
// download(vue3Webpack5Repo).then(() => {
//   console.log("git clone done！！！");
// });
download(vue3Vite2Repo).then(() => {
  console.log("git clone done！！！");
});
// inquirer.prompt(promptList).then((answers) => {
//   console.log(answers); // 返回的结果
//   download(vue3Webpack5Repo, "test/tmp", function (err) {
//     console.log(err ? "Error" : "Success");
//   });
// });
