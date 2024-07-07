import { Entity, ManyToOne } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Employee from "./employee.entity";
import Department from "./department.entity";


@Entity()
class EmployeeDepartment extends AbstractEntity{
    @ManyToOne(() => Employee, (employee) => employee.employeeDepartments)
    employee: Employee;

    @ManyToOne(() => Department, (department) => department.employeeDepartments)
    department: Department;
}

export default EmployeeDepartment;