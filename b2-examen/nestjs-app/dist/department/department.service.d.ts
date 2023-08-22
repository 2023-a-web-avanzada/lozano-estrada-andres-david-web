import { DepartmentEntity } from "./department.entity";
import { DataSource, FindManyOptions } from "typeorm";
import { DepartmentCreateDto } from "./dto/department.create.dto";
export declare class DepartmentService {
    dataSource: DataSource;
    constructor(dataSource: DataSource);
    departmentRepository: import("typeorm").Repository<DepartmentEntity>;
    findDepartments(options: FindManyOptions<DepartmentEntity>): Promise<DepartmentEntity[]>;
    createDepartment(department: DepartmentCreateDto): Promise<DepartmentCreateDto & DepartmentEntity>;
}
