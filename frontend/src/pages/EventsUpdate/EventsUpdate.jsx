import { useContext, useEffect, useState } from "react";
import { CreateAuth } from "../../components/AuthProvider/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EventsUpdate = () => {
    const { events } = useContext(CreateAuth);

    const [filterEvent, setFilterEvent] = useState(null);

    const { id } = useParams();

    const navigate = useNavigate();

    const convertId = parseInt(id);
    console.log(typeof convertId);
    useEffect(() => {
        const filterEvent = events.find(event => event.id === convertId);
        console.log(filterEvent);
        // console.log([...events,filterEvent])
        setFilterEvent(filterEvent)
    }, [events, filterEvent])

    const handleUpdateEvents = (e) => {
        e.preventDefault();

        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const date = form.date.value;
        const location = form.location.value;
        const category = form.category.value;

        if (title, description, date, location, category) {
            const data = { title, description, date, location, category }
            console.log(data);

            fetch(`http://localhost:5000/events/${convertId}`, {
                method: "PUT",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    if (data.status === 200) {
                        Swal.fire({
                            title: "Updated!",
                            icon: "success",
                            draggable: true
                        });
                        navigate('/events')
                    }
                })
                .catch(error => console.log("Error while update event", error))

        } else {
            console.log("field is required");
            // return
        }


    }
    return (
        <div className="lg:w-1/2 mx-auto rounded-md border border-black px-5 py-3">
            <form onSubmit={handleUpdateEvents} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block">Title</label>
                    <input type="text" defaultValue={filterEvent?.title} name="title" className="w-full p-2 outline-none mt-1" />
                </div>

                <div>
                    <label htmlFor="" className="block">Description</label>
                    <textarea rows={4} cols={5} defaultValue={filterEvent?.description} name="description" className="w-full p-2 outline-none mt-1"></textarea>
                </div>
                <div>
                    <label htmlFor="date" className="block">Date</label>
                    <input type="text" name="date" defaultValue={filterEvent?.date ? filterEvent.date.split("T")[0] : ''} className="w-full p-2 outline-none mt-1" />
                </div>
                <div>
                    <label htmlFor="location" className="block">Location</label>
                    <input type="text" defaultValue={filterEvent?.location} name="location" className="w-full p-2 outline-none mt-1" />
                </div>

                <div>
                    <label htmlFor="category" className="block">Category</label>
                    <input type="text" defaultValue={filterEvent?.category} placeholder="Education, Environment, Healthcare" name="category" className="w-full p-2 outline-none mt-1" />
                </div>

                <input type="submit" value="Update" className="btn btn-success w-full p-2 font-bold text-lg mb-2" />
            </form>
        </div>
    );
};

export default EventsUpdate;