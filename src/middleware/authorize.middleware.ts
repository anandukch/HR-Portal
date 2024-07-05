import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constants";
import { jwtPayload } from "../utils/jwtPayload.type";
import { RequestWithUser } from "../utils/requestWithUser";

export const authorize = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const token = getTokenFromRequestHeader(req);
        console.log(token, JWT_SECRET);

        const payload = jwt.verify(token, JWT_SECRET);

        req.name = (payload as jwtPayload).name;
        req.email = (payload as jwtPayload).email;
        req.role = (payload as jwtPayload).role;

        return next();
    } catch (error) {
        return next(error);
    }
};

const getTokenFromRequestHeader = (req: RequestWithUser) => {
    const bearerToken = req.header("Authorization");
    const token = bearerToken ? bearerToken.replace("Bearer ", "") : "";
    return token;
};
