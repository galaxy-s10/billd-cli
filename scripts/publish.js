const path = require('path')
const { execSync } = require('child_process')
const pkg = require('../package.json')
const { chalkSUCCESS } = require("../utils/chalkTip");

const command = 'npm publish';

execSync(`git push origin v${pkg.version}`, { stdio: 'inherit' });
execSync(`git push`, { stdio: 'inherit' });

execSync(command, {
  stdio: 'inherit',
  cwd: path.resolve(__dirname, '../'),
});

console.log(chalkSUCCESS(`Published ${pkg.name}`));
