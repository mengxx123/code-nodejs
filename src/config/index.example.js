const path = require('path')
const java = require('./java')

let config = {
    // 导入类型（1：连接数据库获取数据，2：从 SQL 文件导入数据）
    type: 1,
    // 格式化注释
    formatedComment: true,
    // 数据库
    database: {
        version: '1.0.0',
        tablePrefix: 'ys_', // 表前缀
        showTablePrefix: false, // 是否显示表前缀
        fieldPrefix: 'tb_', // 字段前缀
        showFieldPrefix: false, // 是否显示字段前缀,
        module: [
            {
                name: '财务',
                tables: [
                    'account',
                    'account_in_out',
                    'account_in_out_detail',
                    'all_bill',
                    'bill_type',
                    'pay_type'
                ]
            },
            {
                name: '商城',
                tables: [
                    'attribute',
                    'attribute_value',
                    'back_sale',
                    'back_sale_detail',
                    'brand',
                    'buy_order',
                    'buy_order_item',
                    'buy_pay',
                    'buy_pay_item',
                    'package',
                    'package_item',
                    'product',
                    'product_attribute',
                    'product_category',
                    'product_image',
                    'product_unit',
                    'unit',
                    'shop',
                    'sku'
                ]
            },
            {
                name: '仓库',
                tables: [
                    'check_storage',
                    'check_storage_item',
                    'combin_storage',
                    'combin_storage_item',
                    'in_storage',
                    'in_storage_item',
                    'modify_storage_price',
                    'modify_storage_price_item',
                    'move_storage',
                    'move_storage_item',
                    'out_storage',
                    'out_storage_item',
                    'stock',
                    'storage',
                    'storage_item',
                    'store'
                ]
            },
            {
                name: '其他',
                tables: [
                    'company',
                    'customer',
                    'department',
                    'wage',
                    'logistics',
                    'sale_order',
                    'sale_order_item',
                    'user'
                ]
            }
        ]
    },
    upload: true, // 是否上传到服务器,
    uploadPath: '/usr/local/nginx/project',
    // 服务器
    server: {
        host: 'xx.xx.xx.xx',
        port: 22,
        username: 'xx',
        password: 'xx'
    },
    mysql: {
        host: 'xx.xx.xx.xx',
        // host: 'localhost',
        user: 'xx',
        database: 'xx',
        // database: 'ys_sign',
        password: 'xx'
    },
    // 导出的 JSON 文件缩进空格数量
    indent: 4,
    export: {
        path: path.resolve(__dirname, '../../dist')
    },
    path: {
        root:  path.resolve(__dirname, '../..')
    },
    java: java
}

module.exports = config
