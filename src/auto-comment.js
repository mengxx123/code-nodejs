// 字典，暂时纯手工录入。你可以把自己常用的命名补充到这里，好处是创建数据库表的时候不用重复注释，也可以从数据库获取
const dictionary = {
    // 通用
    'name': '名称',
    'id': '编号',
    'create_time': '创建时间',
    'update_time': '修改时间',
    'delete_time': '删除时间',
    'is_delete': '是否删除',
    'user_id': '用户 ID',
    'number': '数量',
    'price': '价格',
    'note': '备注',
    'desc': '介绍',
    'description': '介绍',
    // 用户系统
    'user': '用户',
    'address': '地址',
    'phone': '手机',
    'email': '邮箱',
    'type': '类型',
    'gender': '性别',
    'birthday': '生日',
    'fax': '传真',
    'postal_code': '邮编',
    // 电商
    'product': '产品',
    'order': '订单',
    'product': '商品',
    'discount': '折扣',
    // 其他
    'order': '订单',
    'sort': '排序',
    'category': '分类',
    'img': '图片',
    'image': '图片',
    'url': '链接',
    'path': '路径',
    // 你的项目
    'department': '部门',
    'customer': '客户',
}
// create_time  is_delete user_id ys_buy_item parent_id 父分类 ID ys_product_category postal_code

function autoComment(field) {
    if (dictionary[field]) {
        return dictionary[field]
    }
    return null
}

module.exports = autoComment
