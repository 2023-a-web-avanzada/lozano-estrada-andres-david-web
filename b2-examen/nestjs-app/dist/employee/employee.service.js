"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const employee_entity_1 = require("./employee.entity");
let EmployeeService = exports.EmployeeService = class EmployeeService {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.employeeRepository = this.dataSource.getRepository(employee_entity_1.EmployeeEntity);
    }
    getAllEmployeesByDepartmentId(departmentId) {
        return this.employeeRepository.find({
            where: {
                department: departmentId,
            }
        });
    }
    getOneEmployeeById(id) {
        return this.employeeRepository.findOne({
            where: {
                id: id,
            }
        });
    }
    createEmployee(employee) {
        return this.employeeRepository.save(employee);
    }
    updateEmployee(id, employee) {
        return this.employeeRepository.update(id, employee);
    }
    deleteEmployeeById(id) {
        return this.employeeRepository.delete(id);
    }
};
exports.EmployeeService = EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], EmployeeService);
//# sourceMappingURL=employee.service.js.map