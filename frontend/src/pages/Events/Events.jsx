import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import EventsCard from '../../components/EventsCard/EventsCard';

const Events = () => {
    const loadedEvents = useLoaderData();
    console.log(loadedEvents.data);
    const [events, setEvents] = useState(loadedEvents.data);
    const [educationCategories, setEducationCategories] = useState([]);
    const [environmentCategories, setEnvironmentCategories] = useState([]);
    const [healthcareCategories, setHealthcareCategories] = useState([]);

    useEffect(() => {
        const categoryEducation = events?.filter(event => event.category === 'Education');
        console.log(categoryEducation);
        setEducationCategories(categoryEducation);
    }, [])

    useEffect(() => {
        const categoryEnvironment = events?.filter(event => event.category === 'Environment');
        console.log(categoryEnvironment);
        setEnvironmentCategories(categoryEnvironment);
    }, [])

    useEffect(() => {
        const categoryHealthcare = events?.filter(event => event.category === 'Healthcare');
        console.log(categoryHealthcare);
        setHealthcareCategories(categoryHealthcare);
    }, [])

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