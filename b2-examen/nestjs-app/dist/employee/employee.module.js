"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventosModule = void 0;
const employee_entity_1 = require("./employee.entity");
const employee_service_1 = require("./employee.service");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
let EventosModule = exports.EventosModule = class EventosModule {
};
exports.EventosModule = EventosModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([employee_entity_1.EmployeeEntity], 'default')
        ],
        controllers: [],
        providers: [employee_service_1.EmployeeService],
        exports: [employee_service_1.EmployeeService]
    })
], EventosModule);
//# sourceMappingURL=employee.module.js.map