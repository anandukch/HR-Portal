import { useEffect, useState } from "react";
import { useGetProfileQuery, useResetPasswordMutation } from "../api/employeeApi";
import { EmployeeBox } from "../components/EmployeeDetail";
import { EmployeeDetailHeader } from "../components/EmployeeDetailHeader";
import { Loader } from "../components/Loader";
import { formFields } from "../utils/employees";
import { formatDate } from "../utils/date.utils";
import "../styles/profile.css";
import Button from "../components/Button";
import { Toast } from "../components/Toast";

export const Profile = () => {
    const [employee, setEmployee] = useState({});
    const [password, setPassword] = useState({
        currentPassord: "",
        newPassword: "",
    });

    const [resetPassword, { isLoading: resetPassordLoading, isSuccess, isError }] = useResetPasswordMutation();

    const onPasswordChange = (e) => {
        setPassword((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const onPasswordSubmit = () => {
        resetPassword(password);
        setPassword({
            currwntPassord: "",
            newPassword: "",
        });
    };

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
            {(isLoading || resetPassordLoading) && <Loader />}
            {isError && <Toast message="Password Reset Failed" type={"error"} />}
            {isSuccess && <Toast message="Password Reset Successfull" type={"success"} />}

            
            <EmployeeDetailHeader text="Profile" />
            <EmployeeBox employee={employee} fields={formFields} />

            <div className="password_reset_container">
                <div className="password_field">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input type="text" name="currentPassword" onChange={onPasswordChange} />
                </div>

                <div className="password_field">
                    <label htmlFor="newPassord">New Password</label>
                    <input type="text" name="newPassword" onChange={onPasswordChange} />
                </div>

                <Button className="password_field_button" text="Reset Password" onClickHandler={onPasswordSubmit} />
            </div>
        </>
    );
};
