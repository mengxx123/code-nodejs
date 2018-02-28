let tables = [
    {
        "name": "ys_back_sale",
        "comment": "退货单",
        "rows": [
            {
                "columnName": "id",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": null,
                "comment": null,
                "primaryKey": true,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "create_time",
                "notNull": false,
                "dataType": "datetime",
                "default": "CURRENT_TIMESTAMP",
                "comment": "创建时间",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "update_time",
                "notNull": false,
                "dataType": "datetime",
                "default": "CURRENT_TIMESTAMP",
                "comment": "修改时间",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "user_id",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": null,
                "comment": "操作员 ID",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "ys_back_salecol",
                "notNull": true,
                "dataType": "varchar(45)",
                "default": null,
                "comment": null,
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            }
        ]
    },
    {
        "name": "ys_back_sale_detail",
        "comment": "退货单明细",
        "rows": [
            {
                "columnName": "id",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": null,
                "comment": null,
                "primaryKey": true,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "back_sale_id",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": null,
                "comment": null,
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "product_id",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": null,
                "comment": null,
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "number",
                "notNull": false,
                "dataType": "int(11)",
                "default": null,
                "comment": "数量",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "price",
                "notNull": false,
                "dataType": "decimal(10,2)",
                "default": null,
                "comment": "价格",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            }
        ]
    },
    {
        "name": "ys_buy",
        "comment": "进货表",
        "rows": [
            {
                "columnName": "id",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": null,
                "comment": null,
                "primaryKey": true,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "user_id",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": null,
                "comment": "进货人 ID",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "create_time",
                "notNull": false,
                "dataType": "datetime",
                "default": "CURRENT_TIMESTAMP",
                "comment": "创建时间",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "update_time",
                "notNull": false,
                "dataType": "datetime",
                "default": "CURRENT_TIMESTAMP",
                "comment": "修改时间",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "ys_buycol",
                "notNull": true,
                "dataType": "varchar(45)",
                "default": null,
                "comment": null,
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            }
        ]
    },
    {
        "name": "ys_buy_item",
        "comment": "进货表明",
        "rows": [
            {
                "columnName": "id",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": null,
                "comment": null,
                "primaryKey": true,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "product_id",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": null,
                "comment": "产品 ID",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "buy_order_id",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": null,
                "comment": null,
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "number",
                "notNull": false,
                "dataType": "int(11)",
                "default": null,
                "comment": null,
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "price",
                "notNull": false,
                "dataType": "decimal(10,2)",
                "default": null,
                "comment": "价格",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            }
        ]
    },
    {
        "name": "ys_customer",
        "comment": "客户",
        "rows": [
            {
                "columnName": "id",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": null,
                "comment": "编号",
                "primaryKey": true,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "name",
                "notNull": false,
                "dataType": "varchar(16)",
                "default": null,
                "comment": "名称",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "address",
                "notNull": false,
                "dataType": "varchar(256)",
                "default": "",
                "comment": "地址",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "phone",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": "",
                "comment": "手机",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "type",
                "notNull": false,
                "dataType": "varchar(16)",
                "default": "",
                "comment": "类型。小顾客、普通客户、重点客户之类的。",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "gender",
                "notNull": false,
                "dataType": "int(8)",
                "default": "0",
                "comment": "性别。（1：男，2：女）",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "birthday",
                "notNull": true,
                "dataType": "datetime",
                "default": null,
                "comment": "生日",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "note",
                "notNull": false,
                "dataType": "varchar(512)",
                "default": "",
                "comment": "备注",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "create_time",
                "notNull": false,
                "dataType": "datetime",
                "default": "CURRENT_TIMESTAMP",
                "comment": "创建时间",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "update_time",
                "notNull": false,
                "dataType": "datetime",
                "default": "CURRENT_TIMESTAMP",
                "comment": "修改时间",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            }
        ]
    },
    {
        "name": "ys_department",
        "comment": "部门",
        "rows": [
            {
                "columnName": "id",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": null,
                "comment": "ID",
                "primaryKey": true,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "name",
                "notNull": true,
                "dataType": "varchar(16)",
                "default": null,
                "comment": "名称",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            }
        ]
    },
    {
        "name": "ys_enter_stock",
        "comment": "入库单",
        "rows": [
            {
                "columnName": "id",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": null,
                "comment": null,
                "primaryKey": true,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "user_id",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": null,
                "comment": "入库人",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            }
        ]
    },
    {
        "name": "ys_enter_stock_detail",
        "comment": "入库单明细",
        "rows": [
            {
                "columnName": "id",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": null,
                "comment": null,
                "primaryKey": true,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "user_id",
                "notNull": true,
                "dataType": "varchar(32)",
                "default": null,
                "comment": "入库人",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            }
        ]
    },
    {
        "name": "ys_product",
        "comment": "商品",
        "rows": [
            {
                "columnName": "id",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": null,
                "comment": null,
                "primaryKey": true,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "name",
                "notNull": true,
                "dataType": "varchar(45)",
                "default": null,
                "comment": null,
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "desc",
                "notNull": true,
                "dataType": "varchar(45)",
                "default": null,
                "comment": "商品介绍",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "price",
                "notNull": true,
                "dataType": "varchar(45)",
                "default": null,
                "comment": null,
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            }
        ]
    },
    {
        "name": "ys_product_category",
        "comment": "商品分类",
        "rows": [
            {
                "columnName": "id",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": null,
                "comment": "ID",
                "primaryKey": true,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "name",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": null,
                "comment": "名称",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "parent_id",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": "0",
                "comment": "父分类 ID。顶级分类设为 0。",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "description",
                "notNull": false,
                "dataType": "varchar(512)",
                "default": "",
                "comment": "描述",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "sort",
                "notNull": false,
                "dataType": "int(8)",
                "default": "100",
                "comment": "排序",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "create_time",
                "notNull": false,
                "dataType": "datetime",
                "default": "CURRENT_TIMESTAMP",
                "comment": "创建时间",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "update_time",
                "notNull": false,
                "dataType": "datetime",
                "default": "CURRENT_TIMESTAMP",
                "comment": "修改时间",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            }
        ]
    },
    {
        "name": "ys_product_image",
        "comment": "商品图片",
        "rows": [
            {
                "columnName": "id",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": null,
                "comment": null,
                "primaryKey": true,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "product_id",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": null,
                "comment": null,
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "url",
                "notNull": false,
                "dataType": "varchar(512)",
                "default": null,
                "comment": null,
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "sort",
                "notNull": false,
                "dataType": "int(8)",
                "default": "100",
                "comment": null,
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            }
        ]
    },
    {
        "name": "ys_product_unit",
        "comment": "商品计量单位。",
        "rows": [
            {
                "columnName": "id",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": null,
                "comment": "ID",
                "primaryKey": true,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "name",
                "notNull": false,
                "dataType": "varchar(8)",
                "default": null,
                "comment": "名称",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "create_time",
                "notNull": false,
                "dataType": "datetime",
                "default": "CURRENT_TIMESTAMP",
                "comment": "创建时间",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "update_time",
                "notNull": false,
                "dataType": "datetime",
                "default": "CURRENT_TIMESTAMP",
                "comment": "修改时间",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "sort",
                "notNull": false,
                "dataType": "int(8)",
                "default": "100",
                "comment": "排序",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            }
        ]
    },
    {
        "name": "ys_sale",
        "comment": "销售",
        "rows": [
            {
                "columnName": "id",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": null,
                "comment": "ID",
                "primaryKey": true,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "user_id",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": null,
                "comment": "创建者 ID",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            }
        ]
    },
    {
        "name": "ys_sale_item",
        "comment": "销售明细。SALEORDER_ID 为 NULL 时, 为现金销售",
        "rows": [
            {
                "columnName": "id",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": null,
                "comment": null,
                "primaryKey": true,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "sale_id",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": null,
                "comment": "销售 ID",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "product_id",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": null,
                "comment": "产品 ID",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "sale_order_id",
                "notNull": false,
                "dataType": "varchar(45)",
                "default": null,
                "comment": "销售订单 ID",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "number",
                "notNull": false,
                "dataType": "varchar(45)",
                "default": null,
                "comment": "数量",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "price",
                "notNull": false,
                "dataType": "decimal(10,2)",
                "default": null,
                "comment": "价格",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "discount",
                "notNull": false,
                "dataType": "decimal(10,2)",
                "default": null,
                "comment": "折扣",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "ys_sale_itemlcol",
                "notNull": true,
                "dataType": "varchar(45)",
                "default": null,
                "comment": null,
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            }
        ]
    },
    {
        "name": "ys_store",
        "comment": "仓库",
        "rows": [
            {
                "columnName": "id",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": null,
                "comment": null,
                "primaryKey": true,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "manager_id",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": null,
                "comment": "管理员 ID",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "sort",
                "notNull": false,
                "dataType": "int(4)",
                "default": "100",
                "comment": "排序",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "address",
                "notNull": false,
                "dataType": "varchar(256)",
                "default": "",
                "comment": "地址",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "create_time",
                "notNull": false,
                "dataType": "datetime",
                "default": "CURRENT_TIMESTAMP",
                "comment": "创建时间",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "update_time",
                "notNull": false,
                "dataType": "datetime",
                "default": "CURRENT_TIMESTAMP",
                "comment": "修改时间",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "ys_storecol",
                "notNull": true,
                "dataType": "varchar(45)",
                "default": null,
                "comment": null,
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            }
        ]
    },
    {
        "name": "ys_supplier",
        "comment": "供应商",
        "rows": [
            {
                "columnName": "id",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": null,
                "comment": "编号",
                "primaryKey": true,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "name",
                "notNull": false,
                "dataType": "varchar(64)",
                "default": null,
                "comment": "名称",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "person",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": "",
                "comment": "负责人",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "address",
                "notNull": false,
                "dataType": "varchar(256)",
                "default": "",
                "comment": "地址",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "area_id",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": "",
                "comment": "区号",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "phone",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": "",
                "comment": "电话",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "fax",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": "",
                "comment": "传真",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "postal_code",
                "notNull": false,
                "dataType": "varchar(8)",
                "default": "",
                "comment": "邮编",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "constact_person",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": "",
                "comment": "联系人",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "tel",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": "",
                "comment": "手机",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "note",
                "notNull": false,
                "dataType": "varchar(512)",
                "default": "",
                "comment": "备注",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "sort",
                "notNull": false,
                "dataType": "int(11)",
                "default": "100",
                "comment": "排序",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "bank_name",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": "",
                "comment": "开户行",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "bank_user",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": "",
                "comment": "银行账户",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "bank_account",
                "notNull": false,
                "dataType": "varchar(64)",
                "default": "",
                "comment": "银行账号",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "web",
                "notNull": false,
                "dataType": "varchar(512)",
                "default": "",
                "comment": "网址",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "create_time",
                "notNull": false,
                "dataType": "datetime",
                "default": "CURRENT_TIMESTAMP",
                "comment": "创建时间",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "update_time",
                "notNull": false,
                "dataType": "datetime",
                "default": "CURRENT_TIMESTAMP",
                "comment": "修改时间",
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            }
        ]
    },
    {
        "name": "ys_test",
        "comment": "",
        "rows": [
            {
                "columnName": "id",
                "notNull": false,
                "dataType": "int(11)",
                "default": null,
                "comment": null,
                "primaryKey": true,
                "foreignKey": false,
                "autoIncrement": true
            },
            {
                "columnName": "asd",
                "notNull": true,
                "dataType": "datetime",
                "default": null,
                "comment": null,
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "user_id",
                "notNull": true,
                "dataType": "varchar(32)",
                "default": null,
                "comment": null,
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "int",
                "notNull": false,
                "dataType": "int(10) unsigned",
                "default": "1",
                "comment": null,
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "enum_col",
                "notNull": true,
                "dataType": "enum('male','female','both','unknow')",
                "default": null,
                "comment": null,
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "ys_testcol1",
                "notNull": true,
                "dataType": "varchar(45)",
                "default": null,
                "comment": null,
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            }
        ]
    },
    {
        "name": "ys_user",
        "comment": "",
        "rows": [
            {
                "columnName": "id",
                "notNull": false,
                "dataType": "varchar(32)",
                "default": null,
                "comment": null,
                "primaryKey": true,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "name",
                "notNull": false,
                "dataType": "varchar(16)",
                "default": null,
                "comment": null,
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            },
            {
                "columnName": "password",
                "notNull": false,
                "dataType": "varchar(64)",
                "default": null,
                "comment": null,
                "primaryKey": false,
                "foreignKey": false,
                "autoIncrement": false
            }
        ]
    }
]
