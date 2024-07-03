import { Request, Response } from "express";
import express from "express";
import employeeRouter from "./employeeRouter";
import bodyParser from "body-parser";
import { loggerMiddleWare } from "./loggerMiddleware";
import dataSource from "./data-source";

const server = express();
server.use(bodyParser.json());

server.use(loggerMiddleWare);

// dataSource
//     .initialize()
//     .then(() => {
//         console.log("Connected");
//     })
//     .catch((err) => {
//         console.log(err);
//         process.exit(1);
//     });

server.get("/", (req: Request, res: Response) => {
    console.log(req.url);
    res.status(200).send("Hello world");
});

server.use("/employees", employeeRouter);

// server.listen(3000, () => {
//     console.log("Server running on port 3000");
// });

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
