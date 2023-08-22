import {IsIn, IsOptional, IsString} from "class-validator";

export class UsuarioUpdateDto {
    @IsOptional()   // requerido
    @IsString()
    nombres: string

    @IsOptional()   // requerido
    @IsString()
    apellidos: string

    @IsOptional()   // requerido
    @IsIn(['U', 'A'])
    rol: string
}