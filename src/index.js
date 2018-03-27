const fs = require('fs')
const path = require('path')
const generateCode = require('./sqlUtil')
const mysql = require('mysql2/promise')
const config = require('./config')
const autoComment = require('./auto-comment')
const genJsCode = require('./js/js')
const genJavaCode = require('./java')
const genDoc = require('./office/word')
const genExcel = require('./office/excel')
const genPdf = require('./office/pdf')
const exportHtml = require('./html')
const mkdirs = require('./util/file')
const {Connect, UploadDir} = require('./util/upload')
const archiver = require('archiver')

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

function exportJava(tables, dbPath) {
    let javaPath = path.resolve(dbPath, 'java')
    if (!fs.existsSync(javaPath)) {
        fs.mkdirSync(javaPath)
    }
    // for (let table of tables) {
    //     for (let row of table.rows) {
    //         let
    //         table.name = table.name.replace(config.database.tablePrefix, '')
    //     }
    // }
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
        // remove table prefix
        if (config.database.tablePrefix && !config.database.showTablePrefix) {
            table.name = table.name.replace(config.database.tablePrefix, '')
        }
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
            // remove field prefix
            if (config.database.fieldPrefix && !config.database.showFieldPrefix) {
                row.columnName = row.columnName.replace(config.database.fieldPrefix, '')
            }
            // enum
            if (row.dataType.indexOf('enum') !== -1) {
                row.comment += row.dataType
                row.dataType = 'enum'
            }
        }
    }
    // 导出
    let dbPath = path.resolve(config.export.path, config.mysql.database, config.database.version)
    let htmlPath = path.resolve(dbPath, 'html')
    mkdirs(htmlPath)

    function copyfile(src,dir) {
        fs.writeFileSync(dir,fs.readFileSync(src));
    }

    let staticPath = path.join(config.path.root, 'static')
    copyfile(path.join(staticPath, 'yunser-ui.css'), path.join(htmlPath, 'yunser-ui.css'))
    copyfile(path.join(staticPath, 'index.css'), path.join(htmlPath, 'index.css'))

    fs.writeFileSync(path.resolve(dbPath, 'table.json'), JSON.stringify(tables, null, config.indent))
    let code = 'let tables = ' + JSON.stringify(tables, null, config.indent) + '\n'
    fs.writeFileSync(path.resolve(dbPath, 'table.js'), code)

    // 导出
    console.info('导出文档...')
    exportMarkdown(tables, dbPath)
    exportHtml(tables, dbPath)
    genJsCode(tables, dbPath)
    genJavaCode(tables, dbPath)
    exportJava(tables, dbPath)
    await genDoc(tables, dbPath)
    await genExcel(tables, dbPath)
    await genPdf(tables, dbPath)
    console.info('导出成功')
    if (config.upload) {
        console.log('压缩文档...')
        let zipFile = path.resolve(dbPath, '../example.zip')
        console.log(zipFile)
        var output = fs.createWriteStream(zipFile)
        var archive = archiver('zip', {
            zlib: { level: 9 } // Sets the compression level.
        });
        output.on('close', function() {
            console.log(archive.pointer() + ' total bytes');
            console.log('archiver has been finalized and the output file descriptor has closed.');
        });
        output.on('end', function() {
            console.log('Data has been drained');
        });
        archive.pipe(output);
        archive.directory(dbPath, 'test');
        archive.finalize();
        console.log('文档压缩完成...')
        return
        console.log('链接服务器...')
        Connect(config.server, function () {
            console.log('链接服务器成功')
            console.log('准备上传...')
            let start = new Date().getTime()
            UploadDir(config.server, dbPath, config.uploadPath, function () {
                let time = parseInt((new Date().getTime() - start) / 1000)
                console.log(`上传完成，耗时 ${time}ms`)
                // console.log('上传完成')
                process.exit()
            })
        })
    } else {
        process.exit()
    }
}

main()
