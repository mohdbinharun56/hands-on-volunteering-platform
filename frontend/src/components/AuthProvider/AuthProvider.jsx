import React, { createContext, useEffect, useRef, useState } from 'react';

import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export const CreateAuth = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [id, setId] = useState(null);
    const [events, setEvents] = useState([]);
    const [selectHistory, setSelectHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    const refClose = useRef();
    useEffect(() => {
        fetch('http://localhost:5000/events')
            .then(res => res.json())
            .then(data => {
                console.log("data", data.data);
                const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
                if (user?.role === "admin") {
                    setEvents(data.data);
                } else {
                    const upcomingEvents = data.data.filter(event => event.date >= today);
                    setEvents(upcomingEvents);
                }
            })
            .catch(error => console.log(error))
    }, [user?.role])

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
                Cookies.set('user', JSON.stringify(result.data.user));
                localStorage.setItem('token', result.data.token);

                setUser(result.data.user);
                setId(result.data.user.id);

            } else {
                console.log("Error", result.error);
            }
        } catch (error) {
            console.log(error);
        } finally {
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


    const handleDelete = (name,event_id) => {
         // send user id and event id
        console.log("Delete: ", event_id, "user id is", user.id);
        // use sweet alert for delete
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                {
                    name === 'history' ?fetch(`http://localhost:5000/history/${user.id}/${event_id}`, {
                        method: "DELETE",
                        body: JSON.stringify({ user_id: user.id, event_id })
                    })
                        .then(res => {
                            console.log(res)
                            res.json()
                        })
                        .then((data) => {
                            console.log("data Delete:", data)
                            const filterHistory = selectHistory?.filter(history => history.id !== event_id);
                            // console.log(filterHistory)
                            setSelectHistory(filterHistory)
                            toast("Delete Susccessfully!");
                        })
                        .catch(error => console.log("Error to delete: ", error)):
                        fetch(`http://localhost:5000/events/${event_id}`, {
                            method: "DELETE",
                            body: JSON.stringify({ event_id })
                        })
                            .then(res => {
                                console.log(res)
                                res.json()
                            })
                            .then((data) => {
                                console.log("data Delete:", data)
                                const filterEvent = events?.filter(event => event.id !== event_id);
                                // console.log(filterHistory)
                                setEvents(filterEvent)
                                toast("Delete Susccessfully!");
                            })
                            .catch(error => console.log("Error to delete: ", error))

                }
            }
        });

    }

    const info = {
        user,
        setUser,
        setId,
        loading,
        setLoading,
        login,
        logout,
        setEvents,
        events,
        handleDelete,
        selectHistory,
        setSelectHistory,
        refClose
    }
    return (
        <CreateAuth.Provider value={info}>
            {children}
        </CreateAuth.Provider>
    );
};

export default AuthProvider;

