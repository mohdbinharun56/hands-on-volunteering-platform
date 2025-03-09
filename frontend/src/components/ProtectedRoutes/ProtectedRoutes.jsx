import { useContext } from "react";
import { CreateAuth } from "../AuthProvider/AuthProvider";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({children}) => {
    const {loading,user} = useContext(CreateAuth);
    console.log(user);
    if(loading){
        return <div className="text-7xl font-bold">Loading..</div>
    }
    if(user){
        return children;
    }
    return <Navigate to='/login'></Navigate>

};

export default ProtectedRoutes;