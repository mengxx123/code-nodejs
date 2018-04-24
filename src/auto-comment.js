const config = require('./config')

// 字典，暂时纯手工录入。你可以把自己常用的命名补充到这里，好处是创建数据库表的时候不用重复注释，也可以从数据库获取
const dictionary = {
    // 通用
    'name': '名称',
    'id': 'ID',
    'create': '创建',
    'update': '修改',
    'delete': '删除',
    'is': '是否',
    'note': '备注',
    'desc': '介绍',
    'description': '介绍',
    'time': '时间',
    // 用户系统
    'user': '用户',
    'password': '密码',
    'address': '地址',
    'phone': '手机',
    'email': '邮箱',
    'type': '类型',
    'gender': '性别',
    'sex': '性别',
    'birthday': '生日',
    'fax': '传真',
    'postal_code': '邮编',
    // 电商
    'number': '数量',
    'price': '价格',
    'product': '产品',
    'order': '订单',
    'product': '产品',
    'discount': '折扣',
    // 其他
    'order': '订单',
    'sort': '排序',
    'category': '分类',
    'img': '图片',
    'image': '图片',
    'url': '链接',
    'path': '路径',
    'activity': '活动',
    'detail': '详情',
    'item': '项',
    'create_at': '创建时间',
    'update_at': '修改时间',
    'delete_at': '删除时间',
    'account': '账号',
    'idcard_number': '身份证号码',
    // 你的项目
    'department': '部门',
    'customer': '客户',
    'code': '编号',
    'attribute': '属性',
    'total': '总',
    'parent': '父',
    'child': '子',
    'content': '内容',
    'check': '审核',
    'state': '状态',
    'status': '状态',
    'opening_balance': '期初余额',
    'ending_balance': '期末余额',
    'money': '金额',
    'title': '标题',
    'read': '阅读',
    'business_user_id': '业务员 ID',
}

function autoComment(field) {
    // 去掉前缀
    if (field.indexOf(config.database.fieldPrefix) !== -1) {
        field = field.replace(config.database.fieldPrefix, '')
    }
    if (field.includes('_')) {
        let arr = field.split('_')
        let zh = ''
        for (let i = 0; i < arr.length; i++) {
            if (dictionary[arr[i]]) {
                zh += dictionary[arr[i]]
            } else {
                return null
            }
        }
        return zh
    } else if (/[A-Z]/.test(field)) {
        field = field[0].toLowerCase() + field.substring(1)
        arr = field.replace(/([A-Z])/g,"_$1").toLowerCase().split('_')
        let zh = ''
        for (let i = 0; i < arr.length; i++) {
            if (dictionary[arr[i]]) {
                zh += dictionary[arr[i]]
            } else {
                return null
            }
        }
        return zh
    } else {
        if (dictionary[field]) {
            return dictionary[field]
        }
    }
    return null
}

module.exports = {
    dictionary,
    autoComment
}
