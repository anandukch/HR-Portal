/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "../styles/createEmployee.css";
import { useState } from "react";
import { EmployeeForm } from "../components/EmployeeForm";
import { useNavigate, useOutletContext } from "react-router-dom";
import { isDataEmpty } from "../utils/formCheck";
import { useDispatch } from "react-redux";
import { addEmployee } from "../store/employeeReducer";

const initalData = {
    name: "",
    joiningDate: "",
    role: "",
    status: "",
    experience: "",
    address: "",
};
export const CreateEmployee = () => {
    // const  { state, dispatch }=  useOutletContext()
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initalData);
    const dispatch =  useDispatch();

    const onClickHandler = (e) => {
        e.preventDefault();
        if (isDataEmpty(formData)) {
            alert("Form fields empty");
            setFormData(initalData);
            return
        }
        const idx = Math.random().toString(16).slice(2);
        formData.id = idx;

        dispatch(addEmployee(formData));
        // dispatch({ type: "ADD_EMPLOYEE", payload: formData });
        
        
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
