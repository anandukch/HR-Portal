/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
export const Button = ({ text, onClickHandler, className,styles }) => {
    return (
        <button className={className} data-testid="btn-test-id" onClick={onClickHandler} style={styles}>
            {text}
        </button>
    );
};

export default Button;