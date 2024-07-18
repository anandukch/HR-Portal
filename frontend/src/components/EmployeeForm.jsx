/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { SelectField } from "./SelectField";
import { TextField } from "./TextField";
import { useGetDepartmentListQuery } from "../api/departmentApi";

export const EmployeeForm = ({ formData, formChangeHandler, onClickHandler, edit = false }) => {
    const { data, isSuccess } = useGetDepartmentListQuery();
    const fields = [
        {
            label: "Employee Name",
            type: "text",
            name: "name",
        },
        {
            label: "Department",
            options: isSuccess ? data.data.map((department) => department.name) : [],
            name: "department",
        },
        {
            label: "Joining Date",
            type: "date",
            name: "joiningDate",
        },
        {
            label: "Employee ID",
            type: "text",
            name: "id",
        },
        {
            label: "Role",
            options: ["HR", "UI", "Full Stack", "Backend", "Tester"],
            name: "role",
        },
        {
            label: "Status",
            options: ["Active", "InActive", "Probation"],
            name: "status",
        },
        {
            label: "Experience",
            type: "number",
            name: "experience",
        },
        {
            label: "Address",
            type: "text",
            name: "address",
        },
        {
            label: "Email",
            type: "text",
            name: "email",
        },
        {
            label: "Password",
            type: "text",
            name: "password",
        },
        {
            label: "Age",
            type: "number",
            name: "age",
        },
    ];
    if (edit) {
        fields[3].disabled = true;
        fields.splice(9, 1);
    } else {
        fields.splice(3, 1);
    }
    const navigate = useNavigate();
    const onCancel = () => {
        navigate("/employees");
    };
    return (
        <>
            <form action="">
                <div className="form_item">
                    {fields.map((field) => {
                        return field.options ? (
                            <SelectField
                                key={field.name}
                                label={field.label}
                                options={field.options}
                                className="create_emp_span"
                                name={field.name}
                                onChange={formChangeHandler}
                                value={formData[field.name]}
                            />
                        ) : (
                            <TextField
                                key={field.name}
                                value={formData[field.name]}
                                name={field.name}
                                onChange={formChangeHandler}
                                label={field.label}
                                type={field.type}
                                className="create_emp_span"
                                disabled={field.disabled}
                            />
                        );
                    })}
                </div>

                <div className="btn_group">
                    <Button text="Confirm" className="btn_confirm" onClickHandler={onClickHandler} />
                    <Button text="Cancel" className="btn_cancel" onClickHandler={onCancel} />
                </div>
            </form>
        </>
    );
};
