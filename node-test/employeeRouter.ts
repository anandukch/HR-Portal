// import { Router, Request, Response } from "express";
// import Employee from "./src/entity/employee.entity";
// import dataSource from "./data-source";
// const employeeRouter = Router();

// employeeRouter.get("/", async (req: Request, res: Response) => {
//     const employeeRepo = dataSource.getRepository(Employee);
//     const employees = await employeeRepo.find();
//     res.status(200).send(employees);
// });

// employeeRouter.post("/", async (req, res) => {
//     const employeeRepo = dataSource.getRepository(Employee);
//     const newEmployee = new Employee();
//     newEmployee.name = req.body.name;
//     newEmployee.email = req.body.email;
//     const savedEmployee = await employeeRepo.save(newEmployee);
//     res.status(200).send(savedEmployee);
// });

// employeeRouter.get("/:id", async (req: Request, res: Response) => {
//     const employeeRepo = dataSource.getRepository(Employee);
//     const employee = await employeeRepo.findOneBy({
//         id: Number(req.params.id),
//     });

//     res.status(200).send(employee);
// });

// employeeRouter.put("/:id", async (req: Request, res: Response) => {
//     const employeeRepo = dataSource.getRepository(Employee);
//     const employee = await employeeRepo.findOneBy({ id: Number(req.params.id) });
//     employee.name = req.body.name;
//     employee.email = req.body.email;
//     const savedEmployee = await employeeRepo.save(employee);
//     res.status(200).send(savedEmployee);
// });

// employeeRouter.delete("/:id", async (req, res) => {
//     const employeeRepository = dataSource.getRepository(Employee);
//     const result = await employeeRepository.softDelete(Number(req.params.id))
//     res.status(200).send(result);
//   });

// export default employeeRouter;
