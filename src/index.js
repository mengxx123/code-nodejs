const fs = require('fs')
const path = require('path')
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
            comment: row.Comment,
            primaryKey: row.Key.indexOf('PRI') !== -1,
            foreignKey: false, // TODO
            autoIncrement: row.Extra.indexOf('auto_increment') !== -1
        }
        arr.push(item)
    }
    return arr
}

function exportMarkdown(tables, dbPath) {
    let markdown = '# 数据库文档\n\n'
    for (let table of tables) {
        markdown += `## ${table.name}${table.comment ? ('（' + table.comment + '）') : ''}\n\n`
        markdown += '| 列名 | 中文名 | 字段类型 | 允许为空 | 默认值 | 备注 |\n'
        markdown += '| :--: | :--: | :--: |\n'
        for (let field of table.rows) {
            markdown += `| ${field.columnName} | ${field.columnNameZh} | ${field.dataType} | ${field.notNull ? '否' : '是' } | ${field.default || ' '} | ${field.comment || ' '} |\n`
        }
        markdown += '\n'
    }
    fs.writeFileSync(path.resolve(dbPath, 'table.md'), markdown)
    return markdown
}

async function importFromDatabase() {
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
    return tables
}

async function importFromSql() {
    var contentText = fs.readFileSync('db.sql', 'utf-8')

    let ret = contentText.match(/(CREATE TA[\w\W]+?;)/g)

    let tables = []
    for (let sql of ret) {
        tables.push(generateCode(sql))
    }
    return tables
}

async function main() {
    // 导入数据
    if (config.type === 1) {
        tables = await importFromDatabase()
    } else {
        tables = await importFromSql()
    }
    // 处理数据，便于展示
    for (let table of tables) {
        for (let row of table.rows) {
            if (!row.comment) {
                row.comment = autoComment(row.columnName) || ''
            }
            let zh = row.comment
            let note = ''
            let match = row.comment.match(/[，。（,]/)
            if (/[，。（,]/.test(row.comment)) {
                zh = row.comment.substring(0, match.index)
                note = row.comment.substring(match.index + 1, row.comment.length)
            }
            row.columnNameZh = zh
            row.comment = note
            // enum
            if (row.dataType.indexOf('enum') !== -1) {
                row.comment += row.dataType
                row.dataType = 'enum'
            }
        }
    }
    // 导出
    let distPath = path.resolve(config.export.path)
    if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath)
    }
    let dbPath = path.resolve(config.export.path, config.mysql.database)
    if (!fs.existsSync(dbPath)) {
        fs.mkdirSync(dbPath)
    }
    let htmlPath = path.resolve(dbPath, 'html')
    if (!fs.existsSync(htmlPath)) {
        fs.mkdirSync(htmlPath)
    }
    var fileName = "coverflow-3.0.1.zip";

    var sourceFile = path.join(__dirname, fileName);
    var destPath = path.join(__dirname, "dest", fileName);
    // function copyFile(sourceFile, destPath) {
    //     var readStream = fs.createReadStream(sourceFile)
    //     var writeStream = fs.createWriteStream(destPath)
    //     readStream.pipe(writeStream);
    // }

    function copyfile(src,dir)
    {
        fs.writeFileSync(dir,fs.readFileSync(src));
    }

    let staticPath = path.join(config.path.root, 'static')
    copyfile(path.join(staticPath, 'yunser-ui.css'), path.join(htmlPath, 'yunser-ui.css'))
    copyfile(path.join(staticPath, 'index.css'), path.join(htmlPath, 'index.css'))

    fs.writeFileSync(path.resolve(dbPath, 'table.json'), JSON.stringify(tables, null, config.indent))
    let code = 'let tables = ' + JSON.stringify(tables, null, config.indent) + '\n'
    fs.writeFileSync(path.resolve(dbPath, 'table.js'), code)
    // 导出 Markdown
    let markdown = exportMarkdown(tables, dbPath)
    // 导出 HTML
    let htmlContent = marked(markdown)
    let source = fs.readFileSync(__dirname + '/tpl-user.art', 'utf-8')
    html = template.render(source, {
        title: '数据库文档',
        content: htmlContent
    }, {
        escape: false
    })
    // console.log(html)
    fs.writeFileSync(path.resolve(dbPath, 'html/index.html'), html)
    // TODO 导出 PDF
    // TODO 导出 Word
    console.info('导出成功')
    process.exit()
}

main()
