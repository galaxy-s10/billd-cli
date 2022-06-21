const { promisify } = require("util");
const ora = require("ora");

const downloadRepo = promisify(require("download-git-repo"));

const download = async (repo, dest) => {
  const process = ora(`git clone ${repo}, please wait...`);
  process.start();
  let result = await downloadRepo(repo, dest, { clone: true });
  process.stop();
  return result;
};

module.exports = {
  download,
};
