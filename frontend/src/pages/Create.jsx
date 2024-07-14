import "../styles/createEmployee.css";
import { useState } from "react";
import { EmployeeForm } from "../components/EmployeeForm";
import { employeeList } from "../utils/employees";
import { useNavigate } from "react-router-dom";
import { isDataEmpty } from "../utils/formCheck";

const initalData = {
    name: "",
    joiningDate: "",
    role: "",
    status: "",
    experience: "",
    address: "",
};
export const CreateEmployee = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initalData);

    const onClickHandler = (e) => {
        e.preventDefault();
        if (isDataEmpty(formData)) {
            alert("Form fields empty");
            setFormData(initalData);
            return
        }
        const idx = Math.random().toString(16).slice(2);
        formData.id = idx;
        employeeList.push(formData);
        navigate("/employees");
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
