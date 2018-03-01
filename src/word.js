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

function genDoc(tables, dbPath) {
    var docx = officegen({
        type: 'docx',
        orientation: 'portrait',
        pageMargins: {top: 1000, left: 1000, bottom: 1000, right: 1000}
        // The theme support is NOT working yet...
    });

    docx.on('error', function (err) {
        console.log(err);
    });

    var pObj = docx.createP();

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

    var tableStyle = {
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
        var tableData = [
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
            let columnName = underlineToLCamel(row.columnName)
            let zh = row.columnNameZh
            tableData.push([
                {
                    val: columnName,
                    opts: ceilOpts
                },
                {
                    val: zh,
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

        var pObj = docx.createTable(tableData, tableStyle);

        var pObj = docx.createP();
    }

    let docPath = path.resolve(dbPath, 'table.docx')
    var out = fs.createWriteStream(docPath);

    out.on('error', function (err) {
        console.log(err);
    });

    console.log('什么鬼')

    // out.on('close', function () {
    //     console.log('Finish to create a DOCX file.');
    //     done(null);
    // });
    // let gret = docx.generate(out);
    // console.log(gret)

    return new Promise(function(resolve, reject){
        //做一些异步操作
        out.on('close', function () {
            console.log('Finish to create a DOCX file.');
            resolve()
        });
        docx.generate(out);
        // setTimeout(function(){
        //     console.log('执行完成');
        //     resolve('随便什么数据');
        // }, 2000);
    })
}

module.exports = genDoc

