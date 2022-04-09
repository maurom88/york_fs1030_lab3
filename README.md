# FS1030 lab 3

Node server for a job board app.

Based on:

- Atauba Prince: https://dev.to/achowba/build-a-simple-app-using-node-js-and-mysql-19me
- Tarun Sharma: https://github.com/tarun27in/FS1030
- Geshan Manandhar: https://blog.logrocket.com/build-rest-api-node-express-mysql

## Project setup

### MySQL scripts

Run the below commands on your workbench or mysql command line to configure your database.

<details>
  <summary>Create a new user for node app</summary>

```mysql
USE mysql;
CREATE USER 'nodeclient'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
GRANT ALL PRIVILEGES ON *.* TO 'nodeclient'@'localhost';
flush privileges;
```
</details>

<br>

<details>
  <summary>Create database, create and populate tables:</summary>

```mysql
create database if not exists fs1030;

use fs1030;

CREATE TABLE IF NOT EXISTS products (
productID INT UNSIGNED NOT NULL AUTO_INCREMENT,
productCode CHAR(3) NOT NULL DEFAULT '',
name VARCHAR(30) NOT NULL DEFAULT '',
quantity INT UNSIGNED NOT NULL DEFAULT 0,
price DECIMAL(7,2) NOT NULL DEFAULT 99999.99,
PRIMARY KEY (productID)
);

select * from products;

INSERT INTO products (productID, productCode, name, quantity, price) VALUES (1001, 'PEN', 'Pen Red', 5000, 1.23);

INSERT INTO products (productID, productCode, name, quantity, price) VALUES
(NULL, 'PEN', 'Pen Blue', 8000, 1.25),
(NULL, 'PEN', 'Pen Black', 2000, 1.25);

INSERT INTO products (productCode, name, quantity, price) VALUES
('PEC', 'Pencil 2B', 10000, 0.48),
('PEC', 'Pencil 2H', 8000, 0.49);

INSERT INTO products (productCode, name) VALUES ('PEC', 'Pencil HB');

INSERT INTO products values (NULL, NULL, NULL, NULL, NULL);

select name, price from products;
select productID, name from products;

describe products;
show tables;

SELECT name, price FROM products WHERE price < 1.0;
SELECT name, quantity FROM products WHERE quantity <= 2000;
SELECT name, price FROM products WHERE productCode = 'PEN';

SELECT name, price FROM products WHERE name LIKE 'PENCIL%';
SELECT name, price FROM products WHERE name LIKE 'P__ %';

SELECT * FROM products WHERE quantity >= 5000 AND name LIKE 'Pen %';
SELECT * FROM products WHERE quantity >= 5000 AND price < 1.24 AND name LIKE 'Pen%';
SELECT * FROM products WHERE NOT (quantity >= 5000 AND name LIKE 'Pen%');
SELECT * FROM products WHERE name IN ('Pen Red', 'Pen Black');
SELECT * FROM products WHERE (price BETWEEN 1.0 AND 2.0) AND (quantity BETWEEN 1000 AND 2000);

SELECT * FROM products WHERE productCode IS NULL;
SELECT * FROM products WHERE productCode = NULL;
SELECT * FROM products WHERE name LIKE 'Pen %' ORDER BY price DESC;
SELECT * FROM products WHERE name LIKE 'Pen %' ORDER BY price DESC, quantity;

SELECT * FROM products ORDER BY price LIMIT 2;
SELECT * FROM products ORDER BY price LIMIT 2, 1;

SELECT productID AS ID, productCode AS Code, name AS Description, price AS `Unit Price` FROM products ORDER BY ID;
SELECT CONCAT(productCode, ' - ', name) AS `Product Description`, price FROM products;

 SELECT price FROM products;
 SELECT DISTINCT price AS `Distinct Price` FROM products;
 SELECT DISTINCT price, name FROM products;

 SELECT * FROM products ORDER BY productCode, productID;
 SELECT * FROM products GROUP BY productCode;
```

</details>

<br>

### Install dependencies and run server

`npm install`

`npm start` or, for nodemon, `npm run dev`