// 01-javascript
// 01-variables.js

// Mutables e Inmutables
// Mutables (re-asignados)

var numeroUno = 1;
let numeroDos = 2;

numeroUno = 12;
numeroDos = 8;

numeroUno = false;
numeroDos = false;

// Inmutables
// Inmutables (no re-asignados)
const configuracionArchivos = 'PDF';

// vamos a preferir CONST > LET > VAR (mejor no usar)

// Tipos de variables (primitivas)
const numero = 1; // number
const sueldo = 1.2; // number
const texto = 'Andres'; // string
const apellidos = 'Lozano'; // string
const casado = false; // boolean
const hijos = null; // object
const zapatos = undefined; // undefined

console.log(typeof numero);
console.log(typeof sueldo);
console.log(typeof texto);
console.log(typeof apellidos);
console.log(typeof casado);
console.log(typeof hijos);
console.log(typeof zapatos);

// Truty y False
if (true) {
    console.log('Es verdadero');
} else {
    console.log('Es falso');
}

if ("") {
    console.log('Es verdadero');
} else {
    console.log('Es falso');
}

if ("confectus_server") {
    console.log('Es verdadero');
} else {
    console.log('Es falso');
}

if (-1) {
    console.log('Es verdadero');
} else {
    console.log('Es falso');
}

if (0) {
    console.log('Es verdadero');
} else {
    console.log('Es falso');
}

if (5) {
    console.log('Es verdadero');
} else {
    console.log('Es falso');
}

if (null) {
    console.log('Es verdadero');
} else {
    console.log('Es falso');
}

if (undefined) {
    console.log('Es verdadero');
} else {
    console.log('Es falso');
}

// Objetos
const andres = {
    "nombre": "Andres",
    'apellido': "Lozano",
    edad: '25',
    hijos: null,
    casado: false,
    zapatos: undefined,
    ropa: {
        color: 'gris',
        talla: 32,
    },
    mascotas: ['Ringo', 'Beba'],
}

console.log(andres);

// Acceder a las propiedades
andres.nombre // "Andres"
andres.apellido // "Lozano"
andres["nombre"] // "Andres"

// Modificar valores
andres.nombre = "David";
andres["nombre"] = "Andres";

// Crear atributos
andres.sueldo; // undefined
console.log(andres.sueldo) // undefined
andres.sueldo = 240;
console.log(andres.sueldo);
andres["gastos"] = 0.8
console.log(andres.gastos)

// Eliminar atributos
andres.nombre = undefined;
console.log(andres);
console.log(Object.keys(andres));
console.log(Object.values(andres));

delete andres.nombre;

console.log(andres);

// Variables por valor o por referencia

// Variables por valor

// Primitivas: number, string y boolean
let edadAndres = 25;
let edadDavid = edadAndres;
console.log(edadAndres); // 25
console.log(edadDavid); // 25
edadAndres = edadAndres + 1;
console.log(edadAndres); //26
console.log(edadDavid); //25

//Variables por referencia
// Object: {} []
let notas = {
    total: 10,
};
let notasSegundoBimestre = notas; // IGUALACION REFERENCIA
notasSegundoBimestre.total = notasSegundoBimestre.total + 1
console.log(notas); // 11
console.log(notasSegundoBimestre); // 11

// Como clonar objetos
let notasTercerBimestre = Object.assign({}, notas);
// Object.assign([], arreglo);
notasTercerBimestre.total = notasTercerBimestre.total + 1;
console.log(notas); // 11
console.log(notasSegundoBimestre); // 11
console.log(notasTercerBimestre); // 12
