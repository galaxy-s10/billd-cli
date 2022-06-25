// exec是对spawn的封装，spawn更为底层
const { exec, spawn } = require('child_process');
const execa = require("execa");

/**
 * 执行终端命令相关的代码
 */
const commandSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args);
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
    childProcess.on("close", () => {
      resolve();
    })
  })
}

/**
 * 执行终端命令相关的代码
 */
const commandExec = (str, cwd) => {
  return execa(str, {
    cwd,
    stdio: [2, 2, 2],
  });
}


module.exports = {
  commandSpawn,
  commandExec
}
