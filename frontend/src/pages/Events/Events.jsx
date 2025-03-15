import { useContext, useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import EventsCard from '../../components/EventsCard/EventsCard';
import { CreateAuth } from '../../components/AuthProvider/AuthProvider';
import { toast } from 'react-toastify';

const Events = ({ style }) => {
    const { user, events, setEvents } = useContext(CreateAuth);
    const refClose = useRef();
    const loadedEvents = useLoaderData();

    const [educationCategories, setEducationCategories] = useState([]);
    const [environmentCategories, setEnvironmentCategories] = useState([]);
    const [healthcareCategories, setHealthcareCategories] = useState([]);
    const [eventValue, setEventValue] = useState(null);


    // set events comparing with user role [admin can view all events but volunteer only view upcomming events]
    useEffect(() => {
        const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
        setEvents(loadedEvents.data);
        if (user?.role === "admin") {
            setEvents(loadedEvents.data);
        } else {
            const upcomingEvents = loadedEvents.data.filter(event => event.date >= today);
            setEvents(upcomingEvents);
        }
    }, [loadedEvents.data, user?.role]);

    // set all categories 
    useEffect(() => {
        if (events.length > 0) {
            const categoryEducation = events?.filter(event => event.category === 'Education');
            const categoryEnvironment = events?.filter(event => event.category === 'Environment');
            const categoryHealthcare = events?.filter(event => event.category === 'Healthcare');
            console.log(categoryEducation);
            setEducationCategories(categoryEducation);
            setEnvironmentCategories(categoryEnvironment);
            setHealthcareCategories(categoryHealthcare);
        }
    }, [events])

    const openModal = (newEventValue) => {
        console.log(eventValue);
        if (eventValue === newEventValue) {
            document.getElementById('dynamic_modal').showModal()
            return
        }

        setEventValue(newEventValue);
    }

    useEffect(() => {
        if (eventValue) {
            document.getElementById('dynamic_modal').showModal()
        }
    }, [eventValue])

    // Register Events handler
    const handleRegisterEvents = (e, id) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const event_id = id;
        const user_id = user?.id;

        console.log(name, email, event_id, user_id);

        // added into attandee list
        fetch('http://localhost:5000/attendees', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ user_id, event_id })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (!data.data) {
                    toast(data.message);
                    refClose.current.click();
                    return
                }
                toast("Register The Events");
                refClose.current.click();
            })
            .catch(error => console.log("ERROR while inserting Attendees", error))
    }

    return (
        <div className={`lg:${style} mx-auto mt-10`}>
            <h1 className='font-bold text-xl mb-3 text-center'>Events Categories</h1>
            <Tabs>
                <TabList>
                    <Tab>Education</Tab>
                    <Tab>Environment</Tab>
                    <Tab>Healthcare</Tab>
                </TabList>

                <TabPanel>
                    {
                        educationCategories.map(education => <EventsCard key={education.id} value={education} openModal={openModal}></EventsCard>)
                    }
                </TabPanel>
                <TabPanel>
                    {
                        environmentCategories.map(environment => <EventsCard key={environment.id} value={environment} openModal={openModal}></EventsCard>)
                    }
                </TabPanel>
                <TabPanel>
                    {
                        healthcareCategories.map(healthcare => <EventsCard key={healthcare.id} value={healthcare} openModal={openModal}></EventsCard>)
                    }
                </TabPanel>
            </Tabs>

            <dialog id="dynamic_modal" className="modal modal-bottom sm:modal-middle">
                {
                    eventValue && <div className="modal-box">
                        <h3 className="font-bold text-lg">Register For {eventValue?.title}</h3>
                        <form className="mt-2 space-y-2" onSubmit={(e) => handleRegisterEvents(e, eventValue?.id)}>
                            <label htmlFor="name">Name</label>
                            <input type="text" defaultValue={user?.name} name="name" required className="outline-none border border-slate-300 p-1  w-full rounded-md" />
                            <label htmlFor="name">Email</label>
                            <input type="email" defaultValue={user?.email} name="email" className="outline-none border border-slate-300 p-1  w-full rounded-md" />
                            <input type="submit" value="Register" className="w-full btn btn-secondary" />
                        </form>

                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button ref={refClose} className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                }
            </dialog>
        </div >
    );
};

export default Events;