/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "../styles/createEmployee.css";
import { useEffect, useState } from "react";
import { EmployeeForm } from "../components/EmployeeForm";
import { useNavigate } from "react-router-dom";
import { isDataEmpty } from "../utils/formCheck";
import { useAddEmployeeMutation } from "../api/employeeApi";
import { Toast } from "../components/Toast";

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

    const [showError, setShowError] = useState(false);

    const [addEmployee, { data, isSuccess, isError, error }] = useAddEmployeeMutation();

    useEffect(() => {
        if (isSuccess) {
            navigate("/employees");
        }
    }, [isSuccess, data, navigate]);
    const onClickHandler = (e) => {
        e.preventDefault();
        if (isDataEmpty(formData)) {
            setShowError(true);
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
            {showError && <Toast message="Please fill all the fields" type="error" showError={setShowError} />}
            {isError && <Toast message={error.data.errors[0].constraints[0]} type="error" showError={setShowError} />}

            <section className="create_section">
                <h1>Create Employee</h1>
            </section>
            <section className="create_section">
                <EmployeeForm formData={formData} formChangeHandler={formChangeHandler} onClickHandler={onClickHandler} />
            </section>
        </>
    );
};
