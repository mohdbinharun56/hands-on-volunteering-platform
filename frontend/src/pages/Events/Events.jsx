import { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import EventsCard from '../../components/EventsCard/EventsCard';
import { CreateAuth } from '../../components/AuthProvider/AuthProvider';

const Events = () => {
    const { user } = useContext(CreateAuth);

    const loadedEvents = useLoaderData();
    console.log(loadedEvents.data);
    const [events, setEvents] = useState([]);
    const [educationCategories, setEducationCategories] = useState([]);
    const [environmentCategories, setEnvironmentCategories] = useState([]);
    const [healthcareCategories, setHealthcareCategories] = useState([]);


    useEffect(() => {
        const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

        if (user.role === "admin") {
            setEvents(loadedEvents.data);
        } else {
            const upcomingEvents = loadedEvents.data.filter(event => event.date >= today);
            setEvents(upcomingEvents);
        }
    }, [loadedEvents.data, user.role]); 

    useEffect(() => {
        const categoryEducation = events?.filter(event => event.category === 'Education');
        console.log(categoryEducation);
        setEducationCategories(categoryEducation);
    }, [events])

    useEffect(() => {
        const categoryEnvironment = events?.filter(event => event.category === 'Environment');
        console.log(categoryEnvironment);
        setEnvironmentCategories(categoryEnvironment);
    }, [events])

    useEffect(() => {
        const categoryHealthcare = events?.filter(event => event.category === 'Healthcare');
        console.log(categoryHealthcare);
        setHealthcareCategories(categoryHealthcare);
    }, [events])

    return (
        <div className='lg:w-1/2 mx-auto'>
            <h1 className='font-bold text-xl mb-3 text-center'>Events Categories</h1>
            <Tabs>
                <TabList>
                    <Tab>Education</Tab>
                    <Tab>Environment</Tab>
                    <Tab>Healthcare</Tab>
                </TabList>


                <TabPanel>
                    {
                        educationCategories.map(education => <EventsCard key={education.id} value={education}></EventsCard>)
                    }
                </TabPanel>
                <TabPanel>
                    {
                        environmentCategories.map(environment => <EventsCard key={environment.id} value={environment}></EventsCard>)
                    }
                </TabPanel>
                <TabPanel>
                    {
                        healthcareCategories.map(healthcare => <EventsCard key={healthcare.id} value={healthcare}></EventsCard>)
                    }
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Events;