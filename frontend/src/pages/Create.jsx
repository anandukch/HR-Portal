/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "../styles/createEmployee.css";
import { useEffect, useState } from "react";
import { EmployeeForm } from "../components/EmployeeForm";
import { useNavigate, useOutletContext } from "react-router-dom";
import { isDataEmpty } from "../utils/formCheck";
import { useDispatch } from "react-redux";
import { addEmployee } from "../store/employeeReducer";
import { useAddEmployeeMutation } from "../api/employeeApi";

const initalData = {
    name: "",
    joiningDate: "",
    role: "",
    status: "",
    experience: 0,
    address: "",
    email: "",
    password: "",
    age: 0,
    department: "",
};
export const CreateEmployee = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initalData);

    const [addEmployee, { data, isSuccess }] = useAddEmployeeMutation();

    useEffect(() => {
        if (isSuccess) {
            navigate("/employees");
        }
    }, [isSuccess, data, navigate]);
    const onClickHandler = (e) => {
        e.preventDefault();
        if (isDataEmpty(formData)) {
            alert("Form fields empty");
            return;
        }
        const payload = {
            ...formData,
            address: {
                line1: formData.address,
                pincode: "123456",
            },
            departmentName: formData.department,
            age: parseInt(formData.age),
            experience: parseInt(formData.experience),
        };
        addEmployee(payload);
    };

    const formChangeHandler = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <>
            <section className="create_section">
                <h1>Create Employee</h1>
            </section>
            <section className="create_section">
                <EmployeeForm formData={formData} formChangeHandler={formChangeHandler} onClickHandler={onClickHandler} />
            </section>
        </>
    );
};
