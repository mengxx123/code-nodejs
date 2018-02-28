const fs = require('fs')
const generateCode = require('./sqlUtil')
const config = require('./config')

var contentText = fs.readFileSync('db.sql', 'utf-8')

let ret = contentText.match(/(CREATE TA[\w\W]+?;)/g)

let tables = []
for (let sql of ret) {
    tables.push(generateCode(sql))
}
fs.writeFileSync('export/table.json', JSON.stringify(tables, null, config.indent))
console.info('导出成功')
process.exit()
