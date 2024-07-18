/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "../styles/toast.css";
export const Toast = ({ message, type, showError = () => {} }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            showError && showError(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [showError]);

    if (!visible) return null;

    let className = "toast";
    if (type === "error") {
        className += " error";
    }else if (type === "success") {
        className += " success";
    }
    return (
        <div className={className}>
            <p>{message}</p>
        </div>
    );
};
