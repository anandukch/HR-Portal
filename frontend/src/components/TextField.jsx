/* eslint-disable no-unused-vars */
import React from "react";
import { forwardRef } from "react";

/* eslint-disable react/prop-types */
// eslint-disable-next-line react/display-name
export const TextField = forwardRef(({ name, label, type, className, value, onChange = () => {}, error = "", disabled }, ref) => {
    return (
        <span className={className} data-testid="text-field-test-id">
            <label htmlFor={name} data-testid="label-test-id">
                {label}
            </label>
            <input
                data-testid="input-test-id"
                ref={ref}
                name={name}
                disabled={disabled}
                type={type}
                placeholder={label}
                value={value}
                onChange={onChange}
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
                {error}
            </span>
        </span>
    );
});
