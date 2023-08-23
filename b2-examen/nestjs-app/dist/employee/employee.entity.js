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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeEntity = void 0;
const typeorm_1 = require("typeorm");
let EmployeeEntity = exports.EmployeeEntity = class EmployeeEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EmployeeEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'name',
        type: 'varchar',
        length: 200,
        nullable: false,
    }),
    __metadata("design:type", String)
], EmployeeEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'birthday',
        type: 'datetime',
        nullable: false,
    }),
    __metadata("design:type", Date)
], EmployeeEntity.prototype, "birthday", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'salary',
        type: 'decimal',
        precision: 10,
        scale: 2,
        default: 0.00,
        nullable: false,
    }),
    __metadata("design:type", Number)
], EmployeeEntity.prototype, "salary", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'position',
        type: 'varchar',
        length: 200,
        nullable: false,
    }),
    __metadata("design:type", String)
], EmployeeEntity.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'insured',
        type: 'boolean',
        default: false,
        nullable: false,
    }),
    __metadata("design:type", Boolean)
], EmployeeEntity.prototype, "insured", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'department',
        type: 'integer',
        default: 0,
        nullable: false,
    }),
    __metadata("design:type", Number)
], EmployeeEntity.prototype, "department", void 0);
exports.EmployeeEntity = EmployeeEntity = __decorate([
    (0, typeorm_1.Entity)('employee')
], EmployeeEntity);
//# sourceMappingURL=employee.entity.js.map