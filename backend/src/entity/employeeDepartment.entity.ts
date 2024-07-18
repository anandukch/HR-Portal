import { Column, Entity, ManyToOne } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Employee from "./employee.entity";
import Department from "./department.entity";


// not being used
@Entity()
class EmployeeDepartment extends AbstractEntity {
    // @ManyToOne(() => Employee, (employee) => employee.employeeDepartments)
    // employee: Employee;

    // @ManyToOne(() => Department, (department) => department.employeeDepartments)
    // department: Department;

    @Column({ nullable: true })
    endDate: Date;

    @Column()
    employee_id: number;

    @Column()
    department_id: number;
}

export default EmployeeDepartment;
