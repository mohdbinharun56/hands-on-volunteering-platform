import { useContext } from "react";
import { CreateAuth } from "../AuthProvider/AuthProvider";

const EventsCard = ({ value }) => {
    const { user } = useContext(CreateAuth);

    const { title, description, date, location, category } = value;
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: 'numeric'
    })
    return (
        <div className="card shadow-md my-5 border border-black">

            <div className="card-body">
                <h1 className="text-lg font-bold">{title}</h1>
                <p className="font-thin">{description}</p>
                <p><span className="font-medium">Event Start:</span> {formattedDate}</p>
                <p><span className="font-medium">Location:</span> {location}</p>
                <p><span className="font-medium">Category:</span> {category}</p>
                {
                    user.role === "volunteer" ? <div>
                        <button className="btn btn-success">Join</button>
                    </div> : <div className="mt-2">
                        <button className="btn btn-primary">Edit</button>
                        <button className="btn btn-error ml-3">Delete</button>
                    </div>
                }
            </div>
        </div>
    );
};

export default EventsCard;