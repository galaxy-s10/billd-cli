const { promisify } = require("util");
// const ora = require("ora");

const downloadRepo = promisify(require("download-git-repo"));

// const process = ora(`downloading....`);

const download = async (repo) => {
  //   process.start();
  let time = +new Date();
  setInterval(() => {
    console.log("正在下载");
  }, 50);
  await downloadRepo(repo, "test/tmp", { clone: true }, function (err, res) {
    console.log(err ? "Error" : "Success");
  });
  console.log(">>>>>>.");
  //   process.success();
};

module.exports = {
  download,
};
