/* eslint-disable react/prop-types */
import "../styles/deleteEmp.css";
import { Button } from "./Button";
export const DeletePopUp = ({ title, description, onSubmit, onCancel }) => {
    return (
        <div className="delete_container">
            <div className="delete_box">
                <div className="top_cancel_icon">
                    <span onClick={onCancel}>X</span>
                </div>
                <h4 className="title">{title}</h4>
                <div className="description">{description}</div>
                <div className="btn_grp">
                    <Button text={"Submit"} className={"confirm"} onClickHandler={onSubmit} />
                    <Button text={"Cancel"} className={"cancel"} onClickHandler={onCancel} />
                </div>
            </div>
        </div>
    );
};
