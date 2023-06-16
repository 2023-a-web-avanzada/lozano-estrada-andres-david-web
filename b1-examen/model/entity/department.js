import fs from 'fs';

const departmentFilePath = "../model/data/department.json";

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
            return "\nDepartment " + departmentName + " (ID: " + departmentID + ") deleted!\n"
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