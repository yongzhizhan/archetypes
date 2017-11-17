CREATE DATABASE IF NOT EXISTS springboot;

USE springboot;
SET NAMES "utf8";

CREATE TABLE IF NOT EXISTS user (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL DEFAULT '',
  password VARCHAR(255) NOT NULL DEFAULT '',
  gender INT NOT NULL DEFAULT '0',

  UNIQUE (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO user (name, password, gender) VALUES ('admin', md5('admin'), '0');
