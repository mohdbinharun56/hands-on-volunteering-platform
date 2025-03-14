import { useContext } from "react";
import { CreateAuth } from "../AuthProvider/AuthProvider";
import { Link, useLocation } from "react-router-dom";

const EventsCard = ({ value, openModal }) => {
    const { user, handleDelete } = useContext(CreateAuth);

    const pathLocation = useLocation();

    const { id, title, description, date, location, category } = value;

    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: 'numeric'
    })

    const hideDeletebtn = ['/'];
    const showbtn = hideDeletebtn.includes(pathLocation.pathname);
    const hidebtn = [`/history/${user?.id}`];
    const showJoin = hidebtn.includes(pathLocation.pathname);
    console.log(showJoin);
    return (
        <div className="card shadow-md my-5 border border-black">

            <div className="card-body">
                <h1 className="text-lg font-bold">{title}</h1>
                <p className="font-thin">{description}</p>
                <p><span className="font-medium">Event Start:</span> {formattedDate}</p>
                <p><span className="font-medium">Location:</span> {location}</p>
                <p><span className="font-medium">Category:</span> {category}</p>
                {
                    showbtn ? <small>For more Info. Please Go to <Link to='/events' className="text-blue-500 hover:underline">Events</Link></small>:
                    <div>
                        {
                            user?.role === "volunteer" ? <div>
                                {/* <button onClick={() => handleJoiEvents(id)} className="btn btn-success font-bold">Join Event</button> */}
                                {/* Open the modal using document.getElementById('ID').showModal() method */}
                                {
                                    showJoin ? <button className="btn btn-error font-bold" onClick={() => handleDelete('history',id)}>Delete</button>
                                        : <button className="btn btn-success font-bold" onClick={() => openModal(value)}>Join Event</button>
                                }

                            </div> : <div className="mt-2">
                                {/* <button >Edit</button> */}
                                <Link to={`/events/${value?.id}`} className="btn btn-primary font-bold">Edit</Link>
                                <button onClick={() => handleDelete('events',value?.id)} className="btn btn-error ml-3 font-bold" >Delete</button>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default EventsCard;