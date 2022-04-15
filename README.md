# FS1030 lab 3

Node server for a job board app.

Based on:

- Atauba Prince: https://dev.to/achowba/build-a-simple-app-using-node-js-and-mysql-19me
- Tarun Sharma: https://github.com/tarun27in/FS1030

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
start transaction;
drop database if exists job_board;
create database if not exists job_board;
use job_board;

DROP TABLE IF EXISTS applications;
DROP TABLE IF EXISTS job_ads;
DROP TABLE IF EXISTS job_seekers;

CREATE TABLE IF NOT EXISTS `job_seekers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(35) NOT NULL DEFAULT '',
  `last_name` VARCHAR(35) NOT NULL DEFAULT '',
  `date_of_birth` DATE NOT NULL DEFAULT '1900-01-01',
  `phone` VARCHAR(16) NOT NULL DEFAULT '555-555-5555',
  `email` VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO job_seekers (first_name, last_name, date_of_birth, email) VALUES
 ('Mario', 'Mario', '1900-01-02', 'mario@email.com'),
 ('Luigi', 'Mario', '1900-01-03', 'luigi@email.com'),
 ('Peach', '', '1900-01-04', 'princessP@email.com'),
 ('Toad', '', '1900-01-05', 'toad@email.com'),
 ('Yoshi', '', '1900-01-01', 'yoshi@email.com');
 
 select * from job_seekers;
 
 CREATE TABLE `job_ads` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `published_at` DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  `expires_at` DATETIME NOT NULL,
  `start_date` DATETIME NOT NULL,
  `company_id` INT NOT NULL,
  `job_id` INT NOT NULL,
  `title` TEXT,
  `description` TEXT,
  `location` VARCHAR(35) NOT NULL DEFAULT 'Job location',
  `hourly_pay` DECIMAL(5,2),
  `yearly_salary` DECIMAL(8,2),
  PRIMARY KEY (id)
  -- FOREIGN KEY (company_id) REFERENCES companies (id),
  -- FOREIGN KEY (job_id) REFERENCES jobs (id)
);

describe job_ads;

INSERT INTO job_ads (expires_at, start_date, company_id, job_id, title, `description`, location, hourly_pay, yearly_salary) VALUES
 ('2022-03-30', '2022-04-30', 1, 1, 'Customer support associate', 'Customer support associate job description at company 1', 'Remote Canada', NULL, '40000'),
 ('2022-03-30', '2022-04-30', 1, 2, 'Customer support associate', 'Customer support associate job description at company 1', 'Remote USA', NULL, '50000'),
 ('2022-04-30', '2022-04-30', 2, 1, 'Junior web developer', 'Junior web dev job description for company 2', 'Remote Canada', NULL, '60000'),
 ('2022-03-30', '2022-04-30', 2, 2, 'Senior web developer', 'Senior web dev job description for company 2', 'Remote Canada', NULL, '90000'),
 ('2022-03-30', '2022-04-30', 3, 1, 'Customer support associate', 'Customer support associate job description at company 1', 'Remote USA', NULL, '45000');

select * from job_ads;

CREATE TABLE `applications` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `job_seeker_id` INT,
  `job_ad_id` INT,
  `created_at` DATETIME DEFAULT (CURRENT_TIMESTAMP),
  PRIMARY KEY (id),
  FOREIGN KEY (job_seeker_id) REFERENCES job_seekers (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (job_ad_id) REFERENCES job_ads (id) ON DELETE RESTRICT ON UPDATE CASCADE
);

select * from job_seekers;
select * from job_ads;
select * from applications;

INSERT INTO applications (job_seeker_id, job_ad_id) VALUES
 (1, 1),
 (1, 2),
 (1, 4),
 (2, 2),
 (2, 3),
 (2, 5),
 (3, 1),
 (3, 5),
 (4, 2),
 (4, 3),
 (4, 5),
 (5, 5);
 
select * from applications;

 commit;
```

</details>

<br>

### Install dependencies and run server

`npm install`

`npm start` or, for nodemon, `npm run dev`