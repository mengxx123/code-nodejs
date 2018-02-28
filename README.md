# 数据库工具库

数据库生成文档系统。

## 功能

* 仅支持 MySQL。
* 支持从 SQL 文件导入数据，或连接账号密码导入数据。
* 支持导出的格式有：JSON、JavaScript

## 使用说明

1. clone 本项目。
2. 安装依赖 `npm install`
3. 进入 `src` 目录（`cd sql-nodejs/src`）。

### 使用 SQL 文件生成文档

1. 使用 MySQL Workbench 等工具导出某个数据库的 sql 文件，重命名为 `db.sql`，置于 `src` 目录下。
2. 运行 `node from-sql`。
 
### 通过配置数据库信息生成文档

1. 编辑 `config.js` 配置数据库信息。
2. 运行 `node index`。

导出的文档和数据保存在 `src/export` 文件夹。