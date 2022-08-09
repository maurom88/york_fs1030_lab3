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
CREATE USER IF NOT EXISTS 'nodeclient'@'localhost' IDENTIFIED WITH mysql_native_password BY 'S7R0NGp4ssw0rd!';
GRANT ALL PRIVILEGES ON *.* TO 'nodeclient'@'localhost';
flush privileges;
```
</details>

<br>

<details>
  <summary>Create database, create and populate tables:</summary>

```mysql
START TRANSACTION;

DROP DATABASE IF EXISTS job_board_demo;
CREATE DATABASE job_board_demo;

CREATE TABLE job_board_demo.companies(
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255)
);

INSERT INTO job_board_demo.companies
	(name)
VALUES
	('Programmatron Inc'),
    ('Two+Two consulting'),
    ('ABComputers Ltd'),
    ('SEO-x-perts llc'),
    ('Numbers numbers services'),
    ('Orion Fuse');

CREATE TABLE job_board_demo.job_seekers(
	id INT PRIMARY KEY AUTO_INCREMENT,
	first_name VARCHAR(35) NOT NULL,
	last_name VARCHAR(35) NOT NULL,
	date_of_birth DATE,
	phone VARCHAR(16),
	email VARCHAR(255)
);

INSERT INTO job_board_demo.job_seekers
	(first_name, last_name, date_of_birth, phone, email)
VALUES
  ('John', 'Smith', '2000-01-31', '+1 555-123-4567', 'john.smith.demo@gmail.com'),
  ('Jane', 'Smith', '1999-02-12', '+1 444-123-4567', 'jane.smith.demo@gmail.com'),
  ('John', 'Doe', '1998-04-04', '+1 111-123-4567', 'john.doe.demo@gmail.com'),
  ('Jane', 'Doe', '1997-12-11', '+1 222-123-4567', 'jane.doe.demo@gmail.com'),
  ('Anna', 'Kanakis', '1984-03-05', '+1 333-123-4567', 'anna.kanakis.demo@gmail.com'),
  ('Mark', 'Gregory', '1980-06-06', '+1 666-123-4567', 'mark.gregory.demo@gmail.com'),
  ('Henry', 'Silva', '1979-10-22', '+1 777-123-4567', 'henry.silva.demo@gmail.com'),
  ('Fred', 'Williamson', '1980-08-20', '+1 888-123-4567', 'fred.williamson.demo@gmail.com'),
  ('George', 'Eastman', '1979-09-04', '+1 999-123-4567', 'george.eastman.demo@gmail.com'),
  ('Phoebe', 'Kates', '1981-05-03', '+1 000-123-4567', 'phoebe.kates.demo@gmail.com');

CREATE TABLE job_board_demo.job_ads(
id INT PRIMARY KEY AUTO_INCREMENT,
  published_at DATETIME NOT NULL
  DEFAULT CURRENT_TIMESTAMP
      ON UPDATE CURRENT_TIMESTAMP,
  expires_at DATE NOT NULL,
  start_date DATE NOT NULL,
  company_id INT NOT NULL,
  title VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(35) NOT NULL,
  hourly_pay DECIMAL(5, 2),
  yearly_salary DECIMAL (8, 2),
  FOREIGN KEY (company_id) REFERENCES job_board_demo.companies (id)
);

INSERT INTO job_board_demo.job_ads
	(expires_at, start_date, company_id, title, description, location, hourly_pay, yearly_salary)
