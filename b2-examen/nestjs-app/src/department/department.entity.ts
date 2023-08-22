import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('department')
export class DepartmentEntity {
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
        name: 'budget',
        type: 'decimal',
        precision: 10,
        scale: 2,
        default: 0.00,
        nullable: false,
    })
    budget: number;

    @Column({
        name: 'active',
        type: 'boolean',
        default: true,
        nullable: false,
    })
    active: boolean;

    @Column({
        name: 'location',
        type: 'varchar',
        length: 500,
        nullable: false,
    })
    location: string;
}
