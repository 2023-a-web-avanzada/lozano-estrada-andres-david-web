import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource, DeleteResult, UpdateResult } from "typeorm";
import { EmployeeEntity } from "./employee.entity";
import { EmployeeDto } from "./dto/employee.dto";

@Injectable()
export class EmployeeService {
    constructor(
        @InjectDataSource()
        public dataSource: DataSource
    ) {}

    public employeeRepository = this.dataSource.getRepository(
        EmployeeEntity
    );

    getAllEmployeesByDepartmentId(departmentId: number): Promise<EmployeeEntity[]> {
        return this.employeeRepository.find({
            where: {
                department: departmentId,
            }
        });
    }

    getOneEmployeeById(id: number): Promise<EmployeeEntity> {
        return this.employeeRepository.findOne({
            where: {
                id: id,
            }
        });
    }

    createEmployee(employee: EmployeeDto): Promise<EmployeeDto & EmployeeEntity> {
        return this.employeeRepository.save(employee);
    }

    updateEmployee(id: number, employee: EmployeeDto): Promise<UpdateResult> {
        return this.employeeRepository.update(id, employee);
    }

    deleteEmployeeById(id: number): Promise<DeleteResult> {
        return this.employeeRepository.delete(id);
    }
}