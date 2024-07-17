/* eslint-disable react/prop-types */
import { statusColor } from "../utils/statusColorMap";
import { StatusItem } from "./StatusItem";

export const EmployeeBox = ({ fields, employee }) => {
    return (
        <div className="emp_detail">
            <div className="emp_container top">
                {fields.slice(0, 6).map((field) => {
                    if (field.name == "status") {
                        return (
                            <div key={field.name}>
                                <span className="title">{field.label}</span>
                                <StatusItem text={employee[field.name]} bgColor={statusColor[employee.status]} />
                            </div>
                        );
                    }
                    return (
                        <div key={field.name}>
                            <span className="title">{field.label}</span>
                            <span className="value">{employee[field.name]}</span>
                        </div>
                    );
                })}
            </div>

            <div className="emp_container down">
                {fields.slice(6, 8).map((field) => {
                    return (
                        <div key={field.name}>
                            <span className="title">{field.label}</span>
                            <span className="value">{employee[field.name]}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
