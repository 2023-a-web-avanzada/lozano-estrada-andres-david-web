import fs from 'fs';

const employeeFilePath = "../model/data/employee.json";

// =====  LOGIC FUNCTIONS  =====

function readFile() {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                employeeFilePath,
                "utf-8",
                (readError, content) => {
                    if (readError) {
                        reject("An error was occurred while reading " + employeeFilePath);
                    } else {
                        const fileContent = JSON.parse(content);
                        resolve(fileContent);
                    }
                }
            );
        }
    );
}

function writeFile(content) {
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                employeeFilePath,
                content,
                (writeError) => {
                    if (writeError) {
                        reject("An error was occurred while writing " + employeeFilePath);
                    } else {
                        resolve(true);
                    }
                }
            );
        }
    );
}

// =====  CRUD EXPORTED FUNCTIONS  =====

// function that gets all the employees
export async function getAllEmployees() {
    try {
        const employeesJSON = await readFile();
        return getFormattedEmployeesList(employeesJSON);
    } catch (error) {
        return error + "\n";
    }
}

// function that gets all the employees of a department
export async function getEmployeesByDepartmentId(departmentId) {
    try {
        const employeesJSON = await readFile();
        const filteredEmployees = employeesJSON.employees.filter(employee => {
            const { department } = employee;
            return department === departmentId;
        })

        if (filteredEmployees.length !== 0) {
            return getFormattedEmployeesList({ employees: filteredEmployees });
        }
    } catch (error) {
        return error + "\n";
    }
}

// function that adds a new employee into a department
export async function addEmployee(name, birthdate, salary, position, insured, department) {
    try {
        const employeesJSON = await readFile();
        employeesJSON["employees"].push({
            name: name,
            birthdate: birthdate,
            salary: salary,
            position: position,
            insured: insured,
            department: department
        });

        if (await writeFile(JSON.stringify(employeesJSON))) {
            return "\nEmployee " + name + " inserted in department " + department + "!\n"
        }
    } catch (error) {
        return error + "\n";
    }
}

// function that updates an employee
export async function updateEmployee(name, birthdate, salary, position, insured, department) {
    try {
        await addEmployee(name, birthdate, salary, position, insured, department);
        return "\nEmployee " + name + " updated in department " + department + "!\n"
    } catch (error) {
        return error + "\n";
    }
}

// function that deletes an employee
export async function deleteEmployee(position) {
    let employeeName = "";

    try {
        const employeesJSON = await readFile();
        employeeName = employeesJSON["employees"][position - 1].name;
        employeesJSON["employees"].splice(position - 1, 1);

        if (await writeFile(JSON.stringify(employeesJSON))) {
            return "\nEmployee " + employeeName + " deleted!\n"
        }
    } catch (error) {
        return error + "\n";
    }
}

// function that gets a list of names of all employees
export async function getAllEmployeesShortList() {
    try {
        const employeesJSON = await readFile();
        const employeesNames = [];

        employeesJSON["employees"].forEach((employee, index) => {
            const { name, department } = employee;
            employeesNames.push((index + 1) + ". " + name + " (Department: " + department + ")");
        });

        return employeesNames;
    } catch (error) {
        return error + "\n";
    }
}

// =====  STYLE FUNCTIONS  =====

function resizeWord(word, sizeLimit) {
    return word + " ".repeat(sizeLimit - word.length);
}

// formatting employees data
function getFormattedEmployeesList(employeesJSON) {
    let stringFormattedList =
        resizeWord("NAME", 20) + "\t" +
        resizeWord("BIRTHDATE", 15) + "\t" +
        resizeWord("SALARY", 10) + "\t" +
        resizeWord("POSITION", 30) + "\t" +
        resizeWord("INSURED", 10) + "\t" +
        "DEPARTMENT ID" + "\n" +
        resizeWord("----", 20) + "\t" +
        resizeWord("---------", 15) + "\t" +
        resizeWord("------", 10) + "\t" +
        resizeWord("--------", 30) + "\t" +
        resizeWord("-------", 10) + "\t" +
        "-------------" + "\n";

    employeesJSON["employees"].forEach((employee) => {
        let { name, birthdate, salary, position, insured, department } = employee;
        name = resizeWord(name, 20);
        birthdate = resizeWord(birthdate, 15);
        salary = resizeWord(salary.toString(), 10);
        position = resizeWord(position, 30);
        insured = resizeWord(insured.toString(), 10);
        department = resizeWord(department.toString(), 5);

        stringFormattedList +=
            name + "\t" +
            birthdate + "\t" +
            salary + "\t" +
            position + "\t" +
            insured + "\t" +
            department + "\n";
    });

    return stringFormattedList;
}