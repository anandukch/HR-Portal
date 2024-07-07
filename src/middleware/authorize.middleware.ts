import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constants";
import { jwtPayload } from "../utils/jwtPayload.type";
import { RequestWithUser } from "../utils/requestWithUser";
import { Role } from "../utils/role.enum";


export const authorize = (roles: Role[] | "all") => {
    return (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const token = getTokenFromRequestHeader(req);
            const payload = jwt.verify(token, JWT_SECRET);
            const userRole = (payload as jwtPayload).role;     
            console.log(userRole);
                   
            if (!roles.includes(userRole) && roles !== "all") {
                return res.status(403).send("You are not authorized to access this resource");
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
