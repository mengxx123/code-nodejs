const officegen = require('officegen')
const fs = require('fs')
const path = require('path')

function genExcel(tables, dbPath) {
    let xlsx = officegen('xlsx')

    xlsx.on('finalize', function (written) {
        // console.log('Finish to create an Excel file.\nTotal bytes created: ' + written + '\n')
    })

    xlsx.on('error', function (err) {
        console.log(err)
    })

    sheet = xlsx.makeNewSheet()
    sheet.name = '数据库文档'

    let curRow = 0
    for (let table of tables) {

        sheet.data[curRow] = []
        sheet.data[curRow][0] = table.name
        sheet.data[curRow][1] = table.comment
        curRow++
        sheet.data[curRow] = []
        sheet.data[curRow][0] = '列名'
        sheet.data[curRow][1] = '中文名'
        sheet.data[curRow][2] = '字段类型'
        sheet.data[curRow][3] = '允许为空'
        sheet.data[curRow][4] = '默认值'
        sheet.data[curRow][5] = '备注'
        curRow++
        for (let row of table.rows) {
            sheet.data[curRow] = []
            sheet.data[curRow][0] = row.columnName
            sheet.data[curRow][1] = row.columnNameZh
            sheet.data[curRow][2] = row.dataType
            sheet.data[curRow][3] = row.notNull ? '否' : '是'
            sheet.data[curRow][4] = row.default || ''
            sheet.data[curRow][5] = row.comment || ''
            curRow++
        }
        curRow++
    }

    let docPath = path.resolve(dbPath, 'table.xlsx')
    let out = fs.createWriteStream(docPath)

    out.on('error', function (err) {
        console.log(err)
    })

    return new Promise(function (resolve, reject) {
        //做一些异步操作
        out.on('close', function () {
            console.log('report xlsx finish.')
            resolve()
        })
        xlsx.generate(out)
    })
}

module.exports = genExcel
