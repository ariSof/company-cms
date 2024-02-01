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

//helper function to concatinate Names
//used to display names when updating an Employee's role
function concatNames(employees){
    return employees.first_name + " " + employees.last_name;
}


//Helper function to get list roles
function getListOfRoles(roles) {
    return roles.title;
}


//Function to query to select all employees, then call prompt again
function viewAllEmployees(){
    
    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results);
        cmsPrompt();
    });
}

//Function used to query to add employee to db, then call prompt again
function addNewEmployee() {

    //Get the list of roles
    db.query('SELECT title FROM role', function (err, roles) {
        const listOfRoles = roles.map(getListOfRoles);
      
         //Get the list of employees who could be the manager, and concatinate names
        db.query('SELECT first_name, last_name FROM employee', function (err, employees) {
            const listOfEmployees = employees.map(concatNames);
            
            //prompt to enter employee info
            inquirer
            .prompt([
                {
                    type: 'input',
                    message: "Please enter employees first name:",
                    name: 'eFirstName',
                },
                {
                    type: 'input',
                    message: "Please enter employees last name:",
                    name: 'eLastName',
                },
                {
                    type: 'list',
                    message: "Please enter employees role:",
                    name: 'role',
                    choices: listOfRoles,
                },
                {
                    type: 'list',
                    message: "Please enter employees manager:",
                    name: 'manager',
                    choices: listOfEmployees,
                },
            ])
            .then((newEmployee) => {
                //Get index for role selected
                let rIndex = 1;
                for(let i=0; i<listOfRoles.length; i++){
                    if(newEmployee.role === listOfRoles[i]) {
                        rIndex = i+1;
                    }
                }

                //Get index for manager selected
                let mIndex = 1;
                for(let i=0; i<employees.length; i++){
                    if(newEmployee.manager === (employees[i].first_name + " " + employees[i].last_name)) {
                        mIndex = i+1;
                    }
                }

                //query to add employee to database
                db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${newEmployee.eFirstName}", "${newEmployee.eLastName}", ${rIndex}, ${mIndex})`, function (err, results) {
                        
                    if(err){
                        console.error(err);
                    }
                    
                    //Employee added to database
                    if(results.affectedRows === 1){
                        console.log(`Added ${newEmployee.eFirstName} ${newEmployee.eLastName} to the database.`);
                    }

                    //Return to Main menu prompt
                    cmsPrompt();
                });
            });
        });
    });
}

function updateEmployeeRole() {
    //First get the list of current employees
    db.query('SELECT first_name, last_name FROM employee', function (err, employees) {
        const employeeNames = employees.map(concatNames);
        
        //Get the list of roles
        db.query('SELECT title FROM role', function (err, roles) {
            const listOfRoles = roles.map(getListOfRoles);
       
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
                    choices: listOfRoles,
                },
            ])
            .then((updatedEmployee) => {

                //Get index for role selected
                let rIndex = 1;
                for(let i=0; i<listOfRoles.length; i++){
                    if(updatedEmployee.role === listOfRoles[i]) {
                        rIndex = i+1;
                    }
                }

                //Get index of employee selected
                let eIndex = 1;
                for(let i=0; i<employees.length; i++){
                    if(updatedEmployee.employee === (employees[i].first_name + " " + employees[i].last_name)) {
                        eIndex = i+1;
                    }
                }

                //Query database to update employee with selected new role 
                db.query(`UPDATE employee SET role_id = ${rIndex} WHERE employee.id =  ${eIndex}`, function (err, result) {
                
                    if(err){
                        console.error(err);
                    }
                    
                    //Employee added to database
                    if(result.affectedRows === 1){
                        console.log(`Updated ${updatedEmployee.employee} on the database.`);
                    }

                    //Return to main menu prompt
                    cmsPrompt();
                 });
            });
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
                addNewEmployee();
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
