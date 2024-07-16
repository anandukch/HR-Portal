import "../styles/homeLayout.css";
import { Outlet, useNavigate } from "react-router-dom";
import { SideBar } from "../components/SideBar";
import { Header } from "../components/Header";
import { useEffect, useReducer } from "react";
import reducer from "../reducer";
import { employeeList } from "../utils/employees";

const initialState = {
    employees: employeeList,
};
export const HomeLayout = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
        }
    }, [navigate]);
    return (
        <>
            <Header />

            <div className="home_layout">
                <SideBar />
                <main className="main_content">
                    <Outlet context={{ state, dispatch }} />
                </main>
            </div>
        </>
    );
};
