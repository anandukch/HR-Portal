import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constants";
import { jwtPayload } from "../utils/jwtPayload.type";
import { RequestWithUser } from "../utils/requestWithUser";
import { Role } from "../utils/role.enum";
import HttpException from "../exceptions/http.exceptions";

export const authorize = (roles?: Role[]) => {
    return (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const token = getTokenFromRequestHeader(req);
            const payload = jwt.verify(token, JWT_SECRET);
            const userRole = (payload as jwtPayload).role;
            if (roles != undefined && !roles.includes(userRole)) {
                throw new HttpException(403, "Unauthorized");
            }
            req.name = (payload as jwtPayload).name;
            req.email = (payload as jwtPayload).email;
            req.role = (payload as jwtPayload).role;
            return next();
        } catch (error) {
            return next(error);
        }
    };
};

const getTokenFromRequestHeader = (req: RequestWithUser) => {
    const bearerToken = req.header("Authorization");
    const token = bearerToken ? bearerToken.replace("Bearer ", "") : "";
    return token;
};
