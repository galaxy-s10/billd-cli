const stream = process.stderr;
let frameIndex = 0;
const frames = [
  // 字符组
  "⠋",
  "⠙",
  "⠹",
  "⠸",
  "⠼",
  "⠴",
  "⠦",
  "⠧",
  "⠇",
  "⠏",
];

// 取下一个状态的字符
function frame() {
  const frame = frames[frameIndex];
  frameIndex = ++frameIndex % frames.length;

  const fullPrefixText = "这是前缀 ";
  const fullText = " 这是后缀（跑起来了）...";

  return fullPrefixText + frame + fullText;
}

// 清理上一个字符，写入新的字符
function rander() {
  stream.cursorTo(0);
  stream.clearLine(1);
  console.log(stream, "lllll");
  //   stream.write(frame());
  stream.write(+new Date() + "");
}
// 循环读取每一个状态的字符，形成了一个完整的动作
// 就像动画片一样，每一个都是静止的，翻页速度快了，就像动起来一样
setInterval(rander.bind(this), 50);
