import "../styles/login.css";
import LoginPic from "../assets/kv-login.jpeg";
import KvLogo from "../assets/kv-logo.png";
import { TextField } from "../components/TextField";
import { Button } from "../components/Button";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const Login = () => {
    const [username, setUsername] = useState("");
    const [error, setError] = useState(false);
    const userNameRef = useRef();
    const navigate = useNavigate();
    const onUsernameChange = (e) => {
        const text = e.target.value;
        if (text.length > 10) {
            setError(true);
        } else {
            setError(false);
            setUsername(text);
        }
    };

    useEffect(() => {
        userNameRef.current.focus();
    }, []);

    const handleLogin = () => {
        localStorage.setItem("token", true);
        navigate("/employees");
    };
    return (
        <main className="login_main">
            <div className="hero">
                <div className="wrapper-hero">
                    <img src={LoginPic} alt="Login Image" className="login-image" />
                </div>
            </div>

            <div className="login">
                <form action="">
                    <img src={KvLogo} alt="Logo" className="logo" />
                    <TextField
                        ref={userNameRef}
                        label="Username"
                        type="text"
                        onChange={onUsernameChange}
                        value={username}
                        error={error && "Username should be less then 10 characters"}
                    />
                    <TextField label="Password" type="password" />

                    <Button text="Login In" onClickHandler={handleLogin} />
                </form>
            </div>
        </main>
    );
};