VALUES
	(DATE(DATE_ADD(CURDATE(), INTERVAL 10 DAY)), DATE(DATE_ADD(CURDATE(), INTERVAL 15 DAY)), 1, 'IT helpdesk', 'IT helpdesk role for a company in Vicoria, Canada', 'Victoria, Canada', '50.25', NULL ),
  (DATE(DATE_ADD(CURDATE(), INTERVAL -10 DAY)), DATE(DATE_ADD(CURDATE(), INTERVAL 5 DAY)), 1, 'Junior developer', 'Junior developer role for a company in Victoria, Canada', 'Victoria, Canada', '35', NULL ),
  (DATE(DATE_ADD(CURDATE(), INTERVAL 100 DAY)), DATE(DATE_ADD(CURDATE(), INTERVAL 120 DAY)), 1, 'Customer support representative', 'A remote customer support representative position', 'Remote, Canada', '55.75', NULL ),
  (DATE(DATE_ADD(CURDATE(), INTERVAL -110 DAY)), DATE(DATE_ADD(CURDATE(), INTERVAL -15 DAY)), 2, 'Senior developer', 'A remote senior developer position', 'Remote, Canada', '100', NULL ),
  (DATE(DATE_ADD(CURDATE(), INTERVAL 12 DAY)), DATE(DATE_ADD(CURDATE(), INTERVAL 22 DAY)), 2, 'IT helpdesk', 'IT helpdesk position for a company in Toronto, Canada', 'Toronto, Canada', '25.80', NULL ),
  (DATE(DATE_ADD(CURDATE(), INTERVAL 22 DAY)), DATE(DATE_ADD(CURDATE(), INTERVAL 55 DAY)), 3, 'Junior developer', 'A junior developer role for a company in Ottawa, Canada', 'Ottawa, Canada', NULL, '40000' ),
  (DATE(DATE_ADD(CURDATE(), INTERVAL 40 DAY)), DATE(DATE_ADD(CURDATE(), INTERVAL 78 DAY)), 4, 'Junior developer', 'A remote junior developer position', 'Remote, USA', NULL, '60000' ),
  (DATE(DATE_ADD(CURDATE(), INTERVAL 34 DAY)), DATE(DATE_ADD(CURDATE(), INTERVAL 90 DAY)), 5, 'Senior developer', 'A remote senior developer position', 'Remote, USA', NULL, '88000' ),
  (DATE(DATE_ADD(CURDATE(), INTERVAL 66 DAY)), DATE(DATE_ADD(CURDATE(), INTERVAL 155 DAY)), 6, 'IT helpdesk', 'A remote IT helpdesk position', 'Remote, USA', NULL, '45000' ),
  (DATE(DATE_ADD(CURDATE(), INTERVAL 36 DAY)), DATE(DATE_ADD(CURDATE(), INTERVAL 46 DAY)), 6, 'Customer support representative', 'A customer support representative role for a company in Ottawa, Canada', 'Ottawa, Canada', NULL, '89000' ),
  (DATE(DATE_ADD(CURDATE(), INTERVAL -34 DAY)), DATE(DATE_ADD(CURDATE(), INTERVAL 0 DAY)), 5, 'Senior developer', 'A senior developer position for a company in New York, USA', 'New York, USA', NULL, '99000' ),
  (DATE(DATE_ADD(CURDATE(), INTERVAL -55 DAY)), DATE(DATE_ADD(CURDATE(), INTERVAL -30 DAY)), 4, 'Junior developer', 'A junior developer position for a company in Calgary, Canada', 'Calgary, Canada', NULL, '65000' ),
  (DATE(DATE_ADD(CURDATE(), INTERVAL -100 DAY)), DATE(DATE_ADD(CURDATE(), INTERVAL -77 DAY)), 3, 'IT helpdesk', 'An IT helpdesk role for a company in Calgary, Canada', 'Calgary, Canada', NULL, '40000' ),
  (DATE(DATE_ADD(CURDATE(), INTERVAL 99 DAY)), DATE(DATE_ADD(CURDATE(), INTERVAL 120 DAY)), 4, 'Customer support representative', 'A customer support role for a company in Calgary, Canada', 'Calgary, Canada', NULL, '43000' ),
  (DATE(DATE_ADD(CURDATE(), INTERVAL -14 DAY)), DATE(DATE_ADD(CURDATE(), INTERVAL 7 DAY)), 3, 'IT helpdesk', 'An IT helpdesk role for a company in New York, USA', 'New York, USA', NULL, '88000' );

