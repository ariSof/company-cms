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
function concatNames(employees){
    return employees.first_name + " " + employees.last_name;
}

function updateEmployeeRole() {
    console.log("Meant to UPdate an emp role...")
    db.query('SELECT first_name, last_name FROM employee', function (err, employees) {
        const employeeNames = employees.map(concatNames);
        console.log(employeeNames);
       
        //prompt to enter employee info
        inquirer
        .prompt([
            {
                type: 'list',
                message: "Select employee to update:",
                name: 'employee',
                choices: employeeNames,
            },
            {
                type: 'list',
                message: "Select role:",
                name: 'role',
                choices: ["Account Manager", "Accountant", "Software Engineer", "Lead Engineer",
                            "Sales Manager", "Salesperson", "Consultant", "Legal Team Manager", "Lawyer"]
            },
        ])
        .then((updatedEmployee) => {
            console.log(updatedEmployee.name);
            console.log(updatedEmployee.role);
           // db.query(`UPDATE employee SET role_id = ${updatedEmployee.role} WHERE employee.last_name =  ${updatedEmployee.name}`, function (err, employees) {
             //   UPDATE `company_db`.`employee` SET `manager_id` = '8' WHERE (`id` = '9');
               // const employeeNames = employees.map(concatNames);
        });
        cmsPrompt();
    })
}

function viewAllRoles() {
    db.query('SELECT * FROM role', function (err, results) {
        console.table(results);
        cmsPrompt();
      });
}

function viewAllDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
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
            //case "Add Role"
            case "View all Departments" :
                viewAllDepartments();
            //case "Add Department"
          
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
