/* eslint-disable react/prop-types */
export const EmployeeDetailHeader = ({ text, onClick, icon }) => {
    return (
        <section className="list_section">
            <h1>{text}</h1>
            {icon && (
                <div className="list_right">
                    <span className="create_emp_btn edit_emp_btn">
                        <button onClick={onClick}>
                            <img src={icon} alt="" />
                        </button>
                        <div>Edit employee</div>
                    </span>
                </div>
            )}
        </section>
    );
};
