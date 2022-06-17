const { Command } = require("commander");
const program = new Command();
const package = require("./package.json");
var inquirer = require("inquirer");

// program
//   .name(package.name)
//   .description("hsscli-快速创建项目脚手架")
//   .version(package.version, "-v, --version", "输出当前版本");

program
  .command("create ", "create 项目名称")
  .description("kkkkkkkk")
  .action((str, options) => {
    const limit = options.first ? 1 : undefined;
    console.log(str.split(options.separator, limit));
  });

// program.option("-f, --foo", "enable some foo");
// program.option("-a, --aaa", "enable some aaa");

// inquirer
//   .prompt([
//     /* Pass your questions in here */
//     "aaaaa",
//   ])
//   .then((answers) => {
//     "kkkk";
//     // Use user feedback for... whatever!!
//   })
//   .catch((error) => {
//     console.log("errorrr", error);
//     if (error.isTtyError) {
//       // Prompt couldn't be rendered in the current environment
//     } else {
//       // Something else went wrong
//     }
//   });

// program.parse();
