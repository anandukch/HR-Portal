import { Router, Request, Response } from "express";
import Employee from "./Employee";
import dataSource from "./data-source";
const employeeRouter = Router();

employeeRouter.get("/", async (req: Request, res: Response) => {
    const employeeRepo = dataSource.getRepository(Employee);
    const employees = await employeeRepo.find();
    res.status(200).send(employees);
});

employeeRouter.post("/", async (req, res) => {
    const employeeRepo = dataSource.getRepository(Employee);
    const newEmployee = new Employee();
    newEmployee.name = req.body.name;
    newEmployee.email = req.body.email;
    const savedEmployee = await employeeRepo.save(newEmployee);
    res.status(200).send(savedEmployee);
});

employeeRouter.get("/:id", async (req: Request, res: Response) => {
    const employeeRepo = dataSource.getRepository(Employee);
    const employee = await employeeRepo.findOne({
        where: { id: Number(req.params.id) },
    });

    res.status(200).send(employee);
});

// employeeRouter.put("/:id", (req: Request, res: Response) => {
//     // employees = employees.map((employee) => {
//     //     if (employee.id == Number(req.params.id)) {
//     //         return { ...employee, ...req.body };
//     //     }
//     //     return employee;
//     // });
//     employees.forEach((e, i) => {
//         if (e.id == Number(req.params.id)) {
//             employees[i] = {
//                 ...e,
//                 ...req.body,
//             };
//         }
//     });
//     res.status(200).send(employees);
// });


// employeeRouter.delete("/:id", (req: Request, res: Response) => {
//     const employeeId = Number(req.params.id);
//     // employees = employees.filter((employee) => employee.id != employeeId);
//     const idx = employees.findIndex((employee) => employee.id == employeeId);
//     employees.splice(idx, 1);
//     res.status(200).send(employees);
// });

export default employeeRouter;
