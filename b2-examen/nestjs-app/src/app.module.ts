import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { DepartmentEntity } from "./department/department.entity";
import { DepartmentController } from "./department/department.controller";
import { DepartmentService } from "./department/department.service";

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'sqlite',
        database: './database/database.sqlite',
        entities: [
          DepartmentEntity,
        ],
        synchronize: true,
        dropSchema: false,
      }),
  ],
  controllers: [AppController, DepartmentController],
  providers: [AppService, DepartmentService],
})
export class AppModule {}
