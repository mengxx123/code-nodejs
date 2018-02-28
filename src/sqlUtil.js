function generateCode(sql) {
    let lines = sql.split(/\r|\n/)
    let table = {
        name: '',
        rows: []
    }
    for (let idx = 0; idx < lines.length; idx++) {
        let line = lines[idx]
        line = line.replace(/(^\s*)|(\s*$)/g, '') // 去掉前后空格
        line = line.replace(/,$/, '') // 去掉后面分号
        // 表名
        if (idx === 0) {
            table.name = line.match(/CREATE TABLE `(\w+)`/)[1]
            continue
        }
        // 表注释
        if (idx === lines.length - 1) {
            let match = line.match(/COMMENT='([\w\W]+)'/)
            if (match) {
                table.comment = match[1]
            }
            continue
        }

        let obj = {
            notNull: false
        }
        // 字段
        if (/^`/.test(line)) {
            let arr = line.split(' ')
            for (let i = 0; i < arr.length; i++) {
                if (i === 0) {
                    obj.columnName = arr[i].replace(/`/g, '')
                } else if (i === 1) {
                    obj.dataType = arr[i].replace(/`/g, '')
                } else if (arr[i] === 'NOT') {
                    obj.notNull = true
                } else if (arr[i] === 'DEFAULT') {
                    obj.default = arr[i + 1]
                }
            }
            // 注释
            if (line.indexOf('COMMENT') !== -1) {
                obj.comment = line.substring(line.indexOf('COMMENT')).match(/'([\w\W]+?)'/)[1]
            }
            // 自增
            if (line.indexOf('AUTO_INCREMENT') !== -1) {
                obj.autoIncrement = true
            }
            table.rows.push(obj)
        }
        // 主键
        if (/^PRIMARY KEY/.test(line)) {
            let pk = line.match(/`(\w+)`/)[1]
            for (let row of table.rows) {
                if (row.columnName === pk) {
                    row.primaryKey = true
                }
            }
        }
        // 索引
        if (/^KEY/.test(line)) {
            let indexKey = line.match(/\(`(\w+)`\)/)[1]
            for (let row of table.rows) {
                if (row.columnName === indexKey) {
                    row.key = true
                }
            }
        }
        // 外键
        if (line.indexOf('FOREIGN KEY') !== -1) {
            let fk = line.match(/FOREIGN KEY \(`(\w+)`\)/)[1]
            // let fk = line.match(/FOREIGN KEY \(`(\w+)`\)/)[1]
            for (let row of table.rows) {
                if (row.columnName === fk) {
                    row.foreignKey = true
                }
            }
        }
    }
    return table
}

module.exports = generateCode
