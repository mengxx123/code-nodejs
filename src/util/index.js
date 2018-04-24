const autoComment = require('../auto-comment')

function getNameFromComment(comment, columnName) {
    if (!comment) {
        return autoComment.autoComment(columnName) || ''
    }
    let arr = comment.split(/[（(,，。\s]/)
    let name = arr[0]
    // name = name.replace()
    return name
}

function getCommentFromComment(comment) {
    if (!comment.includes('//')) {
        return ''
    }
    let simpleComment = comment.match(/\/\/([\w\W]+)/)[1]
    simpleComment = simpleComment.replace('!deprecated', '')
    simpleComment = simpleComment.replace(/[（\(][\w\W]+?[）\)]/, '')
    return simpleComment
}

function getValues(comment) {
    let match = comment.match(/[（\(]([\w\W]+?)[）\)]/)
    if (match && match[1]) {
        let arr = match[1].split(/[,，]/)
        let values = []
        for (let item of arr) {
            let arr2 = item.split(/[:：]/)
            values.push({
                name: arr2[0],
                description: arr2[1]
            })
        }
        return values
    }
    return null
}

// 删除多余的空白符（多个空白符变成一个）
function removeMuchBlank(str) {
    return str.replace(/\s+/g, ' ')
}

module.exports = {
    getNameFromComment: getNameFromComment,
    getCommentFromComment: getCommentFromComment,
    removeMuchBlank: removeMuchBlank,
    getValues: getValues
}