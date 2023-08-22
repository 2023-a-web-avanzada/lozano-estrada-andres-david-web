import { DepartmentEntity } from "./department.entity";
import { DepartmentService } from "./department.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [DepartmentEntity],
            'default',
        )
    ],
    controllers: [],
    providers: [DepartmentService],
    exports: [DepartmentService]
})

export class EventosModule {}