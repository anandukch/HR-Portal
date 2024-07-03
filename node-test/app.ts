import { Request, Response } from "express";

import express from "express";
const server = express();

server.get("/", (req: Request, res: Response) => {
    console.log(req.url);
    res.status(200).send("Hello world");
});

server.get("/employees", (req: Request, res: Response) => {
    console.log(req.url);
    res.status(200).send("Get all employees");
});

server.put("/employees/:id", (req: Request, res: Response) => {
    console.log(req.url);
    res.status(200).send("Updated an employee");
});

server.post("/employees", (req, res) => {
    res.status(201).send("Employee created");
});

server.delete("/employees/:id", (req, res) => {
    res.status(200).send("Employee deleted");
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
