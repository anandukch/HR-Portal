/* eslint-disable react/prop-types */
import "../styles/createEmployee.css";
import { useEffect, useState } from "react";
import { EmployeeForm } from "../components/EmployeeForm";
import { useNavigate, useParams } from "react-router-dom";
import { useGetEmployeeQuery, useUpdateEmployeeMutation } from "../api/employeeApi";

export const EditEmployee = () => {
    const { id } = useParams();
    const [employeeData, setEmployeeData] = useState({});
    const navigate = useNavigate();

    const { data } = useGetEmployeeQuery(id);

    const [updateEmployee, { isSuccess: updateSuccess }] = useUpdateEmployeeMutation();
    useEffect(() => {
        if (data) {
            const employee = data.data;
            setEmployeeData(() => ({
                name: employee.name,
                id: employee.id,
                joiningDate: new Date(employee.createdAt).toISOString().split("T")[0],
                role: employee.role,
                status: employee.status,
                experience: employee.experience,
                department: employee.department.name,
                address: employee.address.line1,
                email: employee.email,
                age: employee.age,
            }));
        }
    }, [data]);

    useEffect(() => {
        if (updateSuccess) {
            navigate("/employees");
        }
    }, [navigate, updateSuccess]);

    const onClickHandler = (e) => {
        e.preventDefault();
        const payload = {
            ...employeeData,
            address: {
                line1: employeeData.address,
                // pincode: "123456",
            },
            departmentName: employeeData.department,
            age: parseInt(employeeData.age),
            experience: parseInt(employeeData.experience),
        };
        updateEmployee(payload);

        // navigate("/employees");
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
