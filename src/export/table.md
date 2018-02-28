# 数据库文档

## ys_back_sale（退货单）

| 列名 | 字段类型 | 注释 |
| :--: | :--: | :--: |
| id | varchar(32) |  |
| create_time | datetime | 创建时间 |
| update_time | datetime | 修改时间 |
| user_id | varchar(32) | 操作员 ID |
| ys_back_salecol | varchar(45) |  |

## ys_back_sale_detail（退货单明细）

| 列名 | 字段类型 | 注释 |
| :--: | :--: | :--: |
| id | varchar(32) |  |
| back_sale_id | varchar(32) |  |
| product_id | varchar(32) |  |
| number | int(11) | 数量 |
| price | decimal(10,2) | 价格 |

## ys_buy（进货表）

| 列名 | 字段类型 | 注释 |
| :--: | :--: | :--: |
| id | varchar(32) |  |
| user_id | varchar(32) | 进货人 ID |
| create_time | datetime | 创建时间 |
| update_time | datetime | 修改时间 |
| ys_buycol | varchar(45) |  |

## ys_buy_item（进货表明）

| 列名 | 字段类型 | 注释 |
| :--: | :--: | :--: |
| id | varchar(32) |  |
| product_id | varchar(32) | 产品 ID |
| buy_order_id | varchar(32) |  |
| number | int(11) |  |
| price | decimal(10,2) | 价格 |

## ys_customer（客户）

| 列名 | 字段类型 | 注释 |
| :--: | :--: | :--: |
| id | varchar(32) | 编号 |
| name | varchar(16) | 名称 |
| address | varchar(256) | 地址 |
| phone | varchar(32) | 手机 |
| type | varchar(16) | 类型。小顾客、普通客户、重点客户之类的。 |
| gender | int(8) | 性别。（1：男，2：女） |
| birthday | datetime | 生日 |
| note | varchar(512) | 备注 |
| create_time | datetime | 创建时间 |
| update_time | datetime | 修改时间 |

## ys_department（部门）

| 列名 | 字段类型 | 注释 |
| :--: | :--: | :--: |
| id | varchar(32) | ID |
| name | varchar(16) | 名称 |

## ys_enter_stock（入库单）

| 列名 | 字段类型 | 注释 |
| :--: | :--: | :--: |
| id | varchar(32) |  |
| user_id | varchar(32) | 入库人 |

## ys_enter_stock_detail（入库单明细）

| 列名 | 字段类型 | 注释 |
| :--: | :--: | :--: |
| id | varchar(32) |  |
| user_id | varchar(32) | 入库人 |

## ys_product（商品）

| 列名 | 字段类型 | 注释 |
| :--: | :--: | :--: |
| id | varchar(32) |  |
| name | varchar(45) |  |
| desc | varchar(45) | 商品介绍 |
| price | varchar(45) |  |

## ys_product_category（商品分类）

| 列名 | 字段类型 | 注释 |
| :--: | :--: | :--: |
| id | varchar(32) | ID |
| name | varchar(32) | 名称 |
| parent_id | varchar(32) | 父分类 ID。顶级分类设为 0。 |
| description | varchar(512) | 描述 |
| sort | int(8) | 排序 |
| create_time | datetime | 创建时间 |
| update_time | datetime | 修改时间 |

## ys_product_image（商品图片）

| 列名 | 字段类型 | 注释 |
| :--: | :--: | :--: |
| id | varchar(32) |  |
| product_id | varchar(32) |  |
| url | varchar(512) |  |
| sort | int(8) |  |

## ys_product_unit（商品计量单位。）

| 列名 | 字段类型 | 注释 |
| :--: | :--: | :--: |
| id | varchar(32) | ID |
| name | varchar(8) | 名称 |
| create_time | datetime | 创建时间 |
| update_time | datetime | 修改时间 |
| sort | int(8) | 排序 |

## ys_sale（销售）

| 列名 | 字段类型 | 注释 |
| :--: | :--: | :--: |
| id | varchar(32) | ID |
| user_id | varchar(32) | 创建者 ID |

## ys_sale_item（销售明细。SALEORDER_ID 为 NULL 时, 为现金销售）

| 列名 | 字段类型 | 注释 |
| :--: | :--: | :--: |
| id | varchar(32) |  |
| sale_id | varchar(32) | 销售 ID |
| product_id | varchar(32) | 产品 ID |
| sale_order_id | varchar(45) | 销售订单 ID |
| number | varchar(45) | 数量 |
| price | decimal(10,2) | 价格 |
| discount | decimal(10,2) | 折扣 |
| ys_sale_itemlcol | varchar(45) |  |

## ys_store（仓库）

| 列名 | 字段类型 | 注释 |
| :--: | :--: | :--: |
| id | varchar(32) |  |
| manager_id | varchar(32) | 管理员 ID |
| sort | int(4) | 排序 |
| address | varchar(256) | 地址 |
| create_time | datetime | 创建时间 |
| update_time | datetime | 修改时间 |
| ys_storecol | varchar(45) |  |

## ys_supplier（供应商）

| 列名 | 字段类型 | 注释 |
| :--: | :--: | :--: |
| id | varchar(32) | 编号 |
| name | varchar(64) | 名称 |
| person | varchar(32) | 负责人 |
| address | varchar(256) | 地址 |
| area_id | varchar(32) | 区号 |
| phone | varchar(32) | 电话 |
| fax | varchar(32) | 传真 |
| postal_code | varchar(8) | 邮编 |
| constact_person | varchar(32) | 联系人 |
| tel | varchar(32) | 手机 |
| note | varchar(512) | 备注 |
| sort | int(11) | 排序 |
| bank_name | varchar(32) | 开户行 |
| bank_user | varchar(32) | 银行账户 |
| bank_account | varchar(64) | 银行账号 |
| web | varchar(512) | 网址 |
| create_time | datetime | 创建时间 |
| update_time | datetime | 修改时间 |

## ys_test

| 列名 | 字段类型 | 注释 |
| :--: | :--: | :--: |
| id | int(11) |  |
| asd | datetime |  |
| user_id | varchar(32) |  |
| int | int(10) unsigned |  |
| enum_col | enum('male','female','both','unknow') |  |
| ys_testcol1 | varchar(45) |  |

## ys_user

| 列名 | 字段类型 | 注释 |
| :--: | :--: | :--: |
| id | varchar(32) |  |
| name | varchar(16) |  |
| password | varchar(64) |  |

