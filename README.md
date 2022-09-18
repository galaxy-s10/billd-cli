<p align="center">
  <a href="">
    <img
      width="200"
      src="https://resource.hsslive.cn/image/1613141138717Billd.webp"
      alt="Billd-CLI logo"
    />
  </a>
</p>

<h1 align="center">
  Billd-CLI
</h1>

<p align="center">
一个快速创建项目的脚手架
</p>

<div align="center">
<a href="https://www.npmjs.com/package/billd-cli"><img src="https://img.shields.io/npm/v/billd-cli.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/billd-cli"><img src="https://img.shields.io/npm/dw/billd-cli.svg" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/billd-cli"><img src="https://img.shields.io/npm/l/billd-cli.svg" alt="License"></a>
</div>

# 简介

这是一个快速创建项目的脚手架，核心只做了一件事情：根据你选择的选项，拉取对应的代码到本地。

以下是目前支持的模板代码仓库：

| 模板仓库                                                                                     | 支持 |
| -------------------------------------------------------------------------------------------- | ---- |
| [webpack5 + ts + vue3](https://github.com/galaxy-s10/vue3-webpack5-template)                 | ✅   |
| [webpack5 + ts + react17](https://github.com/galaxy-s10/react17-webpack5-template)           | ✅   |
| [webpack5 + ts + noframe](https://github.com/galaxy-s10/webpack5-multi-page-template)        | ✅   |
| [vite2 + ts + vue3](https://github.com/galaxy-s10/vue3-webpack5-template/tree/vite2-version) | ✅   |
| vite2+react17                                                                                | ❌   |
| nuxt3+vue3                                                                                   | ❌   |
| next12+react18                                                                               | ❌   |

# 安装

```sh
npm i billd-cli -g
```

# 使用

## version

> 查看版本号

```sh
billd -v
# 或者
billd --version
```

## create

> 创建项目

```sh
billd create projectname
```

如果当前目录已存在 projectname，可以手动指定覆盖或者合并（如果不指定的话，billd-cli 也会自动判断是否已存在，会提示用户选择合并或者覆盖）

```sh
# 合并
billd create projectname -m
# 或者
billd create projectname --merge
```

```sh
# 覆盖
billd create projectname -f
# 或者
billd create projectname --force
```

# 目前集成

前端框架（可选）：

| 前端框架 | 支持 |
| -------- | ---- |
| vue3     | ✅   |
| react17  | ✅   |
| noframe  | ✅   |

构建工具（可选）：

| 构建工具 | 支持 |
| -------- | ---- |
| webpack5 | ✅   |
| vite2    | ✅   |

开发语言（可选）：

| 开发语言   | 支持 |
| ---------- | ---- |
| javascript | ❌   |
| typescript | ✅   |

css 预处理器（可选）：

| css 预处理器 | 支持 |
| ------------ | ---- |
| sass/scss    | ✅   |
| less         | ❌   |
| stylus       | ❌   |

代码规范（内置）：

| 代码规范 | 支持 |
| -------- | ---- |
| eslint   | ✅   |
| prettier | ✅   |

工程化配置（内置）：

| 工程化配置       | 支持 |
| ---------------- | ---- |
| husky            | ✅   |
| commitizen       | ✅   |
| commitlint       | ✅   |
| lint-staged      | ✅   |
| standard-version | ✅   |

# 如何发版

## 0.确保 git 工作区干净

即确保本地的修改已全部提交（git status 的时候会显示：`nothing to commit, working tree clean` ），否则会导致执行 `release:local` 脚本失败

## 1.执行本地发版脚本

```sh
npm run release:local
```

> 该脚本内部会做以下事情：

1. 根据用户选择的版本，更新 package.json 的 version
2. 对比当前版本与上个版本的差异，生成 changelog
3. 提交暂存区到本地仓库：git commit -m 'chore(release): v 当前版本'
4. 生成当前版本 tag：git tag v 当前版本

## 2.执行线上发版脚本

> 注意：如果你使用 yarn run release:online，请确保执行前 yarn 的镜像是 npm 官方镜像：https://registry.npmjs.org/

```sh
npm run release:online
```

> 该脚本内部会做以下事情：

1. 提交当前版本：git push
2. 提交当前版本 tag：git push origin v 当前版本
3. 发布 npm：npm publish

# 源码

[https://github.com/galaxy-s10/billd-cli](https://github.com/galaxy-s10/billd-cli)
