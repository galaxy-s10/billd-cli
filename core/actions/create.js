const inquirer = require("inquirer");
const { download } = require("../../utils/download");
const { commandSpawn, commandExec } = require("../../utils/terminal");
const { clearConsole } = require("../../utils");
const { chalkSUCCESS, chalkINFO, chalkERROR, chalkWARN, chalk } = require("../../utils/chalkTip");
const {
    vue3Webpack5Repo,
    vue3Vite2Repo,
    react17Vite2Repo,
    react17Webpack5Repo,
} = require("../../repo/index");

const fs = require("fs-extra");
const path = require("path");



const createAction = async (project, options) => {
    const { version: pkgVersion } = require('../../package.json')
    const projectname = project
    const cwd = process.cwd()
    const destDir = path.resolve(cwd, projectname);
    /**
     * 如果存在destDir目录，且没有merge选项，就会进入if里面继续判断
     * 注：如果存在destDir目录，且有merge选项，就不会进入if里面，即啥也不干
     * 注：因为这里只判断了有没有merge选项，即如果同时有merge和force，force不会生效，即啥也不干（vuecli也是这样）
     */
    if (fs.existsSync(destDir) && !options.merge) {
        /**
         * 没有merge，那就判断有没有force，即billd create ccc -f，
         * 如果有-f，就会删除ccc目录，再执行后面的步骤
         */
        if (options.force) {
            await fs.remove(destDir)
        } else {
            /**
             * 没有merge也没有force，就会询问用户
             */
            const { action } = await inquirer.prompt([
                {
                    name: 'action',
                    type: 'list',
                    message: `Target directory ${chalk.cyan(destDir)} already exists. Pick an action:`,
                    choices: [
                        { name: 'Overwrite', value: 'overwrite' },
                        { name: 'Merge', value: 'merge' },
                        { name: 'Cancel', value: false }
                    ]
                }
            ])
            if (!action) {
                return
            } else if (action === 'overwrite') {
                // 如果是overwrite，其实就是force，则删除destDir目录
                console.log(`\nRemoving ${chalk.cyan(destDir)}...`)
                await fs.remove(destDir)
            } else {
                // 如果是merge的话，啥也不干
            }
        }
    }
    clearConsole(chalk.bold.blue(`Billd CLI v${pkgVersion}`))
    const promptList = [
        // {
        //     type: "input",
        //     message: "请输入项目名称",
        //     name: "projectname",
        //     default: "my-app", // 默认值
        // },
        {
            type: "list",
            message: "Please select a frontend frame",
            name: "framework",
            default: "vue3", // 默认值
            choices: ["vue3", "react17"],
        },
        {
            type: "list",
            message: "Please select a build tool",
            name: "bundle",
            default: "vite2", // 默认值
            choices: ["vite2", "webpack5"],
        },
        {
            name: 'config',
            type: 'checkbox',
            message: `Please pick preset`,
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


    inquirer.prompt(promptList).then(async (answers) => {
        const projectname = project
        const { framework, bundle } = answers;

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
        await commandExec("yarn", destDir);
        console.log(chalkINFO('安装依赖完成！'))
        console.log(chalkSUCCESS(`成功创建项目：${chalk.yellow(projectname)}`))
        console.log(chalkSUCCESS(`开始使用以下命令：`))
        console.log('')
        console.log('  ' + chalk.cyan(`${chalk.gray('$')} cd ${projectname}`))
        console.log('  ' + chalk.cyan(`${chalk.gray('$')} yarn start`))
        console.log('')

    });
}

module.exports = { createAction }