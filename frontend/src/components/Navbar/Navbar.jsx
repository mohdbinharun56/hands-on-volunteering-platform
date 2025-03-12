import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CreateAuth } from "../AuthProvider/AuthProvider";

const Navbar = () => {
    const { logout, user } = useContext(CreateAuth);
    const navigate = useNavigate();
    const handleLogOut = () => {
        logout();
        navigate('/login');
    }
    return (
        <div className="">
            <h1>navbar</h1>
            <div >
                <ul className="space-y-5 w-fit mx-auto">
                    <li className="border border-orange-400 "><NavLink to='/'>Home</NavLink></li>
                    <li className="border border-orange-400"><NavLink to='/profiles'>Profile</NavLink></li>
                    <li className="border border-orange-400"><NavLink to='/events'>Events</NavLink></li>
                    {
                        user?.role === 'admin' && <li className="border border-orange-400">
                            <NavLink to='/addevents'>Event Create</NavLink>
                        </li>
                    }
                    {
                        user?.role === 'volunteer' && <li className="border border-orange-400">
                        <NavLink to='/history'>History</NavLink>
                    </li>
                    }

                </ul>
            </div>
            <button className="btn btn-error w-full mt-10" onClick={handleLogOut}>Logout</button>
        </div>
    );
};

export default Navbar;