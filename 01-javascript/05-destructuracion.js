// 05-destructuracion.js
const andres = {
    nombre: "Andres",
};

const carolina = {
    nombre: "Carolina",
    apellido: "Jimenez",
};
const andresCarolina = { // Crear una nueva referencia (valor)
    ...carolina,   // 1 el orden es importante para propiedades que se repiten
    ...andres,      // el ultimo reemplaza a los anteriores
};
console.log('andresCarolina', andresCarolina);

// Destructuración de arreglos
const arregloUno = [1, 2, 3, 4, 5];
const arregloDos = [6, 7, 8, 9, 10];
const superArreglo = [
    ...arregloUno, // El orden importa
    ...arregloDos,
]; // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log('superArreglo', superArreglo);