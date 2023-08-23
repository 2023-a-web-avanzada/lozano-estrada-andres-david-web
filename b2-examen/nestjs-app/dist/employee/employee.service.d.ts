import { DataSource, DeleteResult, UpdateResult } from "typeorm";
import { EmployeeEntity } from "./employee.entity";
import { EmployeeDto } from "./dto/employee.dto";
export declare class EmployeeService {
    dataSource: DataSource;
    constructor(dataSource: DataSource);
    employeeRepository: import("typeorm").Repository<EmployeeEntity>;
    getAllEmployeesByDepartmentId(departmentId: number): Promise<EmployeeEntity[]>;
    getOneEmployeeById(id: number): Promise<EmployeeEntity>;
    createEmployee(employee: EmployeeDto): Promise<EmployeeDto & EmployeeEntity>;
    updateEmployee(id: number, employee: EmployeeDto): Promise<UpdateResult>;
    deleteEmployeeById(id: number): Promise<DeleteResult>;
}
