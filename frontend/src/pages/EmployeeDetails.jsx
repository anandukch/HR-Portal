/* eslint-disable react/jsx-key */
import { useNavigate, useParams } from "react-router-dom";
import "../styles/employeeDetail.css";
import { employeeList, formFields } from "../utils/employees";
import EditIcon from "../assets/pencil.png";
import { StatusItem } from "../components/StatusItem";
import { statusColor } from "../utils/statusColorMap";

export const EmployeeDetail = () => {
    const { id } = useParams();
    const employee = employeeList.find((employee) => employee.id === id);
    const fields = formFields;
    const navigate = useNavigate();
    const editClickHandler = () => {
        navigate(`/employees/edit/${id}`);
    };
    return (
        <>
            <section className="list_section">
                <h1>Employee Detail</h1>
                <div className="list_right">
                    <span className="create_emp_btn edit_emp_btn">
                        <button onClick={editClickHandler}>
                            <img src={EditIcon} alt="" />
                        </button>
                        <div>Edit employee</div>
                    </span>
                </div>
            </section>
            <div className="emp_detail">
                <div className="emp_container top">
                    {fields.slice(0, 6).map((field) => {
                        if (field.name=="status") {
                            return (
                                <div key={field.name}>
                                    <span className="title">{field.label}</span>
                                    <StatusItem text={employee[field.name]} bgColor={statusColor[employee.status]}/>
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
                            <div key={field.name} >
                                <span className="title">{field.label}</span>
                                <span className="value">{employee[field.name]}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};
