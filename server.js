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
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'elsql',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

//Function to query to select all employees, then call prompt again
function viewAllEmployees(){
    db.query('SELECT * FROM employee', function (err, results) {
        console.log(results);
        cmsPrompt();
      });
}

//Function used to query to add employee to db, then call prompt again
function addNewEmployee(newEmployee) {
    cmsPrompt();
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
        switch(response) {
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
            //case "Update Employee Role":
            //case "View all Roles"
            //case "Add Role"
            //case "View all Departments"
            //case "Add Department"
          
        }
    })
}

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
