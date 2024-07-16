/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useNavigate, useParams } from "react-router-dom";
import "../styles/employeeDetail.css";
import { formFields } from "../utils/employees";
import EditIcon from "../assets/pencil.png";
import { StatusItem } from "../components/StatusItem";
import { statusColor } from "../utils/statusColorMap";
import { useGetEmployeeQuery } from "../api/employeeApi";
import { useEffect, useState } from "react";

export const EmployeeDetail = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState({});
    const fields = formFields;
    const navigate = useNavigate();

    const { data } = useGetEmployeeQuery(id);

    useEffect(() => {
        if (data) {
            const resData = data.data;
            console.log(resData);
            setEmployee({
                id: resData.id,
                name: resData.name,
                email: resData.email,
                role: resData.role,
                status: resData.status,
                experience: resData.experience,
                department: resData.employeeDepartments[0].department.name,
                address: resData.address.line1,
                joiningDate: new Date(resData.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                }),
            });
        }
    }, [data]);

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
        </>
    );
};
