# qingshuige-hugo

清水阁网站源码仓库

## 推荐用法

使用VS Code编辑，并安装[Front Matter CMS](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-front-matter)插件，即可使用GUI方便地编辑和发表文章。

当然，不装任何插件，完全手搓也是可以的。大道至简！😝

## 技术栈

采用极其先进的[Hugo](https://gohugo.io/)和极其美观的[Qingshuige Theme](https://github.com/nanmuweyyyyyy/qingshuige-theme)！

## 独立搜索插件

搜索由 [qingshuige-search](https://github.com/nanmuweyyyyyy/qingshuige-search) 子模块提供。

```sh
git submodule update --init --recursive
hugo server
# 预览清水阁主题
hugo server --config "hugo.yaml,qingshuige-theme-preview.yaml"
```

两套主题共用 `hugo.yaml` 中的 `params.qingshuigeSearch`。`enabled` 控制开关，`indexPath` 同时控制索引生成位置和加载地址，`sections` 筛选内容栏目，`engine` 配置分词、排序权重、结果数量及 `matchMode: any/all`。无需单独配置 SearchIndex 首页输出或复制插件资源。

插件附带预构建资源。修改插件源码后，在子模块目录运行 `npm ci`、`npm test`，再构建 Hugo。Hugo 最低版本为 0.158.0。详情见 [Hugo 适配说明](plugins/qingshuige-search/adapters/hugo/README.zh-CN.md) 和 [核心 API](plugins/qingshuige-search/docs/API.zh-CN.md)。

更新插件版本时，先在子模块中切换到目标提交并验证，再提交主站的子模块引用。主题中的搜索调用只提供界面挂载点；搜索源码、构建配置和测试都归插件仓库所有。
