import { Column, Entity, ManyToOne, OneToMany, OneToOne } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Address from "./address.entity";
import { Role } from "../utils/role.enum";
import EmployeeDepartment from "./employeeDepartment.entity";
import Department from "./department.entity";

@Entity()
class Employee extends AbstractEntity {
    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    age: number;

    @OneToOne(() => Address, (address) => address.employee, {
        cascade: true,
        onDelete: "CASCADE",
    })
    address: Address;

    @Column({ nullable: true })
    password: string;

    @Column({ nullable: true })
    role: Role;

    @Column({ nullable: true })
    status: string;

    @Column({ nullable: true })
    experience: number;

    @OneToMany(() => EmployeeDepartment, (employeeDepartment) => employeeDepartment.employee)
    employeeDepartments: EmployeeDepartment[];

    @ManyToOne(() => Department, (department) => department.employee)
    department: Department;

    // @Column({ nullable: true })
    // department: string;
}

export default Employee;
