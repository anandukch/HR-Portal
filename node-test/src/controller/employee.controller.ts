import { NextFunction, Request, Response, Router } from "express";
import EmployeeService from "../service/employee.service";
import HttpException from "../exceptions/http.exceptions";

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

    public getAllEmployees = async (req: Request, res: Response) => {
        const employees = await this.employeeService.getAllEmployees();
        res.status(200).send(employees);
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
            const { name, email, age, address } = req.body;
            const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!email.match(emailFormat)) {
                throw new HttpException(400, "Invalid email format");
            }
            const newEmployee = await this.employeeService.createEmployee(email, name, age, address);
            res.status(200).send(newEmployee);
        } catch (error) {
            next(error);
        }
    };

    public updateEmployee = async (req: Request, res: Response) => {
        const name = req.body.name;
        const email = req.body.email;
        const employeeId = Number(req.params.id);
        const updatedEmployee = await this.employeeService.updateEmployee(
            { id: employeeId },
            {
                name: name,
                email: email,
            }
        );

        res.status(200).send(updatedEmployee);
    };

    public deleteEmployee = async (req: Request, res: Response) => {
        await this.employeeService.deleteEmployee(Number(req.params.id));
        res.status(204).send("Deleted");
    };
}

export default EmployeeController;
