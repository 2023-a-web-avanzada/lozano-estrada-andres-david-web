import fs from 'fs';

const departmentFilePath = "../model/data/department.json";

// =====  LOGIC FUNCTIONS  =====

function readFile() {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                departmentFilePath,
                "utf-8",
                (readError, content) => {
                    if (readError) {
                        reject("An error was occurred while reading " + departmentFilePath);
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
                departmentFilePath,
                content,
                (writeError) => {
                    if (writeError) {
                        reject("An error was occurred while writing " + departmentFilePath);
                    } else {
                        resolve(true);
                    }
                }
            );
        }
    );
}

// function that gets a free department ID
function getFreeDepartmentID(departmentsJSON) {
    if (departmentsJSON["departments"].length === 0) {
        return 1;
    }

    let currentMaxID = departmentsJSON["departments"][0].id;
    departmentsJSON["departments"].forEach(department => {
        if (department.id > currentMaxID) {
            currentMaxID = department.id;
        }
    });

    return currentMaxID + 1;
}

// =====  CRUD EXPORTED FUNCTIONS  =====

// function that gets a list of names of all departments
export async function getAllDepartmentsShortList() {
    try {
        const departmentsJSON = await readFile();
        const departmentsNames = [];

        departmentsJSON["departments"].forEach(department => {
            const { id, name } = department;
            departmentsNames.push(id + ". " + name);
        });

        return departmentsNames;
    } catch (error) {
        return error + "\n";
    }
}

// function that gets all the departments
export async function getAllDepartments() {
    try {
        const departmentsJSON = await readFile();
        return getFormattedDepartmentsList(departmentsJSON);
    } catch (error) {
        return error + "\n";
    }
}

// function that adds a new department
export async function addDepartment(name, budget, active, location, id = undefined) {
    try {
        const departmentsJSON = await readFile();
        let departmentID = getFreeDepartmentID(departmentsJSON);
        if (id !== undefined) {
            departmentID = id;
        }

        departmentsJSON["departments"].push({
            id: departmentID,
            name: name,
            budget: budget,
            active: active,
            location: location
        });

        if (await writeFile(JSON.stringify(departmentsJSON))) {
            return "\n" + name + " inserted with ID " + departmentID + "!\n"
        }
    } catch (error) {
        return error + "\n";
    }
}

// function that updates a department
export async function updateDepartment(id, name, budget, active, location) {
    try {
        await deleteDepartment(id);
        await addDepartment(name, budget, active, location, id);
        return "\n" + name + " updated with ID " + id + "!\n"
    } catch (error) {
        return error + "\n";
    }
}

// function that deletes a department
export async function deleteDepartment(departmentID) {
    let departmentName = "";

    try {
        const departmentsJSON = await readFile();
        const filteredDepartments = departmentsJSON.departments.filter(department => {
            const { id, name } = department;

            if (id === departmentID) {
                departmentName = name;
            }
            return id !== departmentID;
        })

        if (await writeFile(JSON.stringify({ departments: filteredDepartments }))) {
            return "\n" + departmentName + " (ID: " + departmentID + ") deleted!\n"
        }
    } catch (error) {
        return error + "\n";
    }
}

// =====  STYLE FUNCTIONS  =====

function resizeWord(word, sizeLimit) {
    return word + " ".repeat(sizeLimit - word.length);
}

// formatting departments data
function getFormattedDepartmentsList(departmentsJSON) {
    let stringFormattedList =
        resizeWord("ID", 5) + "\t" +
        resizeWord("NAME", 35) + "\t" +
        resizeWord("BUDGET", 15) + "\t" +
        resizeWord("ACTIVE", 10) + "\t" +
        "LOCATION" + "\n" +
        resizeWord("--", 5) + "\t" +
        resizeWord("----", 35) + "\t" +
        resizeWord("------", 15) + "\t" +
        resizeWord("------", 10) + "\t" +
        "--------" + "\n";

    departmentsJSON["departments"].forEach((department) => {
        let { id, name, budget, active, location } = department;
        id = resizeWord(id.toString(), 5);
        name = resizeWord(name, 35);
        budget = resizeWord(budget.toString(), 15);
        active = resizeWord(active.toString(), 10);

        stringFormattedList +=
            id + "\t" +
            name + "\t" +
            budget + "\t" +
            active + "\t" +
            location + "\n";
    });

    return stringFormattedList;
}