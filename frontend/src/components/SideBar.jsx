import { useNavigate } from "react-router-dom";
import IconSvg from "../assets/icon.svg";
import Logout from "../assets/logout.png";

import "../styles/createEmployee.css";
import { NavItem } from "./NavItem";
const sideBarTopItems = [
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
    {
        id: 3,
        text: "Create Department",
        icon: IconSvg,
        to: "/departments/create",
    },
];

const sideBarBottomItems = [
    {
        id: 4,
        text: "Profile",
        icon: IconSvg,
        to: "/employees/profile",
    },
    {
        id: 5,
        text: "Logout",
        icon: Logout,
        to: "/",
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
            {sideBarTopItems.map((item) => {
                // eslint-disable-next-line react/jsx-key
                return <NavItem key={item.id} icon={item.icon} text={item.text} to={item.to} />;
            })}

            <div className="side_bar_bottom">
                {sideBarBottomItems.map((item) => {
                    // eslint-disable-next-line react/jsx-key
                    return <NavItem key={item.id} to={item.to} icon={item.icon} text={item.text} onClick={item.text === "Logout" && logoutHandler} />;
                })}
            </div>
        </aside>
    );
};
