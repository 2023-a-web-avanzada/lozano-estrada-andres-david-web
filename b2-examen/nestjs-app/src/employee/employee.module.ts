import { EmployeeEntity } from "./employee.entity";
import { EmployeeService } from "./employee.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [EmployeeEntity],
            'default',
        )
    ],
    controllers: [],
    providers: [EmployeeService],
    exports: [EmployeeService]
})

export class EventosModule {}