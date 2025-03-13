import { useContext } from "react";
import { useForm } from "react-hook-form";
import { CreateAuth } from "../../components/AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const HelpPosts = () => {
    const {user} = useContext(CreateAuth);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleHelpPost = (data,e) =>{
        e.preventDefault();
        // console.log(data);
        const newPost = {...data,posted_by:user.id}
        console.log(newPost);
        fetch('http://localhost:5000/posts',{
            method: "POST",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newPost)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            e.target.reset();
            Swal.fire({
                title: "Added Post!",
                icon: "success",
                draggable: true
              });
        })
        .catch(error=>console.log(error))
    }

    return (
        <div className="lg:w-1/2 mx-auto">
            <h1 className="font-bold text-3xl">Community Help Post</h1>
            <form onSubmit={handleSubmit(handleHelpPost)} className="space-y-4 mt-10 w-3/4 mx-auto px-2 shadow-md rounded-sm shadow-slate-400">
                <label htmlFor="title" className="block text-lg font-thin">Title</label>
                <input type="text" placeholder="Title" className="input input-info w-full"  {...register("title", { required: true })}/>
                {errors.title && <span className="text-red-500">This field is required</span>}
                <label htmlFor="description" className="block text-lg font-thin">Description</label>
                <textarea placeholder="Description..." className="input input-info w-full" rows={10} cols={5} {...register("description", { required: true })}></textarea>
                {errors.description && <span className="text-red-500">This field is required</span>}
                <label htmlFor="urgency" className="block text-lg font-thin">Urgency</label>
                <select className="w-full select select-info" {...register("urgency", { required: true })}>
                    <option value="">select</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="Urgent">Urgent</option>
                </select>
                {errors.urgency && <span className="text-red-500">This field is required</span>}
                <label htmlFor="status" className="block text-lg font-thin">Status</label>
                <select className="w-full select select-info" {...register("status", { required: true })}>
                    <option value="">select</option>
                    <option value="Open">Open</option>
                    <option value="Close">Close</option>
                </select>
                {errors.status && <span className="text-red-500">This field is required</span>}
                <div className="w-1/2 mx-auto">
                    <input type="submit" value="Post" className="btn btn-info w-full my-10" />
                </div>

            </form>
        </div>
    );
};

export default HelpPosts;