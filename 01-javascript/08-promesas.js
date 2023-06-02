// 08-promesas.js
const fs = require('fs');

/*
Una funcion que acepte como parametro una variable
del "path" del archivo y otra variable con el "contenidoArchivo".
Utilizar el modulo 'fs' para leer el archivo en ese "path" y anadir el
"contenidoArchivo" a ese archivo.
*/

function leerArchivo(path) {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                path,   // nombre o path del archivo
                'utf-8',    // codificacion
                (errorLectura, contenido) => {
                    if (errorLectura) {
                        console.error(errorLectura);
                        reject('Error leyendo archivo.');
                    } else {
                        resolve(contenido);
                    }
                }
            );
        }
    );
}

function escribirArchivo(path, contenido) {
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                path,
                contenido,
                (errorEscritura) => {
                    if (errorEscritura) {
                        reject('Error escribiendo archivo.')
                    }
                }
            );
        }
    );
}

function ejecutar(pathPrimerArchivo, athSegundoArchivo, pathTercerArchivo) {


    let contenidoPrimerArchivo = undefined;

    leerArchivo(pathPrimerArchivo)
        .then(
            (contenido) => {
                contenidoPrimerArchivo = contenido;
                return leerArchivo(pathSegundoArchivo);
            }
        )
        .then(
            (contenido) => {
                return escribirArchivo(pathTercerArchivo, contenidoPrimerArchivo + '\n' + contenido);
            }
        )
        .catch(
            error => console.error('ERROR: ', error)
        )
}

const pathPrimerArchivo = './06-ejemplo.txt';
const pathSegundoArchivo = './01-variables.js';
const pathTercerArchivo = './06-nuevo-archivo.txt';
// ejecutar(pathPrimerArchivo, athSegundoArchivo, pathTercerArchivo);

// ASYNC AWAIT
// REGLAS:
// 1) Estar dentro de una función (nombrada o anónima)
// 2) AGREGAR la palabra 'async antes de la declaración de la función
// 3) AGREGAR la palabra 'await' antes de la declaración de una promesa

// const a = async function() {}
// const a = async () => {}

async function ejercicioConAwait() {
    try {
        const contenidoUno = await leerArchivo(pathPrimerArchivo);
        const contenidoDos = await leerArchivo(pathSegundoArchivo);
        const contenidoTotal = contenidoUno + contenidoDos;

        await escribirArchivo(pathTercerArchivo, contenidoTotal);
    } catch (error) {
        console.error(error);
    }
}
ejercicioConAwait();
