import { NextFunction, Request, Response, Router } from "express";
import DepartmentService from "../service/department.service";
import HttpException from "../exceptions/http.exceptions";
import { authorize } from "../middleware/authorize.middleware";
import { Role } from "../utils/role.enum";
import validationMiddleware from "../middleware/validate.middleware";
import { CreateDepartmentDto } from "../dto/department.dto";
import { reponseHandler } from "../utils/reponse.utils";
import asyncHandler from "../utils/asyncHandler.utils";

class DepartmentController {
    public router: Router;

    constructor(private departmentService: DepartmentService) {
        this.router = Router();
        this.router.get("/", this.getAllDepartments);
        this.router.get("/:id", this.getDepartment);
        this.router.post("/", authorize([Role.HR]), validationMiddleware(CreateDepartmentDto), this.createDepartment);
        this.router.put("/:id", authorize([Role.HR]), validationMiddleware(CreateDepartmentDto), this.updateDepartment);
        this.router.delete("/:id", authorize([Role.HR]), this.deleteDepartment);
    }

    public getAllDepartments = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const departments = await this.departmentService.getAllDepartments();
        if (departments.length == 0) throw new HttpException(404, "No departments found");
        res.status(200).send(departments);
    });

    public getDepartment = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const departmentId = Number(req.params.id);
        const department = await this.departmentService.getDepartmentById(departmentId);
        if (!department) {
            throw new HttpException(404, `No department found with id :${departmentId}`);
        }
        res.status(200).json(reponseHandler("success", "Department found", department));
    });

    public createDepartment = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const name = req.body.name;
        const department = await this.departmentService.createDepartment(name);
        res.status(201).json(reponseHandler("success", "Department created", department));
    });

    public updateDepartment = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const departmentId = Number(req.params.id);
        const name = req.body.name;
        const department = await this.departmentService.updateDepartment(departmentId, { name });
        res.status(200).json(reponseHandler("success", "Department updated", department));
    });

    public deleteDepartment = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const departmentId = Number(req.params.id);
        await this.departmentService.deleteDepartment(departmentId);
        res.status(204).json(reponseHandler("success", "Department deleted"));
    });
}

export default DepartmentController;
