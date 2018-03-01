const officegen = require('officegen')
const fs = require('fs')
const path = require('path')

function genDoc(tables, dbPath) {
     docx = officegen({
        type: 'docx',
        orientation: 'portrait',
        pageMargins: {top: 1000, left: 1000, bottom: 1000, right: 1000}
        // The theme support is NOT working yet...
    })

    docx.on('error', function (err) {
        console.log(err)
    })

     pObj = docx.createP()

    // 标题
    pObj = docx.createP({
        align: 'center'
    })
    pObj.addText('数据库文档', {
        color: '000000',
        font_face: '微软雅黑',
        font_size: 40
        // border: 'dotted',
        // borderSize: 12,
        // borderColor: '88CCFF'
        // back: '000088'
    })

     tableStyle = {
        tableColWidth: 4261,
        tableSize: 24,
        tableColor: "333333",
        tableAlign: "left",
        tableFontFamily: "微软雅黑",
        borders: true
    }
    let headOpts = {
        // cellColWidth: 4261,
        b: true,
        sz: '24',
        shd: {
            fill: "f1f1f1"
            // themeFill: "text1",
            // "themeFillTint": "80"
        },
        fontFamily: '微软雅黑'
    }
    let ceilOpts = {
        align: "center",
        cellColWidth: 42,
        sz: '20',
        shd: {
            fill: "f9f9f9"
            // themeFill: "text1",
            // "themeFillTint": "80"
        },
    }

    // let sequelize
    for (let table of tables) {
         tableData = [
            [
                {
                    val: '列名',
                    opts: headOpts
                },
                {
                    val: "中文名",
                    opts: headOpts
                },
                {
                    val: "字段类型",
                    opts: headOpts
                },
                {
                    val: "允许为空",
                    opts: headOpts
                },
                {
                    val: "默认值",
                    opts: headOpts
                },
                {
                    val: "备注",
                    opts: headOpts
                }
            ]
        ]

        for (let row of table.rows) {
            tableData.push([
                {
                    val: row.columnName,
                    opts: ceilOpts
                },
                {
                    val: row.columnNameZh,
                    opts: ceilOpts
                },
                {
                    val: row.dataType,
                    opts: ceilOpts
                },
                {
                    val: row.notNull ? '否' : '是',
                    opts: ceilOpts
                },
                {
                    val: row.default || '',
                    opts: ceilOpts
                },
                {
                    val: row.comment || '',
                    opts: ceilOpts
                }
            ])
        }
        pObj = docx.createP()
        pObj.addText(`${table.name}（${table.comment}）`, {
            color: '000000',
            font_face: '微软雅黑',
            font_size: 20
        })

         pObj = docx.createTable(tableData, tableStyle)

         pObj = docx.createP()
    }

    let docPath = path.resolve(dbPath, 'table.docx')
     out = fs.createWriteStream(docPath)

    out.on('error', function (err) {
        console.log(err)
    })

    return new Promise(function(resolve, reject){
        out.on('close', function () {
            console.log('export docx finish.')
            resolve()
        })
        docx.generate(out)
    })
}

module.exports = genDoc

