import { useEffect, useState } from "react";
import { useGetProfileQuery } from "../api/employeeApi";
import { EmployeeBox } from "../components/EmployeeDetail";
import { EmployeeDetailHeader } from "../components/EmployeeDetailHeader";
import { Loader } from "../components/Loader";
import { formFields } from "../utils/employees";
import { formatDate } from "../utils/date.utils";

export const Profile = () => {
    const [employee, setEmployee] = useState({});

    const { data, isLoading } = useGetProfileQuery();
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
    return (
        <>
            {isLoading && <Loader />}
            <EmployeeDetailHeader text="Profile" />
            <EmployeeBox employee={employee} fields={formFields} />
        </>
    );
};
