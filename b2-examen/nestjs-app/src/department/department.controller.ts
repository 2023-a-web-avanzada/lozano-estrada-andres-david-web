import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { DepartmentService } from "./department.service";
import { DepartmentEntity } from "./department.entity";
import { DepartmentDto } from "./dto/department.dto";
import { DeepPartial, DeleteResult } from "typeorm";

@Controller('departments')
export class DepartmentController {
    constructor(private readonly departmentService: DepartmentService) {}

    // http://localhost:3030/departments
    @Get()
    getAllDepartments(): Promise<DepartmentEntity[]> {
        const options = {};
        return this.departmentService.getAllDepartments(options);
    }

    // http://localhost:3030/departments?id=<department-id>
    @Get(':id')
    getOneDepartmentById(@Param('id') id: number): Promise<DepartmentEntity> {
        return this.departmentService.getOneDepartmentById(id);
    }

    // http://localhost:3030/departments/create
    @Post('create')
    createDepartment(@Body() department: DepartmentDto): Promise<DepartmentDto & DepartmentEntity> {
        return this.departmentService.createDepartment(department);
    }

    // http://localhost:3030/departments?id=<department-id>
    @Put(':id')
    updateDepartment(
        @Param('id') id: number,
        @Body() department: DepartmentDto
    ): Promise<(DeepPartial<DepartmentDto> & DepartmentEntity)> {
        return this.departmentService.updateDepartment(id, department);
    }

    // http://localhost:3030/departments?id=<department-id>
    @Delete(':id')
    deleteDepartmentById(@Param('id') id: number): Promise<DeleteResult> {
        return this.departmentService.deleteDepartmentById(id);
    }
}