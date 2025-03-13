import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Authentication/Login";
import Home from "../pages/Home/Home";
import Signup from "../pages/Authentication/Signup";
import ProtectedRoutes from "../components/ProtectedRoutes/ProtectedRoutes";
import Profile from "../pages/Profile/Profile";
import CreateEvents from "../pages/Events/CreateEvents";
import Events from "../pages/Events/Events";
import VolunteerHistory from "../pages/VlunteerHistory/VolunteerHistory";
import HelpPosts from "../pages/HelpPosts/HelpPosts";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App></App>,
        children: [
            {
                path: '/',
                element: (
                    <Home></Home>
                ),
                loader: ()=> fetch('http://localhost:5000/posts')
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
                        <Events style='w-1/2'></Events>
                    </ProtectedRoutes>
                ),
                loader: ()=> fetch('http://localhost:5000/events')
            },
            {
                path: '/history/:id',
                element:(<ProtectedRoutes>
                    <VolunteerHistory></VolunteerHistory>
                </ProtectedRoutes>),
                loader: ({params})=>fetch(`http://localhost:5000/history/${params.id}`)
            },
            {
                path: '/help-posts',
                element:(<ProtectedRoutes>
                    <HelpPosts></HelpPosts>
                </ProtectedRoutes>),
            }
        ]
    }
]);

export default router;