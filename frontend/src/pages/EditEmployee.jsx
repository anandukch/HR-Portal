/* eslint-disable react/prop-types */
import "../styles/createEmployee.css";
import { useEffect, useState } from "react";
import { EmployeeForm } from "../components/EmployeeForm";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editEmployee } from "../store/employeeReducer";

export const EditEmployee = () => {
    const { id } = useParams();
    // const  { state, dispatch }=  useOutletContext()
    const state = useSelector((state) => state.employee);
    const dispatch = useDispatch();
    const [employeeData, setEmployeeData] = useState({});
    const navigate = useNavigate();
    const employee = state.employees.find((employee) => employee.id === id);
    useEffect(() => {
        setEmployeeData(() => ({
            name: employee.name,
            id: employee.id,
            joiningDate: new Date(employee.joiningDate).toISOString().split("T")[0],
            role: employee.role,
            status: employee.status,
            experience: employee.experience,
            department: employee.department,
            address: employee.address,
        }));
    }, [employee]);

    const onClickHandler = (e) => {
        e.preventDefault();
        // employeeList.forEach((employee, i) => {
        //     if (employee.id == id) employeeList[i] = employeeData;
        // });

        dispatch(editEmployee(employeeData));
        navigate("/employees");
    };

    const formChangeHandler = (e) => {
        setEmployeeData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <>
            <section className="create_section">
                <h1>Edit Employee</h1>
            </section>
            <section className="create_section">
                {employeeData && <EmployeeForm formData={employeeData} formChangeHandler={formChangeHandler} onClickHandler={onClickHandler} edit />}
            </section>
        </>
    );
};
