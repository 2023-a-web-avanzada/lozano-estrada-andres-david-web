import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {EventosModule} from "./eventos/evetos.module";

@Module({
  imports: [EventosModule],
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