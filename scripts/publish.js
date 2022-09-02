const path = require('path')
const { execSync } = require('child_process')
const pkg = require('../package.json')
const { chalkSUCCESS } = require("../utils/chalkTip");

// 发布私有包需要添加--access public
const command = 'npm publish --access public';

// git push
execSync(`git push origin v${pkg.version}`, { stdio: 'inherit' });
execSync(`git push`, { stdio: 'inherit' });

execSync(command, {
  stdio: 'inherit',
  cwd: path.resolve(__dirname, '../'),
});

console.log(chalkSUCCESS(`Published @huangshuisheng/${name}`));
