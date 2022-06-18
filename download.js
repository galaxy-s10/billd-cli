const { promisify } = require("util");
const ora = require("ora");

const downloadRepo = promisify(require("download-git-repo"));

const download = async (repo) => {
  const process = ora(`git clone ${repo}, please wait...`);
  process.start();
  await downloadRepo(repo, "test/tmp", { clone: true }, function (err) {
    if (err) {
      console.log("download-git-repo 错误！");
      console.log(err);
    } else {
      console.log("download-git-repo 成功！");
      process.stop();
    }
  });
  process.stop();
};

module.exports = {
  download,
};
