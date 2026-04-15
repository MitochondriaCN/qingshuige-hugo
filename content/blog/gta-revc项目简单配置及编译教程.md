---
title: GTA reVC项目简单配置及编译教程
date: 2025-01-04T17:02:00.000+08:00
author: 线粒体
---
![](/uploads/revc-reverse-engineered-grand-theft_1686007939_305395.webp)

**Reverse Engineered Grand Theft Auto: Vice City**（简称**reVC**）是由国外GTAmodding社区团队开发的大型侠盗猎车手：罪恶都市（GTAVC）逆向项目，旨在还原GTAVC游戏源代码，同时添加大量新功能并修复原作中的bug。该项目可于Windows、MacOS和Linux平台上构建运行，支持x86、amd64、arm和arm64体系结构。该项目于2018年启动，目前最新更新时间为2021年8月。

reVC整个项目的最终编译产物是`reVC.exe`，用以替换原版游戏的`gta-vc.exe`。也就是说，该项目不含游戏图片、音频、模型等等素材文件。需要将`reVC.exe`放入原版游戏文件夹，才能够正常运行。通过Visual Studio还可以很轻松地调试游戏，了解其背后运行原理。本篇文章即带领读者逐步实现这一目标。

## 准备软件和项目文件

### 准备Visual Studio

使用Visual Studio编译reVC较为方便快捷。reVC最新支持的VS版本是VS 2015、2017和2019。经笔者测试，VS 2022也能够编译，只需更新一下项目SDK版本（见下）即可。

### 准备reVC项目文件

最初，reVC项目文件托管在GitHub，具备完整的Release、Issue和Readme体系。然而后来出于版权原因，R星向该项目发函，GitHub遂下架整个项目。

目前能够下载到reVC项目文件的网站是[libertycity.net](https://libertycity.net/files/gta-vice-city/161178-revc-reverse-engineered-grand-theft.html)，进入该页面，点击Download File，即可下载。下载的是一个压缩包，压缩包里还有一个压缩包，里面就是项目文件，解压密码是libertycity。将项目文件解压到一个文件夹内备用。

![](/uploads/fireshot-capture-010-download-revc-reverse-engineered-grand-theft-auto_-vice-city-for-gt_-libertycity.net_.png)

### 准备librw项目文件

开源库librw是R星游戏引擎RenderWare的重新实现，reVC项目编译需要用到这个库。可在[GitHub](https://github.com/aap/librw)直接下载。进入GitHub项目页面，点击绿色Code按钮展开，点击Download ZIP，即可下载。

![](/uploads/屏幕截图-2025-01-04-161248.png)

下载得到的是一个压缩包，内有`librw-master`文件夹。**将此文件夹下的所有文件解压到reVC项目文件夹的`re3-miami\vendor\librw`文件夹。**注意不要把`librw-master`文件夹作为一个整体解压进去，而是将其下的所有文件解压进去。解压后的`re3-miami\vendor\librw\`文件夹结构如图所示。

![](/uploads/屏幕截图-2025-01-04-161813.png)

### 准备GTAVC游戏本体

上面提到，reVC项目只涉及GTAVC游戏主程序，不涉及游戏视听素材。因此，我们还需要准备一份GTAVC游戏本体，才能正常游玩reVC。

GTAVC游戏本体的获得方法，此不赘述，各位读者可各显神通。建议使用英文原版，最好不使用当下流行的补丁版、汉化版等。

## 配置reVC项目文件

进入reVC项目文件夹，根据自己电脑安装的VS版本，打开其中的`premake-vsXXXX.cmd`（`XXXX`为版本号）。如电脑安装VS 2022，则选择`premake-vs2019.cmd`即可。等待脚本跑完，目录下会多出一个`build`文件夹。该文件夹内的`reVC.sln`文件就是VS项目文件。

双击打开`reVC.sln`，即可看到reVC项目的全部源代码。对于VS 2022，可能在初次打开项目文件时弹出如下提示：

![](/uploads/屏幕截图-2025-01-04-171515.png)

对此解决方法有二：（一）直接点击确定，将项目所用SDK升级到最新版本，笔者使用过程中无异常；（二）使用Visual Studio Installer安装**MSVC v142 - VS 2019 C++ x64/x86生成工具**，随后可以在不升级项目SDK的情况下打开项目。

打开项目后，笔者不禁感叹：此项目规模之庞大、代码之精良，诚乃世所罕见。不仅体现了R星作为世界级游戏大厂的高超技术功力，也能看出GTAmodding团队逆向工作的严谨细致。该项目可以成为游戏爱好者学习游戏开发不可多得的珍贵资料。

这里需要注意检查解决方案资源管理器，查看`librw`项目下文件加载是否正常。若`librw`项目下为空，则稍后编译时将会报错，如“无法定位文件rw.h”。

![](/uploads/屏幕截图-2025-01-04-163232.png)

## 编译reVC

如上述步骤都没有问题，则可以开始编译reVC。开发组为我们提供了多种编译配置，如可以选择目标平台、使用的音频库和图形库等等，可在上方下拉框内自行选择。

![](/uploads/屏幕截图-2025-01-04-163648.png)

如果选择使用`-oal`（即OpenAL）配置，需要额外安装OpenAL库。但此库经常出bug，故笔者更加推荐使用传统的`-mss`配置来编译。

调整好配置后，选择菜单栏中的生成—生成解决方案，即可开始编译。此时观察输出窗口，如果在生成完毕后没有报错，将会输出生成文件的位置，一般而言是`re3-miami\bin`。进入对应文件夹，就可以看到`reVC.exe`。

![](/uploads/屏幕截图-2025-01-04-164314.png)

## 使用reVC主程序运行GTAVC

将`reVC.exe`程序放入GTAVC游戏本体文件夹。理论上，到这里就可以直接运行`reVC.exe`了。但是笔者在实测过程中发现，可能因缺失一个dll而无法运行游戏，即`libmpg123-0.dll`。这个文件不需要我们下载，它位于`re3-miami\vendor\mpg123\dist`文件夹下，分为Win32和Win64版本。只需将适合自己电脑版本的`libmpg123-0.dll`文件复制到GTAVC游戏目录下，再运行`reVC.exe`即可。

在游戏设置中可以发现，reVC提供了大量原版不具备的新特性，如高分辨率、高帧率支持等等。读者可自行体验。

![](/uploads/屏幕截图-2025-01-04-165329.png)
