import { NextFunction, Request, Response, Router } from "express";
import EmployeeService from "../service/employee.service";
import HttpException from "../exceptions/http.exceptions";
import { CreateEmployeeDto, EmployeeResposneDto, LoginDto, PasswordResetDto, UpdateEmployeeDto } from "../dto/employee.dto";
import { authorize } from "../middleware/authorize.middleware";
import { RequestWithUser } from "../utils/requestWithUser";
import { Role } from "../utils/role.enum";
import validationMiddleware from "../middleware/validate.middleware";
import { reponseHandler } from "../utils/reponse.utils";
import asyncHandler from "../utils/asyncHandler.utils";

class EmployeeController {
    public router: Router;
    constructor(private employeeService: EmployeeService) {
        this.router = Router();

        this.router.get("/profile", authorize(), this.getCurrentEmployee);
        this.router.patch("/reset-password", authorize(), validationMiddleware(PasswordResetDto), this.resetPassword);
        this.router.get("/", authorize([Role.HR]), this.getAllEmployees);
        this.router.get("/:id", this.getEmployee);
        this.router.post("/", authorize([Role.HR]), validationMiddleware(CreateEmployeeDto), this.createEmployee);
        this.router.put("/:id", authorize([Role.HR]), validationMiddleware(UpdateEmployeeDto), this.updateEmployee);
        this.router.delete("/:id", authorize([Role.HR]), this.deleteEmployee);

        //authentication
        this.router.post("/login", validationMiddleware(LoginDto), this.login);
    }

    public getCurrentEmployee = asyncHandler(async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const employee = await this.employeeService.getMe(req.name, req.email);
        res.status(200).json(reponseHandler("success", "Employee found", new EmployeeResposneDto(employee)));
    });

    public resetPassword = asyncHandler(async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const { currentPassword, newPassword } = req.body;
        console.log(req.name, req.email);
        
        const employee = await this.employeeService.getMe(req.name, req.email);
        console.log(employee);
        
        await this.employeeService.resetPassword(employee, currentPassword, newPassword);
        res.status(200).json(reponseHandler("success", "Password reset successfull"));
    });

    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const loginDto = req.body as LoginDto;
            const token = await this.employeeService.loginEmployee(loginDto.email, loginDto.password);
            res.status(200).json(reponseHandler("success", "Login successful", { token }));
        } catch (error) {
            next(error);
        }
    };

    public getAllEmployees = asyncHandler(async (_: Request, res: Response, next: NextFunction) => {
        const employees = await this.employeeService.getAllEmployees();
        if (employees.length == 0) throw new HttpException(404, "No employees found");
        res.status(200).send(
            reponseHandler(
                "success",
                "Employees found",
                employees.map((employee) => new EmployeeResposneDto(employee))
            )
        );
    });

    public getEmployee = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const employeeId = Number(req.params.id);
        const employee = await this.employeeService.getEmployeeById(employeeId);
        if (!employee) {
            throw new HttpException(404, `No employee found with id : ${employeeId}`);
        }
        res.status(200).json(reponseHandler("success", "Employee found", new EmployeeResposneDto(employee)));
    });

    public createEmployee = asyncHandler(async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const newEmployee = await this.employeeService.createEmployee(req.body);
        res.status(200).json(reponseHandler("success", "Employee created", new EmployeeResposneDto(newEmployee)));
    });

    public updateEmployee = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const updatedEmployeeData = req.body;
        const employeeId = Number(req.params.id);
        await this.employeeService.updateEmployee(employeeId, updatedEmployeeData);
        res.status(200).json(reponseHandler("success", "Employee updated"));
    });

    public deleteEmployee = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        await this.employeeService.deleteEmployee(Number(req.params.id));
        res.status(204).json(reponseHandler("success", "Employee deleted"));
    });
}

export default EmployeeController;
