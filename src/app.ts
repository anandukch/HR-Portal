import { Request, Response } from "express";
import express from "express";
import bodyParser from "body-parser";
import { loggerMiddleWare } from "./middleware/logger.middleware";
import dataSource from "./db/data-source.db";
import employeeRouter from "./routes/employee.routes";
import errorMiddleware from "./middleware/error.middleware";

const server = express();
server.use(bodyParser.json());

server.use(loggerMiddleWare);

server.get("/", (req: Request, res: Response) => {
    console.log(req.url);
    res.status(200).send("Hello world");
});

server.use("/employees", employeeRouter);

server.use(errorMiddleware);

(async () => {
    try {
        await dataSource.initialize();
    } catch (e) {
        console.log("Failed", e);
        process.exit(1);
    }
    server.listen(3000, () => {
        console.log("server listening to 3000");
    });
})();
