import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/http.exceptions";

const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    if (err instanceof HttpException) {
        return res.status(err.status).send({ error: err.message, code: err.status });
    }
    res.status(500).send({ error: err.message });
};

export default errorMiddleware;
