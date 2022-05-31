---
date: 2022-04-27
title: Welcome
description: 欢迎来到 Picker，通过开始使用或探索我们的API方档来了解我们的产品。
layout: home.njk
---

<!-- 这个页面是 docs/index.md 的副本，在生产品环境中作为项目根目录的是 /docs -->

Picker 基于 Nestjs、Mikro-ORM、GraphQL等技术实现的 Headless 基础框架全栈系统

Headless 是一个术语，意思是它不关心自己渲染一个网站的 HTML 页面。相反，它公开了一个 GraphQL API，客户端应用程序可以查询它的数据。

Picker 是一个应用基础框架，它提供了核心的无业务无关的系统功能，包括
- CMS核心功能
- 插件系统
- 内置插件实现
  - 小程序
  - 企业微信
  - 附件资源
  - 全文检索
  - 消息队列
  - ……
系统对于开发人员的进一步扩展是开放的，主要是面向用户是自由职业者、开发者、学生、新人，都可以很好上手。

# 谁应该使用 Picker？
Picker 的目的是提供无缝且简单的开发体验，但Picker并不针对非技术用户。

# Picker 建立在什么技术之上？

- Picker 是用 [TypeScript](https://www.typescriptlang.org/) 编写的
- [Nodejs](https://nodejs.org/zh-cn/) 是运行时平台
- 数据层由 [Mikro-ORM](https://mikro-orm.io/)处理，它与大多数的数据库兼容
- [Nest](https://nestjs.com/) 被用作底层架构
- API 是由 [Apollo Server](https://www.apollographql.com/docs/apollo-server/) 提供的 [GraphQL](https://graphql.org/)
- Admin UI 应用是用 [Vue](https://vuejs.org/) 构建的
