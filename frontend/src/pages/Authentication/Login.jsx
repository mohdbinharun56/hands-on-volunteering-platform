// import { createContext, useState } from "react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
// import useProvider from "../../components/AuthProvider/useProvider";
import { CreateAuth } from "../../components/AuthProvider/AuthProvider";


// use context api
// const authContext = createContext(null);

const Login = () => {
    const {setId,setToken,login} = useContext(CreateAuth);
    const [error,setError] = useState("");
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleLogin = (data,e) => {
        e.preventDefault();
        // console.log(data);

        // signin user call signin api from nodejs server
        login(data)
        .then(res=>res.json())
        .then(data=>{
            if(data.status===500){
                e.target.reset();
                return setError(data.error);
            }
            // console.log(data.status);
            // console.log("Token is: ",data.data.token);
            // console.log("user id is:",data.data.user.id);
            setError('');
            setId(data.data.user.id);
            setToken(data.data.token);
            e.target.reset();
            navigate('/');
        })
        .catch(error=>setError(error.message))
    }
    return (
        <div>
            <div>
                <div className="space-y-5 md:w-[600px] mx-auto md:shadow-md border border-[#ABABAB] rounded-md px-10 py-4">
                    <h1 className="text-xl md:text-4xl font-bold text-center">Login</h1>
                    <form className="space-y-10" onSubmit={handleSubmit(handleLogin)}>
                        <input type="email"
                            placeholder="Email"
                            {...register("email", { required: true })}
                            className="w-full text-base font-medium outline-none border border-black p-2 rounded-ss-xl"
                        />
                        {errors.email && <span className="text-red-500">This field is required.</span>}

                        <input type="password"
                            placeholder="Password"
                            {...register('password', { required: true })}
                            className="w-full text-base font-medium outline-none border border-black p-2 rounded-ss-xl"
                        />

                        {errors.password && <span className="text-red-500">This field is required.</span>}
                        {error && <span className="text-red-500">{error}</span>}

                        <input type="submit" value="Login" className="bg-[#00335A] text-white py-2 px-4 font-medium w-full text-base cursor-pointer hover:bg-[#063051]" />
                    </form>
                    <p className="text-center text-base font-medium mt-4">Don't have an account? Please <Link to="/register" className="text-[#063051] hover:underline">Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;