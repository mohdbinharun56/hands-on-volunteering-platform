import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Authentication/Login";
import Home from "../pages/Home/Home";
import Signup from "../pages/Authentication/Signup";
import ProtectedRoutes from "../components/ProtectedRoutes/ProtectedRoutes";
import Profile from "../pages/Profile/Profile";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App></App>,
        children: [
            {
                path: '/',
                element: (<ProtectedRoutes>
                    <Home></Home>
                </ProtectedRoutes>)
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Signup></Signup>
            },
            {
                path: '/profiles',
                element: (<ProtectedRoutes>
                    <Profile></Profile>
                </ProtectedRoutes>)
            }
        ]
    }
]);

export default router;