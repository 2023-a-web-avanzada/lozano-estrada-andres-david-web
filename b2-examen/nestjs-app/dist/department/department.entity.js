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
exports.DepartmentEntity = void 0;
const typeorm_1 = require("typeorm");
let DepartmentEntity = exports.DepartmentEntity = class DepartmentEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DepartmentEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'name',
        type: 'varchar',
        length: 200,
        nullable: false,
    }),
    __metadata("design:type", String)
], DepartmentEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'budget',
        type: 'decimal',
        precision: 10,
        scale: 2,
        default: 0.00,
        nullable: false,
    }),
    __metadata("design:type", Number)
], DepartmentEntity.prototype, "budget", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'active',
        type: 'boolean',
        default: true,
        nullable: false,
    }),
    __metadata("design:type", Boolean)
], DepartmentEntity.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'location',
        type: 'varchar',
        length: 500,
        nullable: false,
    }),
    __metadata("design:type", String)
], DepartmentEntity.prototype, "location", void 0);
exports.DepartmentEntity = DepartmentEntity = __decorate([
    (0, typeorm_1.Entity)('department')
], DepartmentEntity);
//# sourceMappingURL=department.entity.js.map