import { Router, Request, Response } from "express";
const employeeRouter = Router();

employeeRouter.get("/", (req: Request, res: Response) => {
    console.log(req.url);
    res.status(200).send("Get all employees");
});

employeeRouter.get("/:id", (req: Request, res: Response) => {
    console.log(req.url);
    res.status(200).send("Get an employee");
});

employeeRouter.put("/:id", (req: Request, res: Response) => {
    console.log(req.url);
    res.status(200).send("Updated an employee");
});

employeeRouter.post("/", (req, res) => {
    res.status(201).send("Employee created");
});

employeeRouter.delete("/:id", (req, res) => {
    res.status(204).send("Employee deleted");
});

export default employeeRouter;
