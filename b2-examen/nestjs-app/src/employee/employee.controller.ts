import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { EmployeeEntity } from "./employee.entity";
import { EmployeeDto } from "./dto/employee.dto";
import { DeleteResult, UpdateResult } from "typeorm";

@Controller('employees')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

    // http://localhost:3030/employees?department-id=<department-id>
    @Get('by-department/:id')
    getAllEmployeesByDepartmentId(@Param('id') departmentId: number): Promise<EmployeeEntity[]> {
        return this.employeeService.getAllEmployeesByDepartmentId(departmentId);
    }

    // http://localhost:3030/employees?id=<employee-id>
    @Get(':id')
    getOneEmployeeById(@Param('id') id: number): Promise<EmployeeEntity> {
        return this.employeeService.getOneEmployeeById(id);
    }

    // http://localhost:3030/employees/create
    @Post('create')
    createEmployee(@Body() employee: EmployeeDto): Promise<EmployeeDto & EmployeeEntity> {
        return this.employeeService.createEmployee(employee);
    }

    // http://localhost:3030/employees?id=<employee-id>
    @Put(':id')
    updateEmployee(@Param('id') id: number, @Body() employee: EmployeeDto): Promise<UpdateResult> {
        return this.employeeService.updateEmployee(id, employee);
    }

    // http://localhost:3030/employees?id=<employee-id>
    @Delete(':id')
    deleteEmployeeById(@Param('id') id: number): Promise<DeleteResult> {
        return this.employeeService.deleteEmployeeById(id);
    }
}