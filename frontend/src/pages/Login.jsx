import "../styles/login.css";
import LoginPic from "../assets/kv-login.jpeg";
import KvLogo from "../assets/kv-logo.png";
import { TextField } from "../components/TextField";
import { Button } from "../components/Button";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../api/loginApi";
import { Toast } from "../components/Toast";

// eslint-disable-next-line react/prop-types
export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState(false);
    const userNameRef = useRef();
    const navigate = useNavigate();
    const [login, { isSuccess, data, isError, error }] = useLoginMutation();

    useEffect(() => {
        if (isSuccess && data.data.token) {
            localStorage.setItem("token", data.data.token);
            navigate("/employees");
        }

        // if (isError) {
        //     alert(error.data.message);
        // }
    }, [isSuccess, data, navigate, error, isError]);

    const onUsernameChange = (e) => {
        const text = e.target.value;
        if (text.length > 100) {
            setErr(true);
        } else {
            setErr(false);
            setUsername(text);
        }
    };

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };

    useEffect(() => {
        userNameRef.current.focus();
    }, [login]);

    const handleLogin = (e) => {
        e.preventDefault();
        login({ email: username, password });
    };

    return (
        <main className="login_main">
            {isError && <Toast message={error.data.message} type={"error"}/>}
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
                        error={err && "Username should be less then 10 characters"}
                    />
                    <TextField label="Password" type="password" onChange={onPasswordChange} />

                    <Button text="Login In" onClickHandler={handleLogin} />
                </form>
            </div>
        </main>
    );
};
