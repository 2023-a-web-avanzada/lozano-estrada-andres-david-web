import {Injectable} from "@nestjs/common";
import {InjectDataSource} from "@nestjs/typeorm";
import {DataSource, DeepPartial, DeleteResult, FindManyOptions} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectDataSource()
        public dataSource: DataSource
    ) { }

    public usuarioRepository = this.dataSource.getRepository(
        UsuarioEntity
    );

    find(
        opciones: FindManyOptions<UsuarioEntity>
    ): Promise<UsuarioEntity[]> {
        return this.usuarioRepository.find(opciones)
    }

    findOneById(id: number): Promise<UsuarioEntity> {
        return this.usuarioRepository.findOne({
            // select: { },
            where: {
                id: id,
            },
        })
    }

    create(datosCrear: any) {
        return this.usuarioRepository.save(datosCrear);
    }

    update(
        datosActualizar: any, id: number
    ): Promise<(DeepPartial<UsuarioEntity> & UsuarioEntity)[]> {
        return this.usuarioRepository.save(
            {...datosActualizar, id}
        );
    }

    delete(id: number): Promise<DeleteResult> {
        return this.usuarioRepository.delete(id);
    }
}
