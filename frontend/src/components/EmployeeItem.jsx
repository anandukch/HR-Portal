/* eslint-disable react/prop-types */
import { StatusItem } from "./StatusItem";
import DeleteIcon from "../assets/delete.png";
import PencilIcon from "../assets/pencil.png";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const EmployeeItem = ({ employee, deleteHandler, clickHandler }) => {
    const { name, id, joiningDate, role, status, experience } = employee;
    const navigate = useNavigate();

    const editHandler = () => {
        navigate(`/employees/edit/${id}`);
    };
    return (
        <div className="employee_item employee_content" onClick={clickHandler}>
            <p>{name}</p>
            <p>{id}</p>
            <p>{joiningDate}</p>
            <p>{role}</p>
            {status === "Active" ? (
                <StatusItem text={status} bgColor="#a4e984" />
            ) : status === "Probation" ? (
                <StatusItem text={status} bgColor="rgb(255, 191, 0)" />
            ) : (
                <StatusItem text={status} bgColor="#d85757" />
            )}
            <p>{experience} years</p>
            <div className="class_action">
                <img
                    src={DeleteIcon}
                    alt="delete"
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteHandler();
                    }}
                />
                <img
                    src={PencilIcon}
                    alt="edit"
                    onClick={(e) => {
                        e.stopPropagation();
                        editHandler();
                    }}
                />
            </div>
        </div>
    );
};
