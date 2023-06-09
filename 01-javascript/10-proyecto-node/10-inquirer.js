// 10-inquirer.js
// npm init -> package.json -> dependencias -> scripts
// npm install inquirer -> npm i inquirer
// nome_modules -> estan las dependencias

import inquirer from "inquirer";

async function main() {
    try {
        const respuesta = await inquirer.prompt([
            {
                type: 'input',
                name: 'apellido',
                message: 'Ingresa tu nombre: ',
            },
            {
                type: 'input',
                name: 'edad',
                message: 'Ingresa tu edad: ',
            }
        ]);
        console.log('Respuesta: ', respuesta)
    }
    catch (error) {
        console.log(error);
    }
}

main();