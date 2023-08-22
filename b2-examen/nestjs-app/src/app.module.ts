import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { DepartmentEntity } from "./department/department.entity";
import { DepartmentController } from "./department/department.controller";
import { DepartmentService } from "./department/department.service";
import { EmployeeEntity } from "./employee/employee.entity";
import { EmployeeController } from "./employee/employee.controller";
import { EmployeeService } from "./employee/employee.service";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './database/database.sqlite',
      entities: [
        DepartmentEntity, EmployeeEntity,
      ],
      synchronize: true,
      dropSchema: false,
    }),
  ],
  controllers: [AppController, DepartmentController, EmployeeController],
  providers: [AppService, DepartmentService, EmployeeService],
})

export class AppModule {}
