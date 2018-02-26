-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: ys_erp
-- ------------------------------------------------------
-- Server version	5.7.19-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ys_back_sale`
--

DROP TABLE IF EXISTS `ys_back_sale`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ys_back_sale` (
  `id` varchar(32) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  `user_id` varchar(32) NOT NULL COMMENT '操作员 ID',
  `ys_back_salecol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='退货单';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ys_back_sale`
--

LOCK TABLES `ys_back_sale` WRITE;
/*!40000 ALTER TABLE `ys_back_sale` DISABLE KEYS */;
/*!40000 ALTER TABLE `ys_back_sale` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ys_back_sale_detail`
--

DROP TABLE IF EXISTS `ys_back_sale_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ys_back_sale_detail` (
  `id` varchar(32) NOT NULL,
  `back_sale_id` varchar(32) NOT NULL,
  `product_id` varchar(32) NOT NULL,
  `number` int(11) NOT NULL COMMENT '数量',
  `price` decimal(10,2) NOT NULL COMMENT '价格',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='退货单明细';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ys_back_sale_detail`
--

LOCK TABLES `ys_back_sale_detail` WRITE;
/*!40000 ALTER TABLE `ys_back_sale_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `ys_back_sale_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ys_buy`
--

DROP TABLE IF EXISTS `ys_buy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ys_buy` (
  `id` varchar(32) NOT NULL,
  `user_id` varchar(32) NOT NULL COMMENT '进货人 ID',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  `ys_buycol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='进货表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ys_buy`
--

LOCK TABLES `ys_buy` WRITE;
/*!40000 ALTER TABLE `ys_buy` DISABLE KEYS */;
/*!40000 ALTER TABLE `ys_buy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ys_buy_item`
--

DROP TABLE IF EXISTS `ys_buy_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ys_buy_item` (
  `id` varchar(32) NOT NULL,
  `product_id` varchar(32) NOT NULL COMMENT '产品 ID',
  `buy_order_id` varchar(32) NOT NULL,
  `number` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL COMMENT '价格',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='进货表明';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ys_buy_item`
--

LOCK TABLES `ys_buy_item` WRITE;
/*!40000 ALTER TABLE `ys_buy_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `ys_buy_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ys_customer`
--

DROP TABLE IF EXISTS `ys_customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ys_customer` (
  `id` varchar(32) NOT NULL COMMENT '编号',
  `name` varchar(16) NOT NULL COMMENT '名称',
  `address` varchar(256) NOT NULL DEFAULT '' COMMENT '地址',
  `phone` varchar(32) NOT NULL DEFAULT '' COMMENT '手机',
  `type` varchar(16) NOT NULL DEFAULT '' COMMENT '类型。小顾客、普通客户、重点客户之类的。',
  `gender` int(8) NOT NULL DEFAULT '0' COMMENT '性别。（1：男，2：女）',
  `birthday` datetime DEFAULT NULL COMMENT '生日',
  `note` varchar(512) NOT NULL DEFAULT '' COMMENT '备注',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='客户';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ys_customer`
--

LOCK TABLES `ys_customer` WRITE;
/*!40000 ALTER TABLE `ys_customer` DISABLE KEYS */;
/*!40000 ALTER TABLE `ys_customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ys_department`
--

DROP TABLE IF EXISTS `ys_department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ys_department` (
  `id` varchar(32) NOT NULL COMMENT 'ID',
  `name` varchar(16) DEFAULT NULL COMMENT '名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='部门';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ys_department`
--

LOCK TABLES `ys_department` WRITE;
/*!40000 ALTER TABLE `ys_department` DISABLE KEYS */;
/*!40000 ALTER TABLE `ys_department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ys_enter_stock`
--

DROP TABLE IF EXISTS `ys_enter_stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ys_enter_stock` (
  `id` varchar(32) NOT NULL,
  `user_id` varchar(32) NOT NULL COMMENT '入库人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='入库单';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ys_enter_stock`
--

LOCK TABLES `ys_enter_stock` WRITE;
/*!40000 ALTER TABLE `ys_enter_stock` DISABLE KEYS */;
/*!40000 ALTER TABLE `ys_enter_stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ys_enter_stock_detail`
--

DROP TABLE IF EXISTS `ys_enter_stock_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ys_enter_stock_detail` (
  `id` varchar(32) NOT NULL,
  `user_id` varchar(32) DEFAULT NULL COMMENT '入库人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='入库单明细';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ys_enter_stock_detail`
--

LOCK TABLES `ys_enter_stock_detail` WRITE;
/*!40000 ALTER TABLE `ys_enter_stock_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `ys_enter_stock_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ys_product`
--

DROP TABLE IF EXISTS `ys_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ys_product` (
  `id` varchar(32) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `desc` varchar(45) DEFAULT NULL COMMENT '商品介绍',
  `price` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ys_product`
--

LOCK TABLES `ys_product` WRITE;
/*!40000 ALTER TABLE `ys_product` DISABLE KEYS */;
INSERT INTO `ys_product` VALUES ('1','苹果','呵呵',NULL);
/*!40000 ALTER TABLE `ys_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ys_product_category`
--

DROP TABLE IF EXISTS `ys_product_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ys_product_category` (
  `id` varchar(32) NOT NULL COMMENT 'ID',
  `name` varchar(32) NOT NULL COMMENT '名称',
  `parent_id` varchar(32) NOT NULL DEFAULT '0' COMMENT '父分类 ID。顶级分类设为 0。',
  `description` varchar(512) NOT NULL DEFAULT '' COMMENT '描述',
  `sort` int(8) NOT NULL DEFAULT '100' COMMENT '排序',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品分类';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ys_product_category`
--

LOCK TABLES `ys_product_category` WRITE;
/*!40000 ALTER TABLE `ys_product_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `ys_product_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ys_product_image`
--

DROP TABLE IF EXISTS `ys_product_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ys_product_image` (
  `id` varchar(32) NOT NULL,
  `product_id` varchar(32) NOT NULL,
  `url` varchar(512) NOT NULL,
  `sort` int(8) NOT NULL DEFAULT '100',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品图片';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ys_product_image`
--

LOCK TABLES `ys_product_image` WRITE;
/*!40000 ALTER TABLE `ys_product_image` DISABLE KEYS */;
/*!40000 ALTER TABLE `ys_product_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ys_product_unit`
--

DROP TABLE IF EXISTS `ys_product_unit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ys_product_unit` (
  `id` varchar(32) NOT NULL COMMENT 'ID',
  `name` varchar(8) NOT NULL COMMENT '名称',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  `sort` int(8) NOT NULL DEFAULT '100' COMMENT '排序',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品计量单位。';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ys_product_unit`
--

LOCK TABLES `ys_product_unit` WRITE;
/*!40000 ALTER TABLE `ys_product_unit` DISABLE KEYS */;
INSERT INTO `ys_product_unit` VALUES ('1','个','2018-02-26 14:08:25','2018-02-26 14:08:25',100),('10','件','2018-02-26 14:10:08','2018-02-26 14:10:08',100),('11','箱','2018-02-26 14:10:08','2018-02-26 14:10:08',100),('2','码','2018-02-26 14:10:08','2018-02-26 14:10:08',100),('3','盒','2018-02-26 14:10:08','2018-02-26 14:10:08',100),('4','条','2018-02-26 14:10:08','2018-02-26 14:10:08',100),('5','对','2018-02-26 14:10:08','2018-02-26 14:10:08',100),('6','套','2018-02-26 14:10:08','2018-02-26 14:10:08',100),('7','双','2018-02-26 14:10:08','2018-02-26 14:10:08',100),('8','匹','2018-02-26 14:10:08','2018-02-26 14:10:08',100),('9','包','2018-02-26 14:10:08','2018-02-26 14:10:08',100);
/*!40000 ALTER TABLE `ys_product_unit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ys_sale`
--

DROP TABLE IF EXISTS `ys_sale`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ys_sale` (
  `id` varchar(32) NOT NULL COMMENT 'ID',
  `user_id` varchar(32) NOT NULL COMMENT '创建者 ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='销售';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ys_sale`
--

LOCK TABLES `ys_sale` WRITE;
/*!40000 ALTER TABLE `ys_sale` DISABLE KEYS */;
/*!40000 ALTER TABLE `ys_sale` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ys_sale_item`
--

DROP TABLE IF EXISTS `ys_sale_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ys_sale_item` (
  `id` varchar(32) NOT NULL,
  `sale_id` varchar(32) NOT NULL COMMENT '销售 ID',
  `product_id` varchar(32) NOT NULL COMMENT '产品 ID',
  `sale_order_id` varchar(45) NOT NULL COMMENT '销售订单 ID',
  `number` varchar(45) NOT NULL COMMENT '数量',
  `price` decimal(10,2) NOT NULL COMMENT '价格',
  `discount` decimal(10,2) NOT NULL COMMENT '折扣',
  `ys_sale_itemlcol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='销售明细。SALEORDER_ID 为 NULL 时, 为现金销售';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ys_sale_item`
--

LOCK TABLES `ys_sale_item` WRITE;
/*!40000 ALTER TABLE `ys_sale_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `ys_sale_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ys_store`
--

DROP TABLE IF EXISTS `ys_store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ys_store` (
  `id` varchar(32) NOT NULL,
  `manager_id` varchar(32) NOT NULL COMMENT '管理员 ID',
  `sort` int(4) NOT NULL DEFAULT '100' COMMENT '排序',
  `address` varchar(256) NOT NULL DEFAULT '' COMMENT '地址',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  `ys_storecol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='仓库';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ys_store`
--

LOCK TABLES `ys_store` WRITE;
/*!40000 ALTER TABLE `ys_store` DISABLE KEYS */;
/*!40000 ALTER TABLE `ys_store` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ys_supplier`
--

DROP TABLE IF EXISTS `ys_supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ys_supplier` (
  `id` varchar(32) NOT NULL COMMENT '编号',
  `name` varchar(64) NOT NULL COMMENT '名称',
  `person` varchar(32) NOT NULL DEFAULT '' COMMENT '负责人',
  `address` varchar(256) NOT NULL DEFAULT '' COMMENT '地址',
  `area_id` varchar(32) NOT NULL DEFAULT '' COMMENT '区号',
  `phone` varchar(32) NOT NULL DEFAULT '' COMMENT '电话',
  `fax` varchar(32) NOT NULL DEFAULT '' COMMENT '传真',
  `postal_code` varchar(8) NOT NULL DEFAULT '' COMMENT '邮编',
  `constact_person` varchar(32) NOT NULL DEFAULT '' COMMENT '联系人',
  `tel` varchar(32) NOT NULL DEFAULT '' COMMENT '手机',
  `note` varchar(512) NOT NULL DEFAULT '' COMMENT '备注',
  `sort` int(11) NOT NULL DEFAULT '100' COMMENT '排序',
  `bank_name` varchar(32) NOT NULL DEFAULT '' COMMENT '开户行',
  `bank_user` varchar(32) NOT NULL DEFAULT '' COMMENT '银行账户',
  `bank_account` varchar(64) NOT NULL DEFAULT '' COMMENT '银行账号',
  `web` varchar(512) NOT NULL DEFAULT '' COMMENT '网址',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='供应商';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ys_supplier`
--

LOCK TABLES `ys_supplier` WRITE;
/*!40000 ALTER TABLE `ys_supplier` DISABLE KEYS */;
/*!40000 ALTER TABLE `ys_supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ys_user`
--

DROP TABLE IF EXISTS `ys_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ys_user` (
  `id` varchar(32) NOT NULL,
  `name` varchar(16) NOT NULL,
  `password` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ys_user`
--

LOCK TABLES `ys_user` WRITE;
/*!40000 ALTER TABLE `ys_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `ys_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-02-26 16:19:35
