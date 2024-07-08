import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import AbstractEntity from "./abstract.entity";
import EmployeeDepartment from "./employeeDepartment.entity";
import Employee from "./employee.entity";

@Entity()
class Department extends AbstractEntity {
    @Column()
    name: string;

    @OneToMany(()=> EmployeeDepartment, (employeeDepartment) => employeeDepartment.department)
    employeeDepartments: EmployeeDepartment[];

    // @ManyToOne(()=>Employee, employee => employee.department)
    // employee: Employee;
}

export default Department;
