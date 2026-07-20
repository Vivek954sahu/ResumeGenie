import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login.jsx";
import Register from "../features/auth/pages/Register.jsx";
import ProtectedRoute from "../features/auth/components/ProtectedRoute.jsx";
import Home from "../features/interview/pages/Home.jsx";
import Interview from "../features/interview/pages/Interview.jsx";


export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },

    {
        path: "/register",
        element: <Register />
    },

    {
        path: "/",
        element: <ProtectedRoute><Home /></ProtectedRoute>
    },

    {
        path: "/interview",
        element: <ProtectedRoute><Interview /></ProtectedRoute>
    }
]);