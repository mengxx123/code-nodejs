const officegen = require('officegen')
const fs = require('fs')
const path = require('path')

function underlineToUCamel(word) {
    let arr = word.split('_')
    let ret = ''
    for (let word of arr) {
        ret += word.substring(0,1).toUpperCase() + word.substring(1)
    }
    return ret
}

function underlineToLCamel(word) {
    let ret = underlineToUCamel(word)
    ret = ret[0].toLowerCase() + ret.substring(1)
    return ret
}

function genExcel(tables, dbPath) {
    var xlsx = officegen('xlsx');

    xlsx.on('finalize', function (written) {
        console.log('Finish to create an Excel file.\nTotal bytes created: ' + written + '\n');
    });

    xlsx.on('error', function (err) {
        console.log(err);
    });

    sheet = xlsx.makeNewSheet();
    sheet.name = '数据库文档';

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
            let columnName = underlineToLCamel(row.columnName)
            let zh = row.columnNameZh
            sheet.data[curRow] = []
            sheet.data[curRow][0] = columnName
            sheet.data[curRow][1] = zh
            sheet.data[curRow][2] = row.dataType
            sheet.data[curRow][3] = row.notNull ? '否' : '是'
            sheet.data[curRow][4] = row.default || ''
            sheet.data[curRow][5] = row.comment || ''
            curRow++
        }
        curRow++
    }

    let docPath = path.resolve(dbPath, 'table.xlsx')
    var out = fs.createWriteStream(docPath)

    out.on('error', function (err) {
        console.log(err);
    });

    return new Promise(function (resolve, reject) {
        //做一些异步操作
        out.on('close', function () {
            console.log('Finish to create a 做一些异步操作 file.');
            resolve()
        });
        xlsx.generate(out);
    })
}

module.exports = genExcel
