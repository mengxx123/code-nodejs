function generateCode(sql) {
    let lines = sql.split('\n')
    for (let line of lines) {
        line = line.replace(/(^\s*)|(\s*$)/g, '')
        console.log(line)
        if (line.test(/^`/)) {
            
        }
    }
}

module.exports = generateCode
