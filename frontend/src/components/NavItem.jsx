import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const NavItem = ({ to, icon, text, className = "layout_link" }) => {
    return (
        <Link to={to} className={className}>
            <nav>
                {icon && <img src={icon} alt="" />}
                <p>{text}</p>
            </nav>
        </Link>
    );
};
