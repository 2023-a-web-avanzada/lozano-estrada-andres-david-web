//04-funciones.js
function soloNumeros(a, b, c) {
    return a - b + c;   // valor a devolver
}

// JS permite el uso de funciones sin validaciones
// soloNumeros('v', true, [1,2,3]);
// soloNumeros((a)=>a, (a)=>, (a)=>a);
// soloNumeros(1,2,3,4,5,6,8,9);
// soloNumeros();

function soloLetras(a, b, c) { // Sin return devolvemos undefined
    console.log(a, b, c);
}

// Funciones nombradas - named functions
function funcionNombrada() {}

// Funciones anónimas - Anonymous Functions
const funcionSinNombre1 = function () {};

var funcionSinNombre2 = function () {};

let functionSinNombre3 = function () {};

[].forEach(function () {});
funcionSinNombre1();
funcionSinNombre2();
functionSinNombre3();

// FAT ARROW > ANONYMOUS
// Funciones anónimas - Fat Arrow Functions
const funcionFatArrow1 = () => {};
let funcionFatArrow2 = () => {};
var funcionFatArrow3 = () => {};

[].forEach(() => {});
funcionFatArrow1();
funcionFatArrow2();
funcionFatArrow3();

const funcionFatArrow4 = () => {};
const funcionFatArrow5 = (parametro) => {
    return parametro + 1;
}
const funcionFatArrow6 = (parametro) => parametro + 1; // Una sola linea, omitio return omitio las llaves
const funcionFatArrow7 = parametro => parametro + 1; // SOLO si tenemos 1 parametro, omitimos parentesis
const funcionFatArrow8 = (numUno, numDos, numTres) => numUno + numDos + numTres;

// ... => parametros infinitos => llegan en un arreglo de parametros
//        solo podemos tener un parametro infinito por funcion
//function sumarNumeros(a,b,c,s,w, ... todosNumeros) OK
//function sumarNumeros(... todosNumeros, a,b,c,s,w) BAD
//function sumarNumeros(... todosNumeros, ...todosNumeros2) BAD

function sumarNumeros(...todosNumeros) { // parametros infinitos
    let total = 0;
    todosNumeros.forEach(
        (valorActual)=>{
            total = total + valorActual;
        }
    )
    return total;
    // return todosNumeros.reduce((a, v) => a + v, 0);
}

console.log(sumarNumeros(1,2,3,4,5,6,7,5,4,3,2,1));