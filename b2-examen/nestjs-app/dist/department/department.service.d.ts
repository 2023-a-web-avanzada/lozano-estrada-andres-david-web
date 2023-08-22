import { DepartmentEntity } from "./department.entity";
import { DataSource, DeleteResult, FindManyOptions, UpdateResult } from "typeorm";
import { DepartmentDto } from "./dto/department.dto";
export declare class DepartmentService {
    dataSource: DataSource;
    constructor(dataSource: DataSource);
    departmentRepository: import("typeorm").Repository<DepartmentEntity>;
    getAllDepartments(options: FindManyOptions<DepartmentEntity>): Promise<DepartmentEntity[]>;
    getOneDepartmentById(id: number): Promise<DepartmentEntity>;
    createDepartment(department: DepartmentDto): Promise<DepartmentDto & DepartmentEntity>;
    updateDepartment(id: number, department: DepartmentDto): Promise<UpdateResult>;
    deleteDepartmentById(id: number): Promise<DeleteResult>;
}
