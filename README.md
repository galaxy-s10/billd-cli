# 简介

这是一个快速创建项目的脚手架，核心只做了一件事情：根据你选择的选项，拉取对应的代码到本地。

以下是目前支持的模板代码仓库：

- [x] [webpack5+noframe](https://github.com/galaxy-s10/webpack5-multi-page-template) ✅
- [x] [webpack5+vue3](https://github.com/galaxy-s10/vue3-webpack5-template) ✅
- [x] [webpack5+react17](https://github.com/galaxy-s10/react17-webpack5-template) ✅
- [x] [vite2+vue3](https://github.com/galaxy-s10/vue3-webpack5-template/tree/vite2-version) ✅
- [ ] vite2+react17 ❌
- [ ] nuxt3+vue3 ❌
- [ ] next12+react18 ❌

# 功能

前端框架（可选）：

- [x] vue3 ✅
- [x] react17 ✅
- [x] noframe ✅

构建工具（可选）：

- [x] webpack5 ✅
- [x] vite2 ✅

开发语言（可选）：

- [ ] javascript ❌
- [x] typescript ✅

css 预处理器（可选）：

- [x] sass/scss ✅
- [ ] less ❌
- [ ] stylus ❌

代码规范（内置）：

- [x] eslint ✅
- [x] prettier ✅

规范配置（内置）：

- [x] husky ✅
- [x] commitizen ✅
- [x] commitlint ✅
- [x] lint-staged ✅
- [x] standard-version ✅

# 安装

```sh
npm i billd-cli -g
```

# 快速上手

## 查看版本号

```sh
billd -v
```

## create

```sh
billd create projectname
```

如果当前目录已存在 projectname，可以手动指定覆盖或者合并（当然了不指定的话也会自动判断是否已存在，然后提示用户选择合并或者覆盖）

```sh
# 合并
billd create projectname -m
# or
billd create projectname --merge
```

```sh
# 覆盖
billd create projectname -f
# or
billd create projectname --force
```

# 源码

[https://github.com/galaxy-s10/billd-cli](https://github.com/galaxy-s10/billd-cli)
