---
title: Codex CLI简单配置第三方兼容API
date: 2026-03-08T23:56:00.000+08:00
author: 线粒体
categories: 学
---
## 引言

Codex CLI是OpenAI推出的AI编程Agent工具，类似Claude Code。据说它可以取代Claude Code，成为最好的CLI编程工具；不过在下对此不置可否。CLI相较于GUI插件的一个显著的好处是，大部分代码编辑器都可以用，因为它的运行只依赖终端，而且也比较稳定。所以我个人还是比较喜欢CLI。

最近我有幸用到了大佬的Codex中转站，故在此将我配置Codex CLI的经验作一分享。

> 本文所用环境是Windows和Windows PowerShell，Linux可以参考适用，大同小异。

## 安装

安装Codex CLI，运行如下命令：

```powershell
npm i -g @openai/codex
```

验证安装是否成功，运行：

```powershell
codex --version
```

若输出版本号，即代表安装成功。

## 配置文件介绍

如果仅仅是使用OpenAI官方提供的接口来使用模型，那么直接运行：

```powershell
codex
```

然后按照交互式指引，登录OpenAI账号或填入API Key即可。但是本文介绍的是使用第三方中转站（即OpenAI兼容API）来使用模型，因此需要关注一些配置文件。

Codex CLI的配置文件位于用户家目录（即`C:\Users\<用户名>\.codex`）中。为了配置第三方API，需要修改这里的`config.toml`。在初次安装且未进行配置的情况下，`config.toml`应该是不存在的，因此需要手动创建。创建好后，编辑该文件，写入如下模板内容：

```toml
model_provider = "custom"
model = "gpt-5.3-codex"
model_reasoning_effort = "medium"
preferred_auth_method = "apikey"

[model_providers.custom]
name = "custom"
base_url = "http://api.custom.ai/v1"
wire_api = "responses"
env_key = "CUSTOM_OPENAI_API_KEY"
requires_openai_auth = true
```

这个内容等一下还要进行修改。我们要确认已经获得了以下三项必要信息：

- 第三方API的Base URL
- 第三方API的Key
- 第三方API可用的模型名

才能进行这里的配置。因此需要先从第三方站那里获取这些信息，各家不同，此不赘述。

## 修改配置文件

首先，Codex CLI支持配置多个`model_provider`。每个定义时用`[model_providers.xxx]`开头，然后写入各项参数。文件开头的：

```toml
model_provider = "xxx"
```

即CLI默认选用的`model_provider`。接下来我们自定义一个`[model_providers.custom]`。

修改模板中的`base_url`为第三方API的Base URL：

```toml
base_url = "http://api.custom.ai/v1"
```

修改`env_key`为一个自定义的环境变量名，比如：

```toml
env_key = "CUSTOM_OPENAI_API_KEY"
```

这行配置的意思是，CLI要去这个环境变量里找API Key。所以需要修改环境变量。对于Windows 11，打开系统设置—系统信息—高级系统设置—环境变量，然后添加一个用户变量，名为刚才定义的名字，值为第三方API提供的API Key。

> 有些人认为配置环境变量很麻烦，所以在此也有第二种方法。
> 
> 首先，删去`env_key`字段。当一个`model_provider`没有配置`env_key`的时候，CLI就会去读取和`config.toml`同目录的`auth.json`，来获取API Key。
> 
> 新建`auth.json`文件，写入：
> 
> ```json
> {
>   "OPENAI_API_KEY": "apikey-xxxxxx"
> }
> ```
> 
> 这里`"OPENAI_API_KEY"`这个变量名是不能改的，否则就会读取不到。只要将后面的值替换成自己的API Key即可。
> 
> 这样做的缺点是，如果配置了多个`model_provider`，且都没有设置`env_key`，那么它们就会读取同一个Key。

最后配置使用的模型。这个配置在CLI里也可以以交互式方式设置（通过`/model`指令）。修改文件开头的`model`为第三方API提供的任一可用模型，例如：

```toml
model = "gpt-5.3-codex"
```

然后就可以使用了。至于详细的配置文档，可以参考[官方文档](https://developers.openai.com/codex/config-basic)。

## 使用

在任意文件夹运行：

```powershell
codex
```

即可启动Codex CLI，使用的是我们刚才配置的`custom`。可以根据提示进行个性化配置。

## 结语

本文所述方法只是最简单的配置，更多用法可以参考[官方文档](https://developers.openai.com/codex/cli)。不当之处，欢迎指正！
