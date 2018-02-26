function generateCode(sql) {
    let lines = sql.split(/\r|\n/)
    let obj = {
        notNull: false
    }
    for (let idx = 0; idx < lines.length; i++) {
        let line = lines[i]
        line = line.replace(/(^\s*)|(\s*$)/g, '')
        if (idx === 0) {
            console.log('表格名' + line)
        }

        // line = line.replace(/(^\s*)|(\s*$)/g, '')
        if (/^`/.test(line)) {
            let arr = line.split(' ')
            for (let i = 0; i < arr.length; i++) {
                if (i === 0) {
                    obj.columnName = arr[i].replace(/`/g, '')
                } else if (i === 1) {
                    obj.dataType = arr[i].replace(/`/g, '')
                } else if (arr[i] === 'NOT') {
                    obj.notNull = true
                } else  if (arr[i] === 'DEFAULT') {
                    obj.default = arr[i + 1]
                } else  if (arr[i] === 'COMMENT') {
                    obj.comment = arr[i + 1]
                }
            }
        }
    }
    console.log(obj)
}

module.exports = generateCode
