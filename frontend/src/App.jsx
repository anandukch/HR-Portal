import { Login } from "./pages/Login";
import { CreateEmployee } from "./pages/Create";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { HomeLayout } from "./layouts/HomeLayout";
import { EmployeeList } from "./pages/EmployeeList";
import { EditEmployee } from "./pages/EditEmployee";
import { EmployeeDetail } from "./pages/EmployeeDetails";
import { Provider } from "react-redux";
import store from "./store/store";
import { Profile } from "./pages/Profile";

const App = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Login />,
            errorElement: <NotFound />,
        },
        {
            path: "/employees",
            element: <HomeLayout />,
            children: [
                { index: true, element: <EmployeeList /> },

                {
                    path: "create",
                    element: <CreateEmployee />,
                },
                {
                    path: "edit/:id",
                    element: <EditEmployee />,
                },
                {
                    path: ":id",
                    element: <EmployeeDetail />,
                },
                {
                    path: "profile",
                    element: <Profile />,
                },
            ],
        },
    ]);

    return (
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    );
};

export default App;
