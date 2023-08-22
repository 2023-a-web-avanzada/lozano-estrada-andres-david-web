import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('employee')
export class EmployeeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'name',
        type: 'varchar',
        length: 200,
        nullable: false,
    })
    name: string;

    @Column({
        name: 'birthday',
        type: 'datetime',
        nullable: false,
    })
    birthday: Date;

    @Column({
        name: 'salary',
        type: 'decimal',
        precision: 10,
        scale: 2,
        default: 0.00,
        nullable: false,
    })
    salary: number;

    @Column({
        name: 'position',
        type: 'varchar',
        length: 200,
        nullable: false,
    })
    position: string;

    @Column({
        name: 'insured',
        type: 'boolean',
        default: false,
        nullable: false,
    })
    insured: boolean;

    @Column({
        name: 'department',
        type: 'integer',
        default: 0,
        nullable: false,
    })
    department: number;
}