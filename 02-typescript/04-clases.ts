// 04-clases.ts
class Persona {
    public nombre: string;
    public apellido: string;
    static nombreReferencial: string = 'Humano';
    protected nombreYApellido = ''; // Duck Typing -> string
    constructor(
        nombreParametro: string,
        apellidoParametro: string,
    ) {
        this.nombre = nombreParametro;
        this.apellido = apellidoParametro;
        this.nombreYApellido = nombreParametro + ' ' + apellidoParametro;
    }

    private mostrarNombreYApellido(): string {
        return this.nombreYApellido;
    }
}

class Usuario extends Persona {
    constructor(
        nombreParametro: string, // Parámetros del constructor
        apellidoParametro: string,  // Parámetros del costructor
        public cedula: string,  // Modificador acceso -> Propiedad de la clase
        public estadoCivil: string, // Modificador acceso -> Propiedad de la clase
    ) {
        super(nombreParametro, apellidoParametro);
        this.cedula;
        this.estadoCivil;
    }
}

const andres = new Usuario(
    'Andres',
    'Lozano',
    '1724987175',
    'soltero'
);

andres.nombre;
andres.apellido;
andres.cedula;
andres.estadoCivil;