CREATE TABLE job_board_demo.applications(
	id INT PRIMARY KEY AUTO_INCREMENT,
  job_seeker_id INT NOT NULL,
  job_ad_id INT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  FOREIGN KEY (job_seeker_id) REFERENCES job_board_demo.job_seekers (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (job_ad_id) REFERENCES job_board_demo.job_ads (id) ON DELETE RESTRICT ON UPDATE CASCADE
);

SET @min_job_seeker_id = (SELECT MIN(id) FROM job_board_demo.job_seekers);
SET @max_job_seeker_id = (SELECT MAX(id) FROM job_board_demo.job_seekers);

SET @min_job_ad_id = (SELECT MIN(id) FROM job_board_demo.job_ads);
SET @max_job_ad_id = (SELECT MAX(id) FROM job_board_demo.job_ads);

INSERT INTO job_board_demo.applications
	(job_seeker_id, job_ad_id)
VALUES
	((FLOOR(@min_job_seeker_id + RAND()*(@max_job_seeker_id - @min_job_seeker_id + 1))), (FLOOR(@min_job_ad_id + RAND()*(@max_job_ad_id - @min_job_ad_id + 1)))),
  ((FLOOR(@min_job_seeker_id + RAND()*(@max_job_seeker_id - @min_job_seeker_id + 1))), (FLOOR(@min_job_ad_id + RAND()*(@max_job_ad_id - @min_job_ad_id + 1)))),
  ((FLOOR(@min_job_seeker_id + RAND()*(@max_job_seeker_id - @min_job_seeker_id + 1))), (FLOOR(@min_job_ad_id + RAND()*(@max_job_ad_id - @min_job_ad_id + 1)))),
  ((FLOOR(@min_job_seeker_id + RAND()*(@max_job_seeker_id - @min_job_seeker_id + 1))), (FLOOR(@min_job_ad_id + RAND()*(@max_job_ad_id - @min_job_ad_id + 1)))),
  ((FLOOR(@min_job_seeker_id + RAND()*(@max_job_seeker_id - @min_job_seeker_id + 1))), (FLOOR(@min_job_ad_id + RAND()*(@max_job_ad_id - @min_job_ad_id + 1)))),
  ((FLOOR(@min_job_seeker_id + RAND()*(@max_job_seeker_id - @min_job_seeker_id + 1))), (FLOOR(@min_job_ad_id + RAND()*(@max_job_ad_id - @min_job_ad_id + 1)))),
  ((FLOOR(@min_job_seeker_id + RAND()*(@max_job_seeker_id - @min_job_seeker_id + 1))), (FLOOR(@min_job_ad_id + RAND()*(@max_job_ad_id - @min_job_ad_id + 1)))),
  ((FLOOR(@min_job_seeker_id + RAND()*(@max_job_seeker_id - @min_job_seeker_id + 1))), (FLOOR(@min_job_ad_id + RAND()*(@max_job_ad_id - @min_job_ad_id + 1)))),
  ((FLOOR(@min_job_seeker_id + RAND()*(@max_job_seeker_id - @min_job_seeker_id + 1))), (FLOOR(@min_job_ad_id + RAND()*(@max_job_ad_id - @min_job_ad_id + 1)))),
  ((FLOOR(@min_job_seeker_id + RAND()*(@max_job_seeker_id - @min_job_seeker_id + 1))), (FLOOR(@min_job_ad_id + RAND()*(@max_job_ad_id - @min_job_ad_id + 1)))),
  ((FLOOR(@min_job_seeker_id + RAND()*(@max_job_seeker_id - @min_job_seeker_id + 1))), (FLOOR(@min_job_ad_id + RAND()*(@max_job_ad_id - @min_job_ad_id + 1)))),
  ((FLOOR(@min_job_seeker_id + RAND()*(@max_job_seeker_id - @min_job_seeker_id + 1))), (FLOOR(@min_job_ad_id + RAND()*(@max_job_ad_id - @min_job_ad_id + 1)))),
  ((FLOOR(@min_job_seeker_id + RAND()*(@max_job_seeker_id - @min_job_seeker_id + 1))), (FLOOR(@min_job_ad_id + RAND()*(@max_job_ad_id - @min_job_ad_id + 1)))),
  ((FLOOR(@min_job_seeker_id + RAND()*(@max_job_seeker_id - @min_job_seeker_id + 1))), (FLOOR(@min_job_ad_id + RAND()*(@max_job_ad_id - @min_job_ad_id + 1)))),
  ((FLOOR(@min_job_seeker_id + RAND()*(@max_job_seeker_id - @min_job_seeker_id + 1))), (FLOOR(@min_job_ad_id + RAND()*(@max_job_ad_id - @min_job_ad_id + 1)))),
  ((FLOOR(@min_job_seeker_id + RAND()*(@max_job_seeker_id - @min_job_seeker_id + 1))), (FLOOR(@min_job_ad_id + RAND()*(@max_job_ad_id - @min_job_ad_id + 1)))),
  ((FLOOR(@min_job_seeker_id + RAND()*(@max_job_seeker_id - @min_job_seeker_id + 1))), (FLOOR(@min_job_ad_id + RAND()*(@max_job_ad_id - @min_job_ad_id + 1)))),
  ((FLOOR(@min_job_seeker_id + RAND()*(@max_job_seeker_id - @min_job_seeker_id + 1))), (FLOOR(@min_job_ad_id + RAND()*(@max_job_ad_id - @min_job_ad_id + 1)))),
  ((FLOOR(@min_job_seeker_id + RAND()*(@max_job_seeker_id - @min_job_seeker_id + 1))), (FLOOR(@min_job_ad_id + RAND()*(@max_job_ad_id - @min_job_ad_id + 1)))),
  ((FLOOR(@min_job_seeker_id + RAND()*(@max_job_seeker_id - @min_job_seeker_id + 1))), (FLOOR(@min_job_ad_id + RAND()*(@max_job_ad_id - @min_job_ad_id + 1)))),
  ((FLOOR(@min_job_seeker_id + RAND()*(@max_job_seeker_id - @min_job_seeker_id + 1))), (FLOOR(@min_job_ad_id + RAND()*(@max_job_ad_id - @min_job_ad_id + 1)))),
  ((FLOOR(@min_job_seeker_id + RAND()*(@max_job_seeker_id - @min_job_seeker_id + 1))), (FLOOR(@min_job_ad_id + RAND()*(@max_job_ad_id - @min_job_ad_id + 1)))),
  ((FLOOR(@min_job_seeker_id + RAND()*(@max_job_seeker_id - @min_job_seeker_id + 1))), (FLOOR(@min_job_ad_id + RAND()*(@max_job_ad_id - @min_job_ad_id + 1)))),
  ((FLOOR(@min_job_seeker_id + RAND()*(@max_job_seeker_id - @min_job_seeker_id + 1))), (FLOOR(@min_job_ad_id + RAND()*(@max_job_ad_id - @min_job_ad_id + 1)))),
  ((FLOOR(@min_job_seeker_id + RAND()*(@max_job_seeker_id - @min_job_seeker_id + 1))), (FLOOR(@min_job_ad_id + RAND()*(@max_job_ad_id - @min_job_ad_id + 1)))),
  ((FLOOR(@min_job_seeker_id + RAND()*(@max_job_seeker_id - @min_job_seeker_id + 1))), (FLOOR(@min_job_ad_id + RAND()*(@max_job_ad_id - @min_job_ad_id + 1)))),
  ((FLOOR(@min_job_seeker_id + RAND()*(@max_job_seeker_id - @min_job_seeker_id + 1))), (FLOOR(@min_job_ad_id + RAND()*(@max_job_ad_id - @min_job_ad_id + 1)))),
  ((FLOOR(@min_job_seeker_id + RAND()*(@max_job_seeker_id - @min_job_seeker_id + 1))), (FLOOR(@min_job_ad_id + RAND()*(@max_job_ad_id - @min_job_ad_id + 1)))),
  ((FLOOR(@min_job_seeker_id + RAND()*(@max_job_seeker_id - @min_job_seeker_id + 1))), (FLOOR(@min_job_ad_id + RAND()*(@max_job_ad_id - @min_job_ad_id + 1)))),
  ((FLOOR(@min_job_seeker_id + RAND()*(@max_job_seeker_id - @min_job_seeker_id + 1))), (FLOOR(@min_job_ad_id + RAND()*(@max_job_ad_id - @min_job_ad_id + 1)))),
  ((FLOOR(@min_job_seeker_id + RAND()*(@max_job_seeker_id - @min_job_seeker_id + 1))), (FLOOR(@min_job_ad_id + RAND()*(@max_job_ad_id - @min_job_ad_id + 1)))),
  ((FLOOR(@min_job_seeker_id + RAND()*(@max_job_seeker_id - @min_job_seeker_id + 1))), (FLOOR(@min_job_ad_id + RAND()*(@max_job_ad_id - @min_job_ad_id + 1)))),
  ((FLOOR(@min_job_seeker_id + RAND()*(@max_job_seeker_id - @min_job_seeker_id + 1))), (FLOOR(@min_job_ad_id + RAND()*(@max_job_ad_id - @min_job_ad_id + 1)))),
  ((FLOOR(@min_job_seeker_id + RAND()*(@max_job_seeker_id - @min_job_seeker_id + 1))), (FLOOR(@min_job_ad_id + RAND()*(@max_job_ad_id - @min_job_ad_id + 1)))),
  ((FLOOR(@min_job_seeker_id + RAND()*(@max_job_seeker_id - @min_job_seeker_id + 1))), (FLOOR(@min_job_ad_id + RAND()*(@max_job_ad_id - @min_job_ad_id + 1)))),
  ((FLOOR(@min_job_seeker_id + RAND()*(@max_job_seeker_id - @min_job_seeker_id + 1))), (FLOOR(@min_job_ad_id + RAND()*(@max_job_ad_id - @min_job_ad_id + 1)))),
  ((FLOOR(@min_job_seeker_id + RAND()*(@max_job_seeker_id - @min_job_seeker_id + 1))), (FLOOR(@min_job_ad_id + RAND()*(@max_job_ad_id - @min_job_ad_id + 1))));

COMMIT;
```

</details>

<br>

### Install dependencies and run server

`npm install`

`npm start` or, for nodemon, `npm run dev`