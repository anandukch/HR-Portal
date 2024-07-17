import { Link } from "react-router-dom";
import KvLogo from "../assets/kv-logo.png";
import Profile from "../assets/profile.png";

export const Header = () => {
    return (
        <header className="home_header">
            <div className="header_container">
                <img className="logo" src={KvLogo} alt="key value" />
                <div>
                    <Link to="/employees/profile" className="logout">
                        <img className="profile" src={Profile} alt="profile" />
                    </Link>
                </div>
            </div>
        </header>
    );
};
