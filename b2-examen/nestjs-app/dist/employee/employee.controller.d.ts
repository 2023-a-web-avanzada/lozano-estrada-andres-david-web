import { EmployeeService } from "./employee.service";
import { EmployeeEntity } from "./employee.entity";
import { EmployeeDto } from "./dto/employee.dto";
import { DeleteResult, UpdateResult } from "typeorm";
export declare class EmployeeController {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
    getAllEmployeesByDepartmentId(departmentId: number): Promise<EmployeeEntity[]>;
    getOneEmployeeById(id: number): Promise<EmployeeEntity>;
    createEmployee(employee: EmployeeDto): Promise<EmployeeDto & EmployeeEntity>;
    updateEmployee(id: number, employee: EmployeeDto): Promise<UpdateResult>;
    deleteEmployeeById(id: number): Promise<DeleteResult>;
}
