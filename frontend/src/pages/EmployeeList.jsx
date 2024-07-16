/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useNavigate } from "react-router-dom";
import { EmployeeItem } from "../components/EmployeeItem";
import "../styles/employeeList.css";
import { useEffect, useState } from "react";
import { DeletePopUp } from "../components/DeletePopUp";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee, addFilter, deleteEmployee } from "../store/employeeReducer";

export const EmployeeList = () => {
    // const { state, dispatch } = useOutletContext();

    const state = useSelector((state) => state.employee);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [employees, setEmployees] = useState(state.employees);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedEmpId, setSelectedEmpId] = useState(null);
    // console.log(state.employees);

    useEffect(() => {
        const filterEmployees = state.filterBy == "all" ? state.employees : state.employees.filter((employee) => employee.status === state.filterBy);
        setEmployees(filterEmployees);
    }, [state.employees, state.filterBy]);

    const clickHandler = () => {
        navigate("/employees/create");
    };

    const filterHandler = (e) => {
        dispatch(addFilter(e.target.value));
        // if (e.target.value === "all") {
        //     // dispatch({ type: "ALL_EMPLOYEE" });
        //     setEmployees(state.employees);
        // } else {
        //     // setEmployees(employeeList.filter((employee) => employee.status === e.target.value));
        //     // dispatch({ type: "FILTER_EMPLOYEE", payload: e.target.value });
        //     setEmployees(state.employees.filter((employee) => employee.status === e.target.value));
        // }
    };

    const deleteHandler = (id) => {
        // employeeList.forEach((employee, i) => {
        //     if (employee.id == id) employeeList.splice(i, 1);
        // });
        // setEmployees(employees.filter((employee) => employee.id != id));
        // dispatch({ type: "DELETE_EMPLOYEE", payload: id });
        dispatch(deleteEmployee(id));
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
                            <option value="InActive">InActive</option>
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
                {state.employees &&
                    employees.map((employee) => {
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
