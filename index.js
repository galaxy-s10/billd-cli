const inquirer = require("inquirer");
const { download } = require("./utils/download");
const { commandSpawn } = require("./utils/terminal");
const { chalkSUCCESS, chalkINFO, chalkERROR, chalkWARN, chalk } = require("./utils/chalkTip");
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
        message: "请输入项目名称",
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
    }, {
        name: 'config',
        type: 'checkbox',
        message: `请选择额外配置`,
        choices: [
            {
                name: 'Eslint',
                value: 'eslint',
                short: 'Eslint',//回车后显示
                checked: true,//默认选中
            },
            {
                name: 'Prettier',
                value: 'prettier',
                short: 'Prettier',
                checked: true,//默认选中
            },
            {
                name: 'commitizen',
                value: 'commitizen',
                short: 'commitizen',
            },
            {
                name: 'lint-staged',
                value: 'lint-staged',
                short: 'lint-staged',
            },
            {
                name: 'standard-version',
                value: 'standard-version',
                short: 'standard-version',
            },
            {
                name: 'husky',
                value: 'husky',
                short: 'husky',
            }
        ]
    },

];


async function yarnInstall(destDir) {
    return await execa("yarn", {
        cwd: destDir,
        stdio: [2, 2, 2],
    });
}

inquirer.prompt(promptList).then(async (answers) => {
    console.log(answers, 'answers')
    const { projectname, framework, bundle } = answers;
    const destDir = path.resolve(__dirname, projectname);
    let isExit = fs.existsSync(destDir);
    if (isExit) {
        console.log(chalkERROR(destDir + "目录已存在，请先删除该目录或换个项目名称！"));
        return;
    } else {
        console.log(chalkINFO(`在${destDir}目录创建项目`));
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
    let err = await download(repo, destDir);
    if (err) {
        console.log(chalkERROR("download-git-repo 错误！"));
        console.log(err);
        return;
    } else {
        console.log(chalkSUCCESS("download-git-repo 成功！"));
    }
    console.log(chalkINFO('初始化git仓库...'))
    await commandSpawn('git', ['init'], { cwd: destDir })
    console.log(chalkINFO('初始化git仓库完成！'))
    console.log(chalkINFO('开始安装依赖...'))
    await yarnInstall(destDir);
    console.log(chalkINFO('安装依赖完成！'))
    console.log(chalkSUCCESS(`成功创建项目：${chalk.yellow(projectname)}`))
    console.log(chalkSUCCESS(`开始使用以下命令：`))
    console.log('')
    console.log('  ' + chalk.cyan(`${chalk.gray('$')} cd ${projectname}`))
    console.log('  ' + chalk.cyan(`${chalk.gray('$')} yarn start`))
    console.log('')

});
