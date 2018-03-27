const fs = require('fs')
const path = require('path')

function mkdirs(dirpath, mode) {
    if (!fs.existsSync(dirpath)) {
        // 尝试创建父目录，然后再创建当前目录
        mkdirs(path.dirname(dirpath), mode)
        fs.mkdirSync(dirpath, mode)
    }
}

module.exports = mkdirs
