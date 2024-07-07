import { ValidationError } from "class-validator";

export const formatError = (error: ValidationError[]) => {
    return error.map((err) => {
        const constraints = err.constraints;
        return {
            property: err.property,
            constraints: Object.keys(constraints).map((key) => constraints[key]),
        };
    });
}