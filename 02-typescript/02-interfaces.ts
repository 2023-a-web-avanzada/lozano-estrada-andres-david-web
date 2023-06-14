// 02-interfaces
export class A implements B {
    edad = 1;
    nombre = 'a';
}

export interface B {
    nombre: string; // se puede utilizar coma en lugar de ;
    edad: number;
}

export type C = {
    nombre: string;
    edad: number;
}

type Usuario = {
    nombre: string;
    apellido: string;
    edad?: number | undefined;  // undefined es opcional
    sueldo?: number;
    casado: boolean | 0 | 1;
    estado: 'AC' | 'IN' | 'BN';
    // funciones
    imprimirUsuario: (mensaje: string) => string | 'BN';
    calcularImpuesto: (impuesto: number) => number;
    estadoActual?: () => 'AP' | 'AF' | 'AT'; // opcional
    // calcularImpuesto parametro numero impeusto, sueldo + sueldo * impuesto
    // estadoActual no recibo parametros, 'AP, 'AF', 'AT'
}

let user: Usuario = {
    nombre: 'Andres',
    apellido: 'Lozano',
    casado: 0,
    sueldo: 25.2,
    estado: 'AC',
    imprimirUsuario: (mensaje) => {
        return 'El mensaje es: ' + mensaje;
    },
    calcularImpuesto: impuesto => {
        return user.sueldo + user.sueldo * impuesto;
    },
    estadoActual: () => {
        switch (user.estado) {
            case 'AC':
                return 'AP';
            case 'IN':
                return 'AF';
            case 'BN':
                return 'AT';
        }
    }
}