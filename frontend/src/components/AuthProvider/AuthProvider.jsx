import React, { createContext, useEffect, useState } from 'react';

import Cookies from 'js-cookie';

export const CreateAuth = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [id, setId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const getUser = Cookies.get('user');
        const getToken = localStorage.getItem('token');
        // console.log(getToken);
        if (getUser && getToken) {
            const userInfo = JSON.parse(getUser);
            console.log(userInfo);
            setUser(userInfo);
            setLoading(false)
        } else {
            setLoading(false)
        }
    }, [])

    // useEffect(() => {
    //     if (id) {
    //         fetch(`http://localhost:5000/users/${id}`,{
    //             credentials: 'include'
    //         })
    //         .then(res=>res.json())
    //         .then(data=>{
    //             console.log(data.data)
    //             setUser(data.data);
    //         })
    //     }
    //     setLoading(false)
    // }, [])

    const login = async (data) => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/users/signin-user', {
                method: "POST",
                credentials: "include",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await response.json();

            if (response.ok) {
                // setUser(data)
                // console.log(result.data.user);
                // console.log(result.data.token);

                Cookies.set('user',JSON.stringify(result.data.user));
                localStorage.setItem('token',result.data.token);

                setUser(result.data.user);
                setId(result.data.user.id);

            } else {
                console.log("Error", result.error);
            }
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }

    }

    const logout = () => {
        setLoading(true);
        setUser(null);
        setId(null);
        localStorage.removeItem('token');
        Cookies.remove('user');
    }

    const info = {
        user,
        setId,
        loading,
        login,
        logout
    }
    return (
        <CreateAuth.Provider value={info}>
            {children}
        </CreateAuth.Provider>
    );
};

export default AuthProvider;

