const marked = require('marked')
const fs = require('fs')
const template = require('art-template')
const path = require('path')

function exportHtml(tables, dbPath) {
    let markdown = '<h1>数据库文档</h1>\n'
    // 生成目录
    markdown += `<h2>目录</h2>
    <ul>`

    for (let idx in tables) {
        idx = parseInt(idx) // TODO 奇怪了
        let table = tables[idx]
        markdown += `<li>${table.name}</li>`
    }
    markdown += '</ul>'
    for (let idx in tables) {
        idx = parseInt(idx) // TODO 奇怪了
        let table = tables[idx]
        // console.log(typeof idx)
        markdown += `<h2><span class="index">${idx + 1}</span> ${table.name}${table.comment ? ('（' + table.comment + '）') : ''}</h2>\n`
        markdown += '<table><tr><th>列名</th><th>中文名</th><th>字段类型</th><th>允许为空</th><th>默认值</th><th>备注</th></tr>\n'
        // markdown += '| :--: | :--: | :--: |\n'
        for (let field of table.rows) {
            markdown += `<tr>
 <td>${field.columnName}</td>
   <td>${field.columnNameZh}</td>
   <td>${field.dataType}</td>
   <td>${field.notNull ? '是' : '否' }</td>
   <td>${field.default || ' '}</td>
   <td>${field.comment || ' '}</td>
   </tr>\n`
        }
        markdown += '</table>\n'
    }
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
}

module.exports = exportHtml

