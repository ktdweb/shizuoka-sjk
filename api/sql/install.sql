-- create databases サーバ名を変更
DROP DATABASE IF EXISTS `aa159mpruc_sjk`;
CREATE DATABASE `aa159mpruc_sjk` CHARACTER SET utf8;

DROP DATABASE IF EXISTS `aa159mpruc_sjk_test`;
CREATE DATABASE `aa159mpruc_test` CHARACTER SET utf8;

-- for server サーバ名、ユーザ名を環境にあわせて変更すること
GRANT ALL PRIVILEGES ON `aa159mpruc_sjk`.* TO 'sjk'@'%' IDENTIFIED BY 'ieVu7sha' WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON `aa159mpruc_sjk`.* TO 'sjk'@'localhost' IDENTIFIED BY 'ieVu7sha' WITH GRANT OPTION;

GRANT ALL PRIVILEGES ON `aa159mpruc_test`.* TO 'sjk'@'%' IDENTIFIED BY 'ieVu7sha' WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON `aa159mpruc_test`.* TO 'sjk'@'localhost' IDENTIFIED BY 'ieVu7sha' WITH GRANT OPTION;

-- for vim ユーザaa159mpruc_sjkを作成 サーバ名のみ変更
GRANT ALL PRIVILEGES ON `aa159mpruc_sjk`.* TO 'vim'@'%' IDENTIFIED BY 'vim012' WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON `aa159mpruc_sjk`.* TO 'vim'@'localhost' IDENTIFIED BY 'vim012' WITH GRANT OPTION;

GRANT ALL PRIVILEGES ON `aa159mpruc_test`.* TO 'vim'@'%' IDENTIFIED BY 'vim012' WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON `aa159mpruc_test`.* TO 'vim'@'localhost' IDENTIFIED BY 'vim012' WITH GRANT OPTION;
