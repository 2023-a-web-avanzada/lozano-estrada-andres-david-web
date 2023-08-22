import { DepartmentService } from "./department.service";
import { DepartmentEntity } from "./department.entity";
import { DepartmentCreateDto } from "./dto/department.create.dto";
export declare class DepartmentController {
    private readonly departmentService;
    constructor(departmentService: DepartmentService);
    getAllDepartments(): Promise<DepartmentEntity[]>;
    createDepartment(department: DepartmentCreateDto): Promise<DepartmentCreateDto & DepartmentEntity>;
}
