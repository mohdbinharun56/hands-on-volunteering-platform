import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Authentication/Login";
import Home from "../pages/Home/Home";
import Signup from "../pages/Authentication/Signup";
import ProtectedRoutes from "../components/ProtectedRoutes/ProtectedRoutes";
import Profile from "../pages/Profile/Profile";
import CreateEvents from "../pages/Events/CreateEvents";
import Events from "../pages/Events/Events";

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
            },
            {
                path: '/addevents',
                element: (<ProtectedRoutes>
                    <CreateEvents></CreateEvents>
                </ProtectedRoutes>)

            },
            {
                path: '/events',
                element:(
                    <ProtectedRoutes>
                        <Events></Events>
                    </ProtectedRoutes>
                ),
                loader: ()=> fetch('http://localhost:5000/events')
            }
        ]
    }
]);

export default router;