/* eslint-disable react/prop-types */
import { Button } from "./Button";
import { SelectField } from "./SelectField";
import { TextField } from "./TextField";

export const EmployeeForm = ({ formData, formChangeHandler, onClickHandler, edit = false }) => {
    const fields = [
        {
            label: "Employee Name",
            type: "text",
            name: "name",
        },
        {
            label: "Department",
            options: ["Software", "Testing", "HR"],
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
            options: ["HR", "UI", "Full Stack", "Backend"],
            name: "role",
        },
        {
            label: "Status",
            options: ["Active", "Inactive", "Probation"],
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
    ];
    if (edit) {
        fields[3].disabled = true;
    } else {
        // const index = fields.findIndex((field) => field.name === "id");

        fields.splice(3, 1);
    }
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
                    <Button text="Cancel" className="btn_cancel" />
                </div>
            </form>
        </>
    );
};
