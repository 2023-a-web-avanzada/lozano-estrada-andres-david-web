import inquirer from "inquirer";
import {
    addEmployee,
    getAllEmployees,
    getEmployeesByDepartmentId,
    getAllEmployeesShortList,
    deleteEmployee,
    updateEmployee
} from "../model/entity/employee.js";
import {
    getAllDepartmentsShortList
} from "../model/entity/department.js";

const banner =
    "=======================================\n" +
    "=====   DEPARTMENTS - EMPLOYEES   =====\n" +
    "=======================================\n";

const mainMenuOptions = [
    "1. Employee entity",
    "2. Department entity",
    "0. Exit"
];

const employeeMenuOptions = [
    "1. (Read) List all the employees",
    "2. (Read) List the employees by department",
    "3. (Create) Insert a new employee",
    "4. (Update) Update employee",
    "5. (Delete) Delete employee",
    "0. Return to the main menu"
];

const departmentMenuOptions = [
    "1. (Read) List all the departments",
    "2. (Create) Insert a new department",
    "3. (Update) Update a department",
    "4. (Delete) Delete a department",
    "0. Return to the main menu"
];

// =====  LOGIC FUNCTIONS  =====

async function getUserInput(message) {
    try {
        const userInput = await inquirer.prompt([
            {
                type: "input",
                name: "userInput",
                message: message
            },
        ]);

        return userInput["userInput"];
    }
    catch (error) {
        console.error(error);
    }
}

async function getUserListSelection(optionsList, message = "Select an option: ") {
    try {
        const userInput = await inquirer.prompt([
            {
                type: "list",
                name: "selectedOption",
                message: message,
                choices: optionsList
            },
        ]);
        return parseInt(userInput["selectedOption"][0]);
    }
    catch (error) {
        console.error(error);
    }
}

function validateDate(input) {
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (!dateRegex.test(input)) {
        return false;
    }

    const parts = input.split('-');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    const date = new Date(year, month, day);

    return !(isNaN(date.getTime()) || date.getDate() !== day ||
        date.getMonth() !== month || date.getFullYear() !== year);
}

// =====  EMPLOYEE ENTITY MENU  =====

