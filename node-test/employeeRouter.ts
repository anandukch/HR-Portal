import { Router, Request, Response } from "express";
import Employee from "./Employee";
const employeeRouter = Router();

let employees: Employee[] = [
    {
        id: 1,
        name: "Annadu",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 2,
        name: "Adarsh",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

employeeRouter.get("/", (req: Request, res: Response) => {
    res.status(200).send(employees);
});

employeeRouter.get("/:id", (req: Request, res: Response) => {
    const employeeId = Number(req.params.id);
    const employee = employees.find((employee) => employee.id == employeeId);
    res.status(200).send(employee);
});

employeeRouter.put("/:id", (req: Request, res: Response) => {
    console.log(req.body);

    employees = employees.map((employee) => {
        if (employee.id == Number(req.params.id)) {
            return req.body;
        }
        return employee;
    });
    res.status(200).send("Updated an employee");
});

employeeRouter.post("/", (req: Request, res: Response) => {
    const body = req.body;
    const newId = employees.length + 1;
    const employee: Employee = {
        id: newId,
        name: body.name,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    employees.push(employee);
    res.status(201).send(employee);
});

employeeRouter.delete("/:id", (req: Request, res: Response) => {
    const employeeId = Number(req.params.id);
    // employees = employees.filter((employee) => employee.id != employeeId);
    const idx = employees.findIndex((employee) => employee.id == employeeId);
    employees.splice(idx, 1);
    res.status(200).send(employees);
});

export default employeeRouter;
