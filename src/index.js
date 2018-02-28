const fs = require('fs')
const generateCode = require('./sqlUtil')
const mysql = require('mysql2/promise')
const config = require('./config')
const autoComment = require('./auto-comment')
const marked = require('marked')
const template = require('art-template')

let connection
let pool

async function dealTable(tableName) {
    let rows = await connection.execute(`SHOW FULL COLUMNS FROM ` + tableName)
    rows = rows[0]
    let arr = []
    for (let row of rows) {
        let item = {
            columnName: row.Field,
            notNull: row.Null === 'YES',
            dataType: row.Type,
            default: row.Default,
            comment: row.Comment || autoComment(row.Comment),
            primaryKey: row.Key.indexOf('PRI') !== -1,
            foreignKey: false, // TODO
            autoIncrement: row.Extra.indexOf('auto_increment') !== -1
        }
        arr.push(item)
    }
    return arr
}

async function main() {
    // 链接数据库
    connection = await mysql.createConnection({
        host: config.mysql.host,
        user: config.mysql.user,
        database: config.mysql.database,
        password: config.mysql.password
    })
    pool = mysql.createPool({
        database: config.mysql.database
    })
    // 获取表数据（表名和表注释）
    let rows = await connection.execute('show table status')
    rows = rows[0]
    let tables = []
    for (let row of rows) {
        tables.push({
            name: row.Name,
            comment: row.Comment,
            rows: []
        })
    }
    // 获取表结构
    for (let table of tables) {
        table.rows = await dealTable(table.name)
    }
    // 导出
    fs.writeFileSync('src/export/table.json', JSON.stringify(tables, null, config.indent))
    let code = 'let tables = ' + JSON.stringify(tables, null, config.indent) + '\n'
    fs.writeFileSync('src/export/table.js', code)
    // 导出 Markdown
    let markdown = exportMarkdown(tables)
    // 导出 HTML
    let htmlContent = marked(markdown)
    let source = fs.readFileSync(__dirname + '/tpl-user.art', 'utf-8')
    html = template.render(source, {
        title: '数据文档',
        content: htmlContent
    }, {
        escape: false
    })
    console.log(html)
    fs.writeFileSync('src/export/table.html', html)
    // TODO 导出 PDF
    console.info('导出成功')
    process.exit()
}

function exportMarkdown(tables) {
    let markdown = '# 数据库文档\n\n'
    for (let table of tables) {
        markdown += `## ${table.name}${table.comment ? ('（' + table.comment + '）') : ''}\n\n`
        markdown += '| 列名 | 字段类型 | 注释 |\n'
        markdown += '| :--: | :--: | :--: |\n'
        for (let field of table.rows) {
            markdown += `| ${field.columnName} | ${field.dataType} | ${field.comment || ''} |\n`
        }
        markdown += '\n'
    }
    fs.writeFileSync('src/export/table.md', markdown)
    return markdown
}

main()
