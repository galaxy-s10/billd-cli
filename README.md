# 简介

这是一个快速创建项目的脚手架，核心只做了一件事情：根据你选择的选项，拉取对应的代码，仅此而已。

# 功能

前端框架（可选）：vue3、react17

构建工具（可选）：vite2、webpack5

额外配置（可选）：eslint + prettier + commitizen + lint-staged + standard-version + husky

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

如果当前目录已存在projectname，可以手动指定覆盖或者合并（当然了不指定的话也会自动判断是否已存在，然后提示用户选择合并或者覆盖）

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
