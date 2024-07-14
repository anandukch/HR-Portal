/* eslint-disable react/jsx-key */
import { useNavigate } from "react-router-dom";
import { EmployeeItem } from "../components/EmployeeItem";
import "../styles/employeeList.css";
import {  useState } from "react";
import { employeeList } from "../utils/employees";
import { DeletePopUp } from "../components/DeletePopUp";

export const EmployeeList = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState(employeeList);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedEmpId, setSelectedEmpId] = useState(null);

    const clickHandler = () => {
        navigate("/employees/create");
    };

    const filterHandler = (e) => {
        if (e.target.value === "all") {
            setEmployees(employeeList);
        } else {
            setEmployees(employees.filter((employee) => employee.status === e.target.value));
        }
    };

    const deleteHandler = (id) => {
        employeeList.forEach((employee, i) => {
            if (employee.id == id) employeeList.splice(i, 1);
        });
        setEmployees(employees.filter((employee) => employee.id != id));
        setShowDelete(false);
    };

    const onEmployeeClick = (id) => {
        navigate(`/employees/${id}`);
    };

    return (
        <>
            {showDelete && (
                <DeletePopUp
                    title={"Are you sure?"}
                    description={"Do you want to delete employee?"}
                    onCancel={() => setShowDelete(false)}
                    onSubmit={() => deleteHandler(selectedEmpId)}
                />
            )}
            <section className="list_section">
                <h1>Employee List</h1>
                <div className="list_right">
                    <span className="employee_filter">
                        <label htmlFor="">Filter By</label>
                        <select name="filter" id="" onChange={filterHandler}>
                            <option value="all">All</option>
                            <option value="Probation">Probation</option>
                            <option value="Active">Active</option>
                            <option value="InActive">In Active</option>
                        </select>
                    </span>

                    <span className="create_emp_btn">
                        <button onClick={clickHandler}>+</button>
                        <div>Create employee</div>
                    </span>
                </div>
            </section>

            <section className="list_body">
                <div className="employee_item employee_head">
                    <h4>Employee Name</h4>
                    <h4>Employee Id</h4>
                    <h4>joining date</h4>
                    <h4>Role</h4>
                    <h4>Status</h4>
                    <h4>Experience</h4>
                    <h4>Action</h4>
                </div>
                {employees.map((employee) => {
                    return (
                        <EmployeeItem
                        key={employee.id}
                            employee={employee}
                            clickHandler={() => {
                                onEmployeeClick(employee.id);
                            }}
                            deleteHandler={() => {
                                setSelectedEmpId(employee.id);
                                setShowDelete(true);
                            }}
                        />
                    );
                })}
            </section>
        </>
    );
};
