/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useNavigate, useParams } from "react-router-dom";
import "../styles/employeeDetail.css";
import { formFields } from "../utils/employees";
import EditIcon from "../assets/pencil.png";
import { useGetEmployeeQuery } from "../api/employeeApi";
import { useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { formatDate } from "../utils/date.utils";
import { EmployeeDetailHeader } from "../components/EmployeeDetailHeader";
import { EmployeeBox } from "../components/EmployeeDetail";

export const EmployeeDetail = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState({});
    const fields = formFields;
    const navigate = useNavigate();
    const { data, isLoading } = useGetEmployeeQuery(id);
    useEffect(() => {
        if (data) {
            const resData = data.data;
            setEmployee({
                id: resData.id,
                name: resData.name,
                email: resData.email,
                role: resData.role,
                status: resData.status,
                experience: resData.experience,
                department: resData.department.name,
                address: resData.address.line1,
                joiningDate: formatDate(resData.createdAt),
            });
        }
    }, [data]);

    const editClickHandler = () => {
        navigate(`/employees/edit/${id}`);
    };

    return (
        <>
            {isLoading && <Loader />}
            <EmployeeDetailHeader text="Employee Detail" onClick={editClickHandler} icon={EditIcon} />
            <EmployeeBox employee={employee} fields={fields} />
        </>
    );
};
