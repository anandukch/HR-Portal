import { Request, Response } from "express";
import express from "express";
import employeeRouter from "./employeeRouter";

const server = express();

server.get("/", (req: Request, res: Response) => {
    console.log(req.url);
    res.status(200).send("Hello world");
});

server.use("/employees", employeeRouter);

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
