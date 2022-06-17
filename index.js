const { promisify } = require("util");

const inquirer = require("inquirer");
const { download } = require("./download");
const { vue3Repo } = require("./repo/index");
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
    default: "vue", // 默认值
    choices: ["vue", "react"],
  },
  {
    type: "list",
    message: "请选择构建工具",
    name: "bundle",
    default: "vite", // 默认值
    choices: ["vite", "webpack5"],
  },
];
download(vue3Repo, "test/tmp", { clone: true }, function (err, res) {
  console.log(err ? "Error" : "Success");
  console.log(res);
});
// inquirer.prompt(promptList).then((answers) => {
//   console.log(answers); // 返回的结果
//   download(vue3Repo, "test/tmp", function (err) {
//     console.log(err ? "Error" : "Success");
//   });
// });
