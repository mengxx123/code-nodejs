# 数据库工具库

数据库生成文档系统。

## 功能

* 仅支持 MySQL。
* 支持从 SQL 文件导入数据，或连接账号密码导入数据。
* 支持导出的格式有：JSON、JavaScript

## 使用说明

1. clone 本项目。
2. 安装依赖 `npm install`
3. 编辑 `src/config/index.js` 配置数据库信息。
4. 进入 `src` 目录（`cd sql-nodejs/src`）。
2. 执行 `npm run dist`，导出的文档和数据保存在 `dist` 文件夹。

### 使用 SQL 文件生成文档

使用 MySQL Workbench 等工具导出某个数据库的 sql 文件，重命名为 `db.sql`，置于 `src` 目录下。

## 文档

可以在 `src/config/index` 修改配置，

database.version：用于数据库版本管理，注意不是 MySQL 的版本

在公司或者自己机器上建个Web服务器，大家都可以随时随地的查看，也可另存备份到本地
