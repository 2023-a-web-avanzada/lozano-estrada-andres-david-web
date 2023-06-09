// Stringify y Parse
const arreglousuarios = [
    {
        id: 1,
        nombre: 'Andres', 
    }
];
const arregloGuardado = JSON.stringify(arreglousuarios) // Arreglos, Objetos
const usuario = {
    id: 1,
    nombre: 'Andres',
};
const objetoGuardado = JSON.stringify(usuario) // Arreglos, Objetos
console.log('arregloGuardado', arregloGuardado);
console.log('objetoGuardado', objetoGuardado);
const arregloRestaurado = JSON.parse(arregloGuardado);
const objetoRestaurado = JSON.parse(arregloGuardado);
console.log('arregloRestaurado', arregloRestaurado);
console.log('objetoRestaurado', objetoRestaurado);
