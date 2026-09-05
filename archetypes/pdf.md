---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: "{{ .Date }}"
draft: true

description: ""

pdf: "/files/"
---
<!--在终端输入hugo new content --kind pdf documents/example.md会自动生成：
---
title: "Example"
date: ...
draft: true

description: ""

pdf: "/files/"
---
后续只需补齐pdf: "/files/example.pdf"即可
该插件用于处理PDF文件而免去手写yml配置
-->