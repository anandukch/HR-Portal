import DepartmentController from "../controller/department.controller";
import dataSource from "../db/dataSource.db";
import Department from "../entity/department.entity";
import DepartmentRepository from "../repository/department.repository";
import DepartmentService from "../service/department.service";

const departmentService = new DepartmentService(new DepartmentRepository(dataSource.getRepository(Department)));
const departmentController = new DepartmentController(departmentService);
const departmentRouter = departmentController.router;

export default departmentRouter;
export { departmentService };
