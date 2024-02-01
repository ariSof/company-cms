DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT 
    FOREIGN KEY (role_id)
    REFERENCES role(id),
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
);






DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT, 
    FOREIGN KEY (role_id)
    REFERENCES role(id),
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
);

INSERT INTO department (name)
VALUES ("Engineering"),
       ("Consultant"),
       ("Finance"),
       ("Legal"),
       ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Account Manager", 160000, 3),
       ("Accountant", 130000, 3),
       ("Software Engineer", 120000, 1),
       ("Lead Engineer", 160000, 1),
       ("Sales Manager", 100000, 5),
       ("Salesperson", 70000, 5),
       ("Consultant", 90000, 2),
       ("Legal Team Manager", 260000, 4),
       ("Lawyer", 160000, 4);
       
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Sussan", "Walkers", 7),
       ("David", "Stone", 2),
       ("Steve", "Bowler", 3),
       ("Christy", "Story", 1),
       ("Ana", "Martinez", 5),
       ("Kelly", "Hubert", 4),
       ("Robert", "Hall", 6),
       ("Sabrina", "Villa", 8),
       ("Michael", "Lopez", 9);
       
Use company_db;

SELECT * FROM company_db.department;

SELECT * FROM company_db.role;

SELECT * FROM employee;
       
UPDATE `company_db`.`employee` SET `manager_id` = '8' WHERE (`id` = '9');
UPDATE `company_db`.`employee` SET `manager_id` = '4' WHERE (`id` = '2');
UPDATE `company_db`.`employee` SET `manager_id` = '6' WHERE (`id` = '3');

INSERT INTO department(name) VALUES ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("data scientist", 90000, 1);

SELECT title FROM role;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Shoua", "Chang", 7, 1);