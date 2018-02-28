console.log()
const fs = require('fs')
const path = require('path')
const generateCode = require('../sqlUtil')
const mysql = require('mysql2/promise')
const config = require('../config/index')
const autoComment = require('../auto-comment')
const marked = require('marked')
const template = require('art-template')
const beautify = require('js-beautify').js_beautify

// 自动生成小项目的 idea 实践
// let projectPath = 'D:\\yunser\\yunser-nodejs'
let projectPath = 'D:\\yunser\\sql-nodejs\\dist\\asd'

// fs.writeFileSync(path.resolve(projectPath, 'robots.txt'), '123')

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

// TODO 补充完整
function getType(dataType) {
    if (dataType.includes('varchar')) {
        return 'String'
    } else if (dataType.includes('int')) {
        return 'Integer'
    } else if (dataType.includes('decimal')) {
        return 'Float'
    } else if (dataType.includes('datetime')) {
        return 'Date'
    }
    return 'String'
}

function dealTable(table, jsPath) {
    let tableName = table.name
    if (config.database.tablePrefix) {
        tableName = tableName.replace(config.database.tablePrefix, '')
    }
    tableName = underlineToUCamel(tableName)
    let code = `/**
     * xxx.
     * 
     * Author: yunser
     * Email: admin@yunser.com
     */
    
    import java.util.Date;

    /**
     * ${table.comment}（${table.name}）
     * 
     * @author yunser
     * @version 1.0.0 2018-02-28
     */
    public class ${tableName} {

    FIELDS
}
`
    let imports = ['import java.util.Date;']

    let arr = []
    for (let row of table.rows) {
        let columnName = underlineToLCamel(row.columnName)
        let type = getType(row.dataType)
        let zh = row.columnNameZh
        arr.push(`/** ${zh} */
            private ${type} ${columnName};`)
    }
    arr.push('\n')
    for (let row of table.rows) {
        let columnName = underlineToLCamel(row.columnName)
        let uColumnName = underlineToUCamel(row.columnName)
        let type = getType(row.dataType)
        let zh = row.columnNameZh
        arr.push(`/**
             * 获取${zh}
             * 
             * @return ${zh}
             */
            public ${type} get${uColumnName}() {
                return this.${columnName};
            }
        
            /**
             * 设置${zh}
             * 
             * @param ${columnName}
             *          ${zh}
             */
            public void set${uColumnName}(${type} ${columnName}) {
                this.${columnName} = ${columnName};
            }
            `)
    }

    code = code.replace('FIELDS', arr.join('\n'))
    code = beautify(code, { indent_size: 4 }) + '\n'
    fs.writeFileSync(path.resolve(jsPath, tableName + '.java'), code)
}

function genJavaCode(tables, dbPath) {
    let javaPath = path.resolve(dbPath, 'java')
    if (!fs.existsSync(javaPath)) {
        fs.mkdirSync(javaPath)
    }
    // let sequelize
    for (let table of tables) {
        dealTable(table, javaPath)
    }
}
module.exports = genJavaCode
