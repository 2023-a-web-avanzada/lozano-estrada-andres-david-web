// 02-arreglos.js
let arreglo = [6, 7, 8, 9, 10];
arreglo = 1;
arreglo = true;
arreglo = undefined;
arreglo = null;
arreglo = {};
arreglo = [true, 1, 1.1, "Andres", "Lozano", undefined, null, {}, [1, 2]];
arreglo = [5, 6, 7, 8, 9];

// for of
for (let numero of arreglo) { // valores
    console.log('numero', numero);
}

// for in
for (let indice in arreglo) { // indices
    console.log('indices', indice);
}

// Anadir al final
arreglo.push(11);
// Eliminar al final
arreglo.pop();
// Anadir al principio
arreglo.unshift(4);
// splice(indice donde empezar, numero elementos eliminados, items a agregar)
/*
EJ: arreglos.splice(
0 // indice,
3 // eliminar 3 elementos - Requerido (tambien ouedo borrar 0 elementos)
// items a agregar
);
*/
arreglo.splice(0, 0, 1 ,2 ,3);
console.log(arreglo);
const indiceNueve = arreglo.indexOf(9);
