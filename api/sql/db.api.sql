 /*
  * mysqlを起動すること
  * mysql.server start
  * <Leader> se で実行
  */

-- profile for local database;
-- profile名、DB名を変更すること ユーザ情報は変更する必要なし
let g:dbext_default_profile_api = 'type=mysql:user=vim:passwd=vim012:host=0.0.0.0:port=3306:dbname=aa159mpruc_sjk:extra=-vvv'
DBSetOption profile=api

-- profile for local testing database;
-- profile名、DB名を変更すること ユーザ情報は変更する必要なし
let g:dbext_default_profile_api_test = 'type=mysql:user=vim:passwd=vim012:host=0.0.0.0:port=3306:dbname=aa159mpruc_test:extra=-vvv'
DBSetOption profile=api_test

SHOW databases;
SHOW tables;

-- containers テーブル確認 /*{{{*/
SELECT * FROM `containers`;
/*}}}*/

-- containers テーブル作成 /*{{{*/
DROP TABLE `containers`;
DESC `containers`;
CREATE TABLE IF NOT EXISTS `containers` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `product_id` INT(7) NOT NULL,
  `new_flag` TINYINT(1) NOT NULL DEFAULT 0,
  `deal_flag` TINYINT(1) NOT NULL DEFAULT 0,
  `soldout_flag` TINYINT(1) NOT NULL DEFAULT 0,
  `recommend_flag` TINYINT(1) NOT NULL DEFAULT 0,
  `icon_date` VARCHAR(12) NULL,
  `ref_no` VARCHAR(10) NULL,
  `name` VARCHAR(255) NOT NULL,
  `price` INT(11) NULL,
  `size_id` INT(1) NOT NULL,
  `shape` VARCHAR(45) NULL,
  `floor` VARCHAR(45) NULL,
  `dimension` VARCHAR(255) NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
/*}}}*/

-- containers レコード挿入 /*{{{*/
TRUNCATE `containers`;
INSERT INTO `containers` (
  `product_id`,
  `new_flag`,
  `deal_flag`,
  `soldout_flag`,
  `recommend_flag`,
  `icon_date`,
  `ref_no`,
  `name`,
  `price`,
  `size_id`,
  `shape`,
  `floor`,
  `dimension`,
  `description`
) VALUES
(120001,1,0,0,1,'',85,'85番 4tアルミバン　扉ゲートタイプ',NULL,2,'アルミバン','木','長さ5370　幅2380　高さ2260','カギ付　扉ゲートタイプ'),
(120002,1,0,0,0,'',84,'84番 4t標準アルミバン　横扉付',NULL,2,'アルミバン','木','長さ5480　幅2180　高さ2140','横扉付き'),
(120003,0,0,0,0,'',83,'83番 2t標準　保冷バン　横扉付',NULL,1,'保冷バン','ステンレス','長さ2980　幅1540　高さ1050','横扉付き'),
(120004,0,0,0,1,'',64,'64番 4t標準　保冷バン',NULL,2,'保冷バン','アルミ','長さ5910　幅2120　高さ2150',''),
(120005,0,0,0,1,'',62,'62番 2t標準　保冷バン　横扉付',NULL,1,'保冷バン','アルミ','長さ3880　幅1520　高さ1940','横扉付き')
;
/*}}}*/


-- sizes 確認 /*{{{*/
SELECT * FROM `sizes`;
/*}}}*/

-- sizes レコード挿入 /*{{{*/
DROP TABLE `sizes`;
DESC `sizes`;
CREATE TABLE IF NOT EXISTS `sizes` (
  `id` INT(1) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(4) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
/*}}}*/

-- sizes レコード挿入 /*{{{*/
INSERT INTO `sizes` (
  `id`,
  `name`
) VALUES 
(1, '小'),
(2, '中'),
(3, '大')
;
/*}}}*/
