const path = require('path')
const java = require('./java')

let config = {
    // 导入类型（1：连接数据库获取数据，2：从 SQL 文件导入数据）
    type: 1,
    // 格式化注释
    formatedComment: true,
    // 数据库配置,
    database: {
        tablePrefix: 'ys_', // 表前缀
        showTablePrefix: false, // 是否显示表前缀
        fieldPrefix: 'tb_', // 字段前缀
        showFieldPrefix: false // 是否显示字段前缀
    },
    mysql: {
        host: 'localhost',
        user: 'root',
        database: 'ys_erp',
        // database: 'ys_sign',
        password: '123456'
    },
    // 导出的 JSON 文件缩进空格数量
    indent: 4,
    export: {
        path: path.resolve(__dirname, '../../dist')
    },
    path: {
        root:  path.resolve(__dirname, '../..')
    },
    java: java
}

module.exports = config
