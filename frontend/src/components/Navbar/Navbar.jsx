import { useContext } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { CreateAuth } from "../AuthProvider/AuthProvider";
// import { CiMenuBurger } from "react-icons/ci";

const Navbar = () => {
    const context = useContext(CreateAuth);
    // const navMenuRef = useRef();
    if (!context) {
        return null;
    }
    const { logout, user } = context;

    const navLinks = <>
        <li className=" "><NavLink to='/'>Home</NavLink></li>
        <li className=""><NavLink to='/profiles'>Profile</NavLink></li>
        <li className=""><NavLink to='/events'>Events</NavLink></li>
        {
            user?.role === 'admin' && <li className="">
                <NavLink to='/addevents'>Event Create</NavLink>
            </li>
        }
        {
            user?.role === 'volunteer' && <li className="">
                <NavLink to={`/history/${user?.id}`}>History</NavLink>
            </li>
        }
    </>

    const navigate = useNavigate();
    const handleLogOut = () => {
        logout();
        navigate('/');
        window.location.reload();
    }
    const location = useLocation();
    const homeNav = ["/"];
    const showNav = homeNav.includes(location.pathname);

    return (
        <div>
            <div>
                {
                    showNav ?
                        <div className="navbar bg-base-100 shadow-sm">
                            <div className="navbar-start">
                                <div className="dropdown">
                                    <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                        {navLinks}
                                    </ul>
                                </div>
                                <Link to='/' className="font-semibold italic md:text-xl hover:bg-slate-300">Volunteer Platform</Link>
                            </div>
                            <div className="navbar-center hidden md:flex">
                                <ul className="menu menu-horizontal px-1">
                                    {navLinks}
                                </ul>
                            </div>
                            <div className="navbar-end">
                                {
                                    user ?
                                        <button className="btn btn-error" onClick={() => handleLogOut()}>Logout</button> :
                                        <div>
                                            <Link to='/login'><button className="btn btn-accent mr-5 font-bold">Login</button></Link>
                                            <Link to='/register'><button className="btn btn-primary ml-5 font-bold">Register</button></Link>
                                        </div>
                                }
                            </div>
                        </div>
                        :
                        <div className="flex lg:flex-col justify-between items-center">
                            <div className="flex lg:flex-col items-center gap-3">
                                <div className="dropdown">
                                    <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                        {navLinks}
                                    </ul>
                                </div>
                                <div className="">
                                    <Link to='/' className="font-semibold italic md:text-xl hover:bg-slate-300">Volunteer Platform</Link>
                                </div>
                            </div>

                            <div className="navbar-center hidden md:flex lg:flex-col lg:mt-10">
                                <ul className="flex lg:flex-col justify-between items-center gap-10">
                                    {navLinks}
                                </ul>
                            </div>
                            <button className="btn btn-error lg:w-full lg:mt-10" onClick={() => handleLogOut()}>Logout</button>
                        </div>
                }
            </div>

        </div>
    );
};

export default Navbar;