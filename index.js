const fs = require('fs')
const generateCode = require('./sqlUtil2')

var contentText = fs.readFileSync('123.sql', 'utf-8')

// console.log(contentText);

let ret = contentText.match(/(CREATE TA[\w\W]+?;)/g)
console.log(ret.length)
for (let sql of ret) {
    // console.log(sql)
}
let result = generateCode(ret[0])
console.log(result)