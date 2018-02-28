const fs = require('fs')
const path = require('path')
const generateCode = require('../sqlUtil')
const mysql = require('mysql2/promise')
const config = require('../config/index')
const autoComment = require('../auto-comment')
const marked = require('marked')
const template = require('art-template')
const beautify = require('js-beautify').js_beautify


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
    // let map = {
    //
    // }
    if (dataType.includes('varchar')) {
        return 'STRING'
    } else if (dataType.includes('text')) {
        return 'TEXT'
    } else if (dataType.includes('int')) {
        return 'INTEGER'
    } else if (dataType.includes('decimal')) {
        return 'FLOAT'
    } else if (dataType.includes('datetime')) {
        return 'DATE'
    }
    return 'STRING'
}

function dealTable(table, jsPath) {
    let tableName = table.name
    if (config.database.tablePrefix) {
        tableName = tableName.replace(config.database.tablePrefix, '')
    }
    tableName = underlineToLCamel(tableName)
    let plural = tableName + 's'
    let code = `/**
 * XXX 模块
 */

var express = require('express')
var router = express.Router()
const ${tableName}Service = require('../service/${tableName}')

router.get('/${plural}', function(req, res, next) {
    ${tableName}Service.getAll(req, res, next)
})

router.get('/${plural}/:id', function(req, res, next) {
    ${tableName}Service.getById(req, res, next)
})

router.post('/${plural}', function(req, res, next) {
    ${tableName}Service.add(req, res, next)
})

router.put('/${plural}', function(req, res, next) {
    ${tableName}Service.update(req, res, next)
})

router.delete('/${plural}/:id', function(req, res, next) {
    ${tableName}Service.deleteById(req, res, next)
})

module.exports = router

`
    let arr = []
    for (let row of table.rows) {
        let columnName = underlineToLCamel(row.columnName)
        let type = getType(row.dataType)
        arr.push(`${columnName}: {
        type: Sequelize.${type},
        field: '${row.columnName}'
    }`)

        // console.log(tableName)
        // console.log(row)
        // let table.name = table.name.replace(config.database.tablePrefix, '')
    }



    code = code.replace('FIELDS', arr.join(',\n'))
    code = beautify(code, { indent_size: 4 }) + '\n'
    fs.writeFileSync(path.resolve(jsPath, tableName + '.js'), code)
}

function makeControllerCode(tables, dbPath) {
    let jsPath = path.resolve(dbPath, 'controller')
    if (!fs.existsSync(jsPath)) {
        fs.mkdirSync(jsPath)
    }
    // let sequelize
    for (let table of tables) {
        dealTable(table, jsPath)
    }
}

module.exports = makeControllerCode
