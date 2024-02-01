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
       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sussan", "Walkers", 7),
       ("David", "Stone", 2, 4),
       ("Steve", "Bowler", 3, 6),
       ("Christy", "Story", 1),
       ("Ana", "Martinez", 5),
       ("Kelly", "Hubert", 4),
       ("Robert", "Hall", 6),
       ("Sabrina", "Villa", 8),
       ("Michael", "Lopez", 9, 8);

-- OR

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

UPDATE `company_db`.`employee` SET `manager_id` = '8' WHERE (`id` = '9');
UPDATE `company_db`.`employee` SET `manager_id` = '4' WHERE (`id` = '2');
UPDATE `company_db`.`employee` SET `manager_id` = '6' WHERE (`id` = '3');