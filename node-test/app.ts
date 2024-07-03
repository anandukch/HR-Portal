import { Request, Response } from "express";
import express from "express";
import employeeRouter from "./employeeRouter";
import bodyParser from "body-parser";
import { loggerMiddleWare } from "./loggerMiddleware";

const server = express();
server.use(bodyParser.json())

server.use(loggerMiddleWare)
server.get("/", (req: Request, res: Response) => {
    console.log(req.url);
    res.status(200).send("Hello world");
});

server.use("/employees", employeeRouter);

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
