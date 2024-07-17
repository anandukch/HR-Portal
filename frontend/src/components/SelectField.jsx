import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
export const SelectField = ({ name, label, options, value, className, onChange }) => {
    const [selectField, setSelectField] = useState();
    useEffect(() => {
        setSelectField(() => value);
    }, [value]);
    const changeHandler = (e) => {
        setSelectField(e.target.value);
        onChange(e);
    };
    return (
        <span className={className}>
            <label htmlFor={name}>{label}</label>
            <select name={name} onChange={changeHandler} value={selectField}>
                <option value="">Choose {label}</option>

                {options.map((option, i) => {
                    return (
                        // eslint-disable-next-line react/jsx-key
                        <option key={i} value={option}>
                            {option}
                        </option>
                    );
                })}
            </select>
        </span>
    );
};
