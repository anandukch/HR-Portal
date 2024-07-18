/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useNavigate } from "react-router-dom";
import { EmployeeItem } from "../components/EmployeeItem";
import "../styles/employeeList.css";
import { useEffect, useState } from "react";
import { DeletePopUp } from "../components/DeletePopUp";
import { useDispatch, useSelector } from "react-redux";
import { addFilter } from "../store/employeeReducer";
import { useDeleteEmployeeMutation, useGetEmployeeListQuery } from "../api/employeeApi";
import { Loader } from "../components/Loader";
import { formatDate } from "../utils/date.utils";

export const EmployeeList = () => {
    const state = useSelector((state) => state.employee);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedEmpId, setSelectedEmpId] = useState(null);
    const [list, setList] = useState([]);

    const [deleteEmployee] = useDeleteEmployeeMutation();

    const { data = [], isSuccess, isLoading } = useGetEmployeeListQuery();

    useEffect(() => {
        if (isSuccess) {
            const employees = data.data.map((employee) => ({
                ...employee,
                joiningDate: formatDate(employee.createdAt),
            }));
            setList(employees);
            setEmployees(employees);
        }
    }, [data, isSuccess]);

    useEffect(() => {
        const filterEmployees = state.filterBy == "all" ? list : list.filter((employee) => employee.status === state.filterBy);
        setEmployees(filterEmployees);
    }, [list, state.filterBy]);

    const clickHandler = () => {
        navigate("/employees/create");
    };

    const filterHandler = (e) => {
        dispatch(addFilter(e.target.value));
    };

    const deleteHandler = (id) => {
        // dispatch(deleteEmployee(id));
        deleteEmployee(id);
        setShowDelete(false);
    };

    const onEmployeeClick = (id) => {
        navigate(`/employees/${id}`);
    };

    return (
        <>
            {isLoading && <Loader />}
            <section className="list_section">
                <h1>Employee List</h1>
                <div className="list_right">
                    <span className="employee_filter">
                        <label htmlFor="">Filter By</label>
                        <select name="filter" id="" onChange={filterHandler} value={state.filterBy}>
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

            {showDelete && (
                <DeletePopUp
                    title={"Are you sure?"}
                    description={"Do you want to delete employee?"}
                    onCancel={() => setShowDelete(false)}
                    onSubmit={() => deleteHandler(selectedEmpId)}
                />
            )}
        </>
    );
};
