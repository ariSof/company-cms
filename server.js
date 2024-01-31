const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'elsql',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

//Function to query to select all employees, then call prompt again
function viewAllEmployees(){
    console.log("Came to view All Emp");
    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results);
        cmsPrompt();
      });
}

//Function used to query to add employee to db, then call prompt again
function addNewEmployee(newEmployee) {
    cmsPrompt();
}

//helper function to concatinate Names
//used to display names when updating an Employee's role
function concatNames(employees){
    return employees.first_name + " " + employees.last_name;
}

function updateEmployeeRole() {
    //First get the list of current employees
    db.query('SELECT first_name, last_name FROM employee', function (err, employees) {
        const employeeNames = employees.map(concatNames);
       
        //prompt to enter employee info
        inquirer
        .prompt([
            {
                type: 'rawlist',
                message: "Select employee to update:",
                name: 'employee',
                choices: employeeNames,
            },
            {
                type: 'rawlist',
                message: "Select role:",
                name: 'role',
                choices: ["Account Manager", "Accountant", "Software Engineer", "Lead Engineer",
                            "Sales Manager", "Salesperson", "Consultant", "Legal Team Manager", "Lawyer"]
            },
        ])
        .then((updatedEmployee) => {
            console.log(updatedEmployee.employee);
            console.log(updatedEmployee.role.index); //selected name(title) of role

           // db.query(`UPDATE employee SET role_id = ${updatedEmployee.role} WHERE employee.last_name =  ${updatedEmployee.name}`, function (err, employees) {
             //   UPDATE `company_db`.`employee` SET `manager_id` = '8' WHERE (`id` = '9');
               // const employeeNames = employees.map(concatNames);
            cmsPrompt();
        });
        
    })
}

function viewAllRoles() {
    db.query('SELECT * FROM role', function (err, results) {
        console.table(results);
        cmsPrompt();
      });
}

function addNewRole() {
    //first get a list of the departments
    db.query('SELECT name FROM department', function (err, dep) {

    inquirer
        .prompt([
            {
                type: 'input',
                message: "Enter role name:",
                name: 'name',
            },
            {
                type: 'input',
                message: "Enter role salary:",
                name: 'salary',
            },
            {
                type: 'rawlist',
                message: "Select department for the role:",
                name: 'department',
                choices: dep,
            },
        ])
        .then((newRole) => {
            //get the index for selected department
            let index = 1;
            for(let i=0; i<dep.length; i++){
                if(newRole.department === dep[i].name) {
                    index = i+1;
                }
            }
        
            // INSERT INTO role (newDept.name, newDept.salary, department_id) VALUES ("data scientist", 90000, 1);
            db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${newRole.name}", ${newRole.salary}, ${index})`, function (err, results) {
                
                if(err){
                    console.error(err);
                }
                    
                if(results.affectedRows === 1){
                    console.log(`Added ${newRole.name} to the database.`);
                }
                cmsPrompt();
            });
        });
    });
}

function viewAllDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        cmsPrompt();
    });
}

function addNewDepartment(newDepartment) {
    
    db.query(`INSERT INTO department(name) VALUES ("${newDepartment}")`, function (err, results) {
        if(err){
            console.error(err);
        }

        if(results.affectedRows === 1){
            console.log(newDepartment +" department added to the database.");
        }
        cmsPrompt();
    });
}

function cmsPrompt() {
    inquirer
        .prompt([
        {
            type: 'list',
            message: "What would you like to do?",
            name: 'begin',
            choices: ["View All Employees", "Add Employee", "Update Employee Role", "View all Roles", "Add Role", "View all Departments", "Add Department"]
        },
    ])
    .then((response) => {
        switch(response.begin) {
            case "View All Employees":
                viewAllEmployees();
                break;
            case "Add Employee":
                //prompt to enter employee info
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            message: "Please enter employees first name:",
                            name: 'employeeName',
                        },
                        {
                            type: 'input',
                            message: "Please enter employees lasst name:",
                            name: 'employeeLName',
                        },
                        {
                            type: 'input',
                            message: "Please enter employees role:",
                            name: 'employeeRole',
                        },
                        {
                            type: 'input',
                            message: "Please enter employees manager:",
                            name: 'manager',
                        },
                    ])
                    .then((newEmployee) => {
                        addNewEmployee(newEmployee);
                    });
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "View all Roles":
                viewAllRoles();
                break;
            case "Add Role":
                addNewRole();
                break;
            case "View all Departments" :
                viewAllDepartments();
                break;
            case "Add Department":
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            message: "Enter department name:",
                            name: 'dept',
                        },
                    ])
                    .then((newDept) => {
                        addNewDepartment(newDept.dept);
                    });
                break;
        }
    })
}

cmsPrompt();

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
