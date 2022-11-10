import { createBrowserRouter } from "react-router-dom";
// Layout imports
import MainLayout from "../Layout/MainLayout";
import AuthLayout from "../Layout/AuthLayout";

// Page imports
import Dashbaord from "../pages/Dashbaord";
import Login from "../pages/Login";
import ErrorPage from "../error-page";

// Authentication Routes 
import AuthRoutes from "../utils/AuthRoutes";
import Profile from "../pages/Profile";

const routes = createBrowserRouter([
    {
        path :"/login",
        element: < AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path:'/login',
                element:<Login/>
            }
        ],
    },
    {
        path :"/",
        element: < MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path:'/dashboard',
                element:<Dashbaord/>
            },
            {
                path:'/profile',
                element:<Profile/>
            }
        ],
    },
]);

export default routes  ;