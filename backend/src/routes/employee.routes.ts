import EmployeeController from "../controller/employee.controller";
import dataSource from "../db/dataSource.db";
import Employee from "../entity/employee.entity";
import EmployeeDepartment from "../entity/employeeDepartment.entity";
import EmployeeRepository from "../repository/employee.repository";
import EmployeeDepartmentRepository from "../repository/employeeDepartment.repository";
import EmployeeService from "../service/employee.service";
import EmployeeDepartmentService from "../service/employeeDepartment.service";
import { departmentService } from "./department.routes";

const employeeController = new EmployeeController(
    new EmployeeService(
        new EmployeeRepository(dataSource.getRepository(Employee)),
        departmentService,
        new EmployeeDepartmentService(new EmployeeDepartmentRepository(dataSource.getRepository(EmployeeDepartment)))
    )
);
const employeeRouter = employeeController.router;

export default employeeRouter;
