import { useContext } from "react";
import { useForm } from "react-hook-form";
import { CreateAuth } from "../../components/AuthProvider/AuthProvider";

const CreateEvents = () => {
    const {user} = useContext(CreateAuth);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleAddEvents = (data,e) =>{
        // console.log(data,user.id);
        const newEvent = {...data,user_id:user.id}
        console.log(newEvent);

        fetch('http://localhost:5000/events',{
            method: "POST",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newEvent)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            e.target.reset();
        })
        .catch(error=>console.log(error));
    }
    return (
        <div className="lg:w-1/2 md:mx-10 lg:mx-auto rounded-md md:border md:border-black px-5 py-3 mt-10">
            <h1 className="mb-3 text-center font-bold text-2xl">Events Creation</h1>
            <form onSubmit={handleSubmit(handleAddEvents)} className="space-y-2">
                <label htmlFor="title" className="block">Title</label>
                <input type="text" placeholder="Title" {...register("title", { required: true })} className="w-full p-2 outline-none mt-1"/>
                {errors.title && <span className="text-red-500">This field is required.</span>}
                <label htmlFor="" className="block">Description</label>
                <textarea rows={4} cols={5} {...register("description", { required: true })} className="w-full p-2 outline-none mt-1"></textarea>
                {errors.description && <span className="text-red-500">This field is required.</span>}
                <label htmlFor="date" className="block">Date</label>
                <input type="date" {...register("date", { required: true })} className="w-full p-2 outline-none mt-1"/>
                {errors.date && <span className="text-red-500">This field is required.</span>}
                <label htmlFor="location" className="block">Location</label>
                <input type="text" placeholder="Location" {...register("location", { required: true })} className="w-full p-2 outline-none mt-1" />
                {errors.location && <span className="text-red-500">This field is required.</span>}
                <label htmlFor="location" className="block">Category</label>
                <select {...register("category", { required: true })} className="w-full p-2 outline-none my-2">
                    <option value="">choose category</option>
                    <option value="Education">Education</option>
                    <option value="Environment">Environment</option>
                    <option value="Healthcare">Healthcare</option>
                </select>
                {errors.category && <span className="text-red-500">This field is required.</span>}
                <input type="submit" value="Submit" className="btn btn-success w-full p-2 font-bold text-lg mb-2"  />
            </form>
        </div>
    );
};

export default CreateEvents;