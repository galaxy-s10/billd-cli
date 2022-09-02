const path = require('path')
const { execSync, spawnSync } = require('child_process')
const pkg = require('../package.json')
const { chalkSUCCESS, chalkERROR } = require("../utils/chalkTip");


execSync(`git push origin v${pkg.version}`, { stdio: 'inherit' });
execSync(`git push`, { stdio: 'inherit' });

// WARN: yrm切换镜像的时候，会同步切换npm的镜像！但是nrm切换镜像却不会切换yarn的镜像！
// 当使用npm镜像为npm，但是yarn镜像为taobao或者cnpm的时候，但是yarn run mypublish有时候会成功？
// TIP: 确保发包的时候npm和yarn的镜像都得是npm官方镜像即可，这样不管是yarn/npm run mypublish都会按正常情况走
// 不能在这里通过execSync或者spawnSync切换镜像，会有延迟，该次publish不生效，得下一次再执行publish才会生效


/**
 * spawnSync更底层，spawnSync不会抛出错误，但可以获取它的执行
 * 结果（stdout/status/stderr/output等等），根据他们的结果判断后面的逻辑
 */
// const result = spawnSync('npm', ['publish'], {
//   stdio: "inherit",
//   cwd: path.resolve(__dirname, '../'),
// });

// if (!result.status) {
//   console.log(chalkSUCCESS(`！！！发布${pkg.name}@${pkg.version}成功！！！`));
// } else {
//   console.log(chalkERROR(`！！！发布${pkg.name}@${pkg.version}失败！！！`));
// }


try {
  const command = 'npm publish';
  // 如果进程超时或有非零退出代码，此方法将抛出Error 对象
  execSync(command, {
    stdio: "inherit",
    cwd: path.resolve(__dirname, '../'),
  });
  console.log(chalkSUCCESS(`！！！发布${pkg.name}@${pkg.version}成功！！！`));
} catch (error) {
  console.log(chalkERROR(`！！！发布${pkg.name}@${pkg.version}失败！！！`));
  console.log(error)
  console.log(chalkERROR(`！！！发布${pkg.name}@${pkg.version}失败！！！`));
}

