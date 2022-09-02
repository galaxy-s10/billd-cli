const path = require('path')
const inquirer = require('inquirer')
const semver = require('semver')
const { execSync } = require('child_process')
const { readJSONSync, writeJSONSync } = require('fs-extra')
const { updatePackageJSON } = require('./update')
const { chalkERROR, chalkINFO } = require("../utils/chalkTip");
const { version: currentVersion } = readJSONSync('package.json'); // 项目根目录的package.json

// scripts/release.js只是实现了release-it的基本功能

const preId =
  semver.prerelease(currentVersion) && semver.prerelease(currentVersion)[0];

const versionChoices = [
  'patch',
  'minor',
  'major',
  ...(preId ? ['prepatch', 'preminor', 'premajor', 'prerelease'] : []),
];

const inc = (i) => semver.inc(currentVersion, i, preId);
const selectReleaseVersion = async () => {
  const { release } = await inquirer.prompt([
    {
      type: 'list',
      name: 'release',
      message: 'Select release type',
      choices: versionChoices.map((i) => `${i} (${inc(i)})`),
    },
  ]);
  const pkg = readJSONSync(path.resolve(__dirname, '../package.json')); // 项目根目录的package.json
  const targetVersion = release.match(/\((.*)\)/)[1];

  const { confirmRelease } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmRelease',
      default: false,
      message: `Confirm release v${targetVersion}?`,
    },
  ]);

  if (confirmRelease) {
    console.log(chalkINFO(`开始发布v${targetVersion}...`));

    // 更新根目录的package.json版本号
    writeJSONSync(
      'package.json',
      { ...pkg, version: targetVersion },
      { spaces: 2 }
    );

    // 更新package.json
    updatePackageJSON();

    // 生成changelog
    execSync(`yarn run changelog`, { stdio: 'inherit' });

    // git commit
    execSync(`git add .`, { stdio: 'inherit' });
    execSync(`git commit -m 'chore(release): v${targetVersion}'`, {
      stdio: 'inherit',
    });

    // git tag
    execSync(`git tag v${targetVersion}`, { stdio: 'inherit' });
  } else {
    console.log(chalkERROR(`取消发布！`));
  }
};

(async () => {
  await selectReleaseVersion();
})();
