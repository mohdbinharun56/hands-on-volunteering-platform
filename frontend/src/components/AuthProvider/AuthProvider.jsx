import React, { createContext, useEffect, useState } from 'react';


export const CreateAuth = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [id, setId] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    console.log("Id is",id);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5000/users/${id}`, {
                method: "GET",
                credentials: "include",
                headers: { 'content-type': 'application/json' }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data.data)
                setUser(data.data);
                setLoading(false);
            })
            .catch(error => { 
                console.log("Error while set user", error.message) 
                setLoading(false);
            })
        }else{
            setLoading(false);
        }
    }, [id])

    const login = (data) => {
        setLoading(true);
        return fetch('http://localhost:5000/users/signin-user', {
            method: "POST",
            credentials: "include",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        })
    }
    const info = {
        user,
        // setUser,
        setToken,
        setId,
        loading,
        login
    }
    return (
        <CreateAuth.Provider value={info}>
            {children}
        </CreateAuth.Provider>
    );
};

export default AuthProvider;

