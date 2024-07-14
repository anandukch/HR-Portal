import "../styles/homeLayout.css";
import { Outlet, useNavigate } from "react-router-dom";
import { SideBar } from "../components/SideBar";
import { Header } from "../components/Header";
import { useEffect } from "react";
export const HomeLayout = () => {
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
                    <Outlet />
                </main>
            </div>
        </>
    );
};
