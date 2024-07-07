import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Address from "./address.entity";
import { Role } from "../utils/role.enum";
import EmployeeDepartment from "./employeeDepartment.entity";

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

    @OneToMany(()=> EmployeeDepartment, (employeeDepartment) => employeeDepartment.employee)
    employeeDepartments: EmployeeDepartment[];
}

export default Employee;
