import { forwardRef } from "react";

/* eslint-disable react/prop-types */
// eslint-disable-next-line react/display-name
export const TextField = forwardRef(({ name, label, type, className, value, onChange = () => {}, error = "", disabled }, ref) => {
    return (
        <span className={className}>
            <label htmlFor={name}>{label}</label>
            <input
                ref={ref}
                name={name}
                disabled={disabled}
                type={type}
                placeholder={label}
                value={value}
                onChange={onChange}
                min={0}
                max={10}
                style={
                    error != ""
                        ? {
                              border: "1px solid red",
                              color: "red",
                          }
                        : {}
                }
            />
            <span
                style={{
                    color: "red",
                }}
            >
                {" "}
                {error}
            </span>
        </span>
    );
});
