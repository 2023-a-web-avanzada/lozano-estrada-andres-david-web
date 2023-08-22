import { DepartmentService } from "./department.service";
import { DepartmentEntity } from "./department.entity";
import { DepartmentDto } from "./dto/department.dto";
import { DeleteResult, UpdateResult } from "typeorm";
export declare class DepartmentController {
    private readonly departmentService;
    constructor(departmentService: DepartmentService);
    getAllDepartments(): Promise<DepartmentEntity[]>;
    getOneDepartmentById(id: number): Promise<DepartmentEntity>;
    createDepartment(department: DepartmentDto): Promise<DepartmentDto & DepartmentEntity>;
    updateDepartment(id: number, department: DepartmentDto): Promise<UpdateResult>;
    deleteDepartmentById(id: number): Promise<DeleteResult>;
}
