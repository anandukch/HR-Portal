import EmployeeController from "../controller/employee.controller";
import dataSource from "../db/dataSource.db";
import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";
import EmployeeService from "../service/employee.service";
import { departmentService } from "./department.routes";

const employeeController = new EmployeeController(new EmployeeService(new EmployeeRepository(dataSource.getRepository(Employee)), departmentService));
const employeeRouter = employeeController.router;

export default employeeRouter;
