import { NextFunction, Request, Response, Router } from "express";
import EmployeeService from "../service/employee.service";
import HttpException from "../exceptions/http.exceptions";
import { plainToInstance } from "class-transformer";
import { CreateEmployeeDto, UpdateEmployeeDto } from "../dto/employee.dto";
import { validate } from "class-validator";

class EmployeeController {
    public router: Router;
    constructor(private employeeService: EmployeeService) {
        this.router = Router();
        this.router.get("/", this.getAllEmployees);
        this.router.get("/:id", this.getEmployee);
        this.router.post("/", this.createEmployee);
        this.router.put("/:id", this.updateEmployee);
        this.router.delete("/:id", this.deleteEmployee);
    }

    public getAllEmployees = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const employees = await this.employeeService.getAllEmployees();
            if (employees.length == 0) throw new HttpException(404, "No employees found");
            res.status(200).send(employees);
        } catch (error) {
            next(error);
        }
    };

    public getEmployee = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const employeeId = Number(req.params.id);
            const employee = await this.employeeService.getEmployeeById(employeeId);
            if (!employee) {
                throw new HttpException(404, `No employee found with id :${employeeId}`);
            }
            res.status(200).send(employee);
        } catch (error) {
            next(error);
        }
    };

    public createEmployee = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const employeeDto = plainToInstance(CreateEmployeeDto, req.body);
            const errors = await validate(employeeDto);
            if (errors.length) {
                console.log(JSON.stringify(errors));

                throw new HttpException(400, JSON.stringify(errors));
            }
            const newEmployee = await this.employeeService.createEmployee(employeeDto.email, employeeDto.name, employeeDto.age, employeeDto.address);
            res.status(200).send(newEmployee);
        } catch (error) {
            next(error);
        }
    };

    public updateEmployee = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const employeeDto = plainToInstance(UpdateEmployeeDto, req.body);
            const errors = await validate(employeeDto);
            if (errors.length) {
                console.log(JSON.stringify(errors));

                throw new HttpException(400, JSON.stringify(errors));
            }
            const updatedEmployeeData = req.body;
            const employeeId = Number(req.params.id);
            const updatedEmployee = await this.employeeService.updateEmployee(employeeId, updatedEmployeeData);

            res.status(200).send(updatedEmployee);
        } catch (error) {
            next(error);
        }
    };

    public deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.employeeService.deleteEmployee(Number(req.params.id));
            res.status(204).send("Deleted");
        } catch (error) {
            next(error);
        }
    };
}

export default EmployeeController;