async function processEmployeeMenuInput() {
    let userInput = undefined;

    // employee entity menu loop
    while (true) {
        try {
            console.log("==============================");
            console.log("===  EMPLOYEE ENTITY MENU  ===");
            console.log("==============================\n");
            userInput = await getUserListSelection(employeeMenuOptions);
            console.clear();

            switch (userInput) {
                case 1:
                    console.log("============================");
                    console.log("===  ALL EMPLOYEES LIST  ===");
                    console.log("============================\n");
                    const allEmployeesList = await getAllEmployees();
                    console.log(allEmployeesList);
                    break;
                case 2:
                    console.log("=========================================");
                    console.log("===  EMPLOYEES LIST BY DEPARTMENT ID  ===");
                    console.log("=========================================\n");

                    try {
                        const departmentsShortList = await getAllDepartmentsShortList();
                        departmentsShortList.push("0. Return to the employee entity menu");

                        let departmentSelection = await getUserListSelection(departmentsShortList);
                        if (departmentSelection !== 0) {
                            const employeesByDepartment = await getEmployeesByDepartmentId(departmentSelection);
                            console.log("");
                            console.log(employeesByDepartment);
                        } else {
                            console.clear();
                            break;
                        }
                    } catch (error) {
                        console.error(error);
                    }
                    break;
                case 3:
                    console.log("=============================");
                    console.log("===  EMPLOYEES INSERTION  ===");
                    console.log("=============================\n");

                    try {
                        const name = await getUserInput("Enter the employee's name: ");
                        if (name === "" ) {
                            console.log("\nEmployee's name cannot be empty!\n");
                            break;
                        }

                        const birthdate = await getUserInput("Enter the employee's birthdate (DD-MM-AAAA): ")
                        if (!validateDate(birthdate) || birthdate === "") {
                            console.log("\nThe date entered is incorrect!\n");
                            break;
                        }

                        let salary = await getUserInput("Enter the employee's salary: ");
                        salary = parseFloat(salary);
                        if (isNaN(salary) || salary <= 0.0) {
                            console.log("\nThe salary entered is incorrect!\n");
                            break;
                        }

                        const position = await getUserInput("Enter the employee's position: ");
                        if (position === "" ) {
                            console.log("\nEmployee's position cannot be empty!\n");
                            break;
                        }

                        let insured = await getUserListSelection(
                            ["1. True", "2. False"],
                            "Is the employee insured?"
                        );
                        insured = insured === 1;

                        const departmentsShortList = await getAllDepartmentsShortList();
                        departmentsShortList.push("0. Cancel insertion");
                        const department = await getUserListSelection(
                            departmentsShortList,
                            "What department does the employee belong to?"
                        );
                        if (department === 0) {
                            console.log("\nInsertion cancelled!\n");
                            break;
                        }

                        const result = await addEmployee(name, birthdate, salary, position, insured, department);
                        console.log(result);
                        break;
                    } catch (error) {
                        console.error(error);
                    }
                    break;
                case 4:
                    console.log("==========================");
                    console.log("===  EMPLOYEES UPDATE  ===");
                    console.log("==========================\n");

                    const employeesUpdateShortList = await getAllEmployeesShortList();
                    employeesUpdateShortList.push("0. Cancel update");
                    const employeeUpdate = await getUserListSelection(
                        employeesUpdateShortList,
                        "Which employee do you want to update?"
                    );
                    if (employeeUpdate === 0) {
                        console.log("\nUpdate cancelled!\n");
                        break;
                    }

                    const name = await getUserInput("Enter the employee's new name: ");
                    if (name === "" ) {
                        console.log("\nEmployee's new name cannot be empty!\n");
                        break;
                    }

                    const birthdate = await getUserInput("Enter the employee's new birthdate (DD-MM-AAAA): ")
                    if (!validateDate(birthdate) || birthdate === "") {
                        console.log("\nThe date entered is incorrect!\n");
                        break;
                    }

                    let salary = await getUserInput("Enter the employee's new salary: ");
                    salary = parseFloat(salary);
                    if (isNaN(salary) || salary <= 0.0) {
                        console.log("\nThe salary entered is incorrect!\n");
                        break;
                    }

                    const position = await getUserInput("Enter the employee's new position: ");
                    if (position === "" ) {
                        console.log("\nEmployee's new position cannot be empty!\n");
                        break;
                    }

                    let insured = await getUserListSelection(
                        ["1. True", "2. False"],
                        "Is the employee insured?"
                    );
                    insured = insured === 1;

                    const departmentsShortList = await getAllDepartmentsShortList();
                    departmentsShortList.push("0. Cancel update");
                    const department = await getUserListSelection(
                        departmentsShortList,
                        "What department does the employee belong to?"
                    );
                    if (department === 0) {
                        console.log("\nUpdate cancelled!\n");
                        break;
                    }

                    await deleteEmployee(employeeUpdate);
                    const updateResult = await updateEmployee(name, birthdate, salary, position, insured, department);
                    console.log(updateResult);
                    break;
                case 5:
                    console.log("============================");
                    console.log("===  EMPLOYEES DELETION  ===");
                    console.log("============================\n");

                    const employeesDeletionShortList = await getAllEmployeesShortList();
                    employeesDeletionShortList.push("0. Cancel deletion");
                    const employeeDeletion = await getUserListSelection(
                        employeesDeletionShortList,
                        "Which employee do you want to delete?"
                    );
                    if (employeeDeletion === 0) {
                        console.log("\nDeletion cancelled!\n");
                        break;
                    }

                    const deletionResult = await deleteEmployee(employeeDeletion);
                    console.log(deletionResult);
                    break;
                case 0:
                    return await processMainMenuInput();
                default:
                    userInput = undefined;
                    console.log("The selected option is incorrect!\n");
                    break;
            }

            userInput = undefined;
        } catch (error) {
            console.error(error);
        }
    }
}

// =====  DEPARTMENT ENTITY MENU  =====

async function processDepartmentMenuInput() {}  // *********************************************************************

// =====  MAIN MENU  =====

async function processMainMenuInput() {
    let userInput = undefined;

    // main menu loop
    do {
        try {
            console.log(banner);
            console.log("===================");
            console.log("===  MAIN MENU  ===");
            console.log("===================\n");
            userInput = await getUserListSelection(mainMenuOptions);
            console.clear();

            switch (userInput) {
                case 1:
                    await processEmployeeMenuInput();
                    break;
                case 2:
                    await processDepartmentMenuInput();
                    break;
                case 0:
                    console.log("==========================");
                    console.log("===  PROGRAM FINISHED  ===");
                    console.log("==========================");
                    return;
                default:
                    userInput = undefined;
                    console.log("The selected option is incorrect!\n");
                    break;
            }
        } catch (error) {
            console.error(error);
        }
    } while (userInput === undefined)
}

await processMainMenuInput();