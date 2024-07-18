import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const NavItem = ({ to, icon, text, className = "layout_link", onClick = () => {} }) => {
    return (
        <Link to={to} className={className} onClick={onClick}>
            <nav>
                {icon && <img src={icon} alt="" />}
                <p>{text}</p>
            </nav>
        </Link>
    );
};
