import { useNavigate } from "react-router-dom";
import IconSvg from "../assets/icon.svg";
import Logout from "../assets/logout.png";

import "../styles/createEmployee.css";
import { NavItem } from "./NavItem";
const sideBarItems = [
    {
        id: 1,
        text: "Employee List",
        icon: IconSvg,
        to: "/employees",
    },
    {
        id: 2,
        text: "Employee Create",
        icon: IconSvg,
        to: "/employees/create",
    },
];

export const SideBar = () => {
    const navigate = useNavigate();
    const logoutHandler = () => {
        localStorage.removeItem("token");
        navigate("/");
    };
    return (
        <aside className="side_bar">
            {sideBarItems.map((item) => {
                // eslint-disable-next-line react/jsx-key
                return <NavItem key={item.id} icon={item.icon} text={item.text} to={item.to} />;
            })}

            <div className="layout_link logout" onClick={logoutHandler}>
                <nav>
                    <img src={Logout} alt="logout" />
                    <p>Logout</p>
                </nav>
            </div>
        </aside>
    );
};
