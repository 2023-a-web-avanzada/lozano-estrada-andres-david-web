import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('epn_usuario')  // nombre de la tabla en la bd
export class UsuarioEntity {
    // id autogenerado
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'user_nombres',   // nombre campo bdd
        type: 'varchar',    // tipo campo bdd
        length: 60, // longitud campo bdd
        nullable: false
    })
    nombres: string;    // nombre del campo

    @Column({
        name: 'user_apellidos',   // nombre campo bdd
        type: 'varchar',    // tipo campo bdd
        length: 60, // longitud campo bdd
        nullable: false
    })
    apellidos: string;    // nombre del campo

    @Column({
        name: 'user_rol',   // nombre campo bdd
        type: 'varchar',    // tipo campo bdd
        length: 1, // longitud campo bdd
        nullable: false,
        default: 'U',   // valor por defecto
        // comentario en la base de datos
        comment: 'U = usuario; A = administrador;'
    })
    rol: string;    // nombre del campo
}