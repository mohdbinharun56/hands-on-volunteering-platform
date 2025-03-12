import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { CreateAuth } from "../../components/AuthProvider/AuthProvider";
import EventsCard from "../../components/EventsCard/EventsCard";

const VolunteerHistory = () => {
    const {events,setSelectHistory,selectHistory} = useContext(CreateAuth);
    

    const historyData = useLoaderData();
    console.log(historyData.data); // attendees id 

    useEffect(()=>{
        const filter = events?.filter(event => historyData?.data?.some(history => event.id === history.event_id));
        console.log(filter);
        setSelectHistory(filter)
    },[events])



    

    return (
        <div className="lg:w-1/2 mx-auto">
            <h1 className="font-bold text-center text-3xl">History</h1>
            {
                selectHistory?.map(history=><EventsCard key={history.id} value={history}></EventsCard>)
            }
        </div>
    );
};

export default VolunteerHistory;