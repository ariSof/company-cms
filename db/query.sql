Use company_db;

SELECT * FROM company_db.department;

SELECT * FROM company_db.role;

SELECT * FROM company_db.employee;

SELECT * FROM employee;

INSERT INTO department(name) VALUES ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("data scientist", 90000, 1);

SELECT title FROM role;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Shoua", "Chang", 7, 1);