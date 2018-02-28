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
    let code = `const uuid = require('uuid/v1')
const ${tableName}Model = require('../model/${tableName}')

module.exports = {
    getById: async function (req, res, next) {
        let id = req.params.id
        let ${tableName} = await ${tableName}Model.getById(id)
        res.json(${tableName})
    },
    add: async function (req, res, next) {
        let userId = req.body.user_id
        let receiver = req.body.receiver
        let areaId = '1'
        let detail = req.body.detail
        let phone = req.body.phone
        let isDefault = req.body.is_default

        // TODO 参数验证

        let ${tableName} = {
            id: '' + uuid(), // TODO
            userId: userId,
            receiver: receiver,
            areaId: areaId,
            detail: detail,
            phone: phone,
            detail: detail,
            isDefault: isDefault,
            createTime: new Date().getTime(),
            updateTime: new Date().getTime()
        }
        address = await addressModel.add(address)
        res.json(address)
    },
    update: async function (req, res, next) {
        let id = req.params.id
        let userId = req.body.user_id
        let receiver = req.body.receiver
        let areaId = '1'
        let detail = req.body.detail
        let phone = req.body.phone
        let isDefault = req.body.is_default

        // TODO 参数验证

        let ${tableName} = {
            id: id,
            userId: userId,
            receiver: receiver,
            areaId: areaId,
            detail: detail,
            phone: phone,
            detail: detail,
            isDefault: isDefault,
            updateTime: new Date().getTime()
        }
        ${tableName} = await ${tableName}Model.updateById(${tableName})
        res.json(${tableName})
    },
    deleteById: async function (req, res, next) {
        let ${tableName}Id = req.params.id
        await ${tableName}Model.deleteById(${tableName}Id)
    }
}


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
    let jsPath = path.resolve(dbPath, 'service')
    if (!fs.existsSync(jsPath)) {
        fs.mkdirSync(jsPath)
    }
    // let sequelize
    for (let table of tables) {
        dealTable(table, jsPath)
    }
}

module.exports = makeControllerCode
