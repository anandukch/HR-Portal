import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/http.exceptions";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { formatError } from "../utils/formatError.utils";

const validationMiddleware = (dto: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const schema = plainToInstance(dto, req.body);
            const errors = await validate(schema);
            if (errors.length) {
                throw new HttpException(400, "Validation error", formatError(errors));
            }
            next();
        } catch (error) {
            next(error);
        }
    };
};

export default validationMiddleware;
