import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { CreateAuth } from "../../components/AuthProvider/AuthProvider";
import EventsCard from "../../components/EventsCard/EventsCard";

const VolunteerHistory = () => {
    const {events} = useContext(CreateAuth);
    const [selectHistory,setSelectHistory] = useState([]);

    const historyData = useLoaderData();
    // console.log(historyData.data);

    useEffect(()=>{
        // const filter = historyData.data?.map(historyData=>events.find(event=>event.id===historyData.event_id)); 
        const filter = events?.filter(event => historyData?.data?.some(history => event.id === history.event_id));
        // const filterEvents = events?.filter(event=>event.id === )
        console.log(filter);
        setSelectHistory(filter)
    },[events])
    return (
        <div className="lg:w-1/2 mx-auto">
            <h1>History of User: {historyData.data.length}</h1>
            <p>Events: {events.length}</p>
            {
                selectHistory?.map(history=><EventsCard key={history.id} value={history}></EventsCard>)
            }

            {/* <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            historyData.data?.map(data => <tr className="hover:bg-white">
                                <td></td>
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                <td>{data.title}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div> */}
        </div>
    );
};

export default VolunteerHistory;