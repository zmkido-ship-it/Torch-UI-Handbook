# 项目开发手册

本手册旨在适配 UI 设计岗位，帮助您快速融入团队开发流程。此处记录了本项目的常用命令，包括 VitePress 文档工具和 GitHub 版本控制操作。

***

## VitePress 常用指令

在项目根目录下执行以下命令：

| 命令                     | 作用                                    |
| ---------------------- | ------------------------------------- |
| `npm run docs:dev`     | 启动本地开发服务器，支持热更新预览                     |
| `npm run docs:build`   | 构建生产环境静态站点，输出到 `docs/.vitepress/dist` |
| `npm run docs:preview` | 本地预览构建后的静态站点                          |

如果需要在 `package.json` 中配置脚本：

# GitHub常用指令

***

查看文件变动状态（哪些修改/新增/删除）:

```bash
git status
```

添加所有更改（包括新文件、修改、删除）:

```bash
git add -A
```

提交到本地仓库:

```bash
git commit -m "本次提交的描述信息"
```

推送到远程 main 分支:

```bash
git push origin main
```

