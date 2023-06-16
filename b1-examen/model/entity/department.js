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