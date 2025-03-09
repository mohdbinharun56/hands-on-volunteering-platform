import { useContext } from "react";
import { CreateAuth } from "../../components/AuthProvider/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
    const {logout,user} = useContext(CreateAuth);
    const navigate = useNavigate();
    const handleLogOut = ()=>{
        logout();
        navigate('/login');
    }
    return (
        <>
            {
                user ? <div>
                <h1 className="text-5xl text-center">Welcome to Volunteers Platform</h1>
                <button className="btn btn-error" onClick={handleLogOut}>Logout</button>
            </div> : <Navigate to='/login'></Navigate>
            }
        </>
    );
};

export default Home;