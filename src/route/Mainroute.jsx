import { createBrowserRouter } from "react-router-dom";
// Layout imports
import MainLayout from "../Layout/MainLayout";
import AuthLayout from "../Layout/AuthLayout";

// Page imports
import Dashbaord from "../pages/Dashbaord";
import Login from "../pages/Login";
import ErrorPage from "../error-page";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import Schools from "../pages/Schools";
import Subscriptions from "../pages/Subscriptions";

// Authentication Routes 
import AuthRoutes from "../utils/AuthRoutes";
import Donations from "../pages/Donations";
import Class from "../pages/Class";
import Year from "../pages/Year";
import Wallet from "../pages/Wallet";
import Alumini from "../pages/Alumini";
import Session from "../pages/Session";



const routes = createBrowserRouter([
    {
        path :"/provider",
        element: < AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path:'/provider/login',
                element:<Login/>
            },
        ],
    },
    {
        path :"/school",
        element: < AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path:'/school/login',
                element:<Login/>
            },
        ],
    },
    {
        path :"/alumini",
        element: < AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path:'/alumini/login',
                element:<Login/>
            },
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
                path:'/schools',
                element:<Schools/>
            },
            {
                path:'/session',
                element:<Session/>
            },
            {
                path:'/alum',
                element:<Alumini/>
            },
            {
                path:'/subscription',
                element:<Subscriptions/>
            },
            {
                path:'/donations',
                element:<Donations/>
            },
            {
                path:'/wallet',
                element:<Wallet/>
            },
            {
                path:'/class',
                element:<Class/>
            },
            {
                path:'/year',
                element:<Year/>
            },
            {
                path:'/profile',
                element:<Profile/>
            }
        ],
    },
    {
        path:'/school',
        children: [
            {
                path:'/school/register',
                element:<Register/>
            },
        ]
    },
]);

export default routes  ;