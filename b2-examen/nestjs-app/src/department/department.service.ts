import { Injectable } from "@nestjs/common";
import { DepartmentEntity } from "./department.entity";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource, DeleteResult, FindManyOptions, UpdateResult } from "typeorm";
import { DepartmentDto } from "./dto/department.dto";

@Injectable()
export class DepartmentService {
    constructor(
        @InjectDataSource()
        public dataSource: DataSource
    ) {}

    public departmentRepository = this.dataSource.getRepository(
        DepartmentEntity
    );

    getAllDepartments(options: FindManyOptions<DepartmentEntity>): Promise<DepartmentEntity[]> {
        return this.departmentRepository.find(options);
    }

    getOneDepartmentById(id: number): Promise<DepartmentEntity> {
        return this.departmentRepository.findOne({
            where: {
                id: id,
            }
        });
    }

    createDepartment(department: DepartmentDto): Promise<DepartmentDto & DepartmentEntity> {
        return this.departmentRepository.save(department);
    }

    updateDepartment(id: number, department: DepartmentDto): Promise<UpdateResult> {
        return this.departmentRepository.update(id, department);
    }

    deleteDepartmentById(id: number): Promise<DeleteResult> {
        return this.departmentRepository.delete(id);
    }
}