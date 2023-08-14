import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {EventosModule} from "./eventos/evetos.module";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
      EventosModule,
      TypeOrmModule.forRoot({
          type: 'sqlite',
          database: './bdd/bdd.sqlite',
          entities: [

          ],    // entidades de TODOO el aplicativo
          synchronize: true,    // true => edita las columnas y tablas // false => nada
          dropSchema: false // true => borra toda la base de datos! cuidado! // false => nada
      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// Modulo A
// [ModuloB, ModuloC]
// [Servicios]
// [Controladores]

// ModuloSoloServicios
// [Servicios]
// [exportar]->[Servicios]

// ModuloSoloControlador
// [Controlador]

// ModuloControladoresServicios
// [ModuloSoloServicios]
// [Controlador]
// [Servicios]
// [exportar]->[Servicios]

// Modulos contienen [Servicios, Controladores], tambien pueden exportar [Servicios]
// Controlador -> Recibir peticiones -> Responsabilidad controlador es VALIDACION
// Servicios -> LOGICA NEGOCIO (servicio es un singleton -> una sola instancia en todo el app)
// crear, borrar, actualizar, buscar, .....