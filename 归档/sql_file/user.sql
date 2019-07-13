-- 这是管理员
drop table if exists `users`;
CREATE TABLE IF NOT EXISTS `users`(
   `mid` varchar(50) NOT NULL UNIQUE,
   `user_name` VARCHAR(30) NOT NULL UNIQUE,
   `user_pwd` VARCHAR(100) NOT NULL,
   `role` tinyint(2) DEFAULT 1,
   `create_time` DATETIME default LOCALTIMESTAMP(),
   PRIMARY KEY ( `mid` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 用户表
drop table if exists `user_info`;
CREATE TABLE IF NOT EXISTS `user_info`(
   `uid` varchar(50) NOT NULL UNIQUE,
   `user_name` VARCHAR(30) NOT NULL UNIQUE,
   `user_pwd` VARCHAR(100) NOT NULL,
   `phone` VARCHAR(100) NOT NULL,
   `email` VARCHAR(100) NOT NULL,
   `nickname` VARCHAR(100) NOT NULL,
   `status` tinyint(2) DEFAULT 1,
   `gender` tinyint(1) DEFAULT 1 comment '1-男 2-女',
   `create_time` DATETIME default LOCALTIMESTAMP(),
   PRIMARY KEY ( `uid` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;