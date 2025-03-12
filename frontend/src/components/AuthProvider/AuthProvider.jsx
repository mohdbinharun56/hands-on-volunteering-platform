import React, { createContext, useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

export const CreateAuth = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [id, setId] = useState(null);
    const [events, setEvents] = useState([]);
    const [selectHistory,setSelectHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    // console.log("events is from provider",events.length);

    useEffect(()=>{
        fetch('http://localhost:5000/events')
        .then(res=>res.json())
        .then(data=>{
            console.log("data",data.data);
            const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
            if (user?.role === "admin") {
                setEvents(data.data);
            } else {
                const upcomingEvents = data.data.filter(event => event.date >= today);
                setEvents(upcomingEvents);
            }
        })
        .catch(error=>console.log(error))
    },[user?.role])

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


    const handleDelete = (event_id)=>{
        console.log("Delete: ",event_id,"user id is",user.id);
        // send user id and event id
        fetch(`http://localhost:5000/history/${user.id}/${event_id}`,{
            method: "DELETE",
            body: JSON.stringify({user_id:user.id,event_id})
        })
        .then(res=>{
            console.log(res)
            res.json()
        })
        .then((data)=>{
            console.log("data Delete:",data)
            const filterHistory = selectHistory?.filter(history=>history.id!==event_id);
            // console.log(filterHistory)
            setSelectHistory(filterHistory)
            toast("Delete Susccessfully!");
        })
        .catch(error=>console.log("Error to delete: ",error))

    }

    const info = {
        user,
        setId,
        loading,
        login,
        logout,
        setEvents,
        events,
        handleDelete,
        selectHistory,
        setSelectHistory
    }
    return (
        <CreateAuth.Provider value={info}>
            {children}
        </CreateAuth.Provider>
    );
};

export default AuthProvider;

