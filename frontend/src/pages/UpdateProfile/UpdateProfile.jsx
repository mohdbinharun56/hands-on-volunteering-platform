import { useContext } from "react";
import { CreateAuth } from "../../components/AuthProvider/AuthProvider";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const UpdateProfile = () => {
    const { user,setUser } = useContext(CreateAuth);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const handleUpdateProfile = (data) => {
        console.log(data);
        const skill = data.skills.split(',')
        // console.log(skill);
        const causes = data.causes.split(',')
        // console.log(causes);
        const updatedData = { ...data, skills: skill, causes: causes }
        const updatedUser = { ...user, ...updatedData }
        console.log(updatedUser);
        console.log(updatedData);
        fetch(`http://localhost:5000/users/${user?.id}`, {
            method: "PUT",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(updatedData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 400) {
                    throw new Error("Data is Not Updated");
                }
                else {
                    console.log("Updated Succssfully", data);
                    setUser(updatedUser);
                    Cookies.set('user', JSON.stringify(updatedUser));
                    navigate('/profiles')
                }
            })
            .catch(error => console.error("Error while update profile ", error))
    }

    return (
        <div className="lg:w-1/2 mx-auto">
            {/* <h1>Profile Update {id}</h1> */}
            <form onSubmit={handleSubmit(handleUpdateProfile)} className="border border-slate-400 w-3/4 mx-auto space-y-5 p-5">
                <div>
                    <label htmlFor="name" className="block">Name</label>
                    <input type="text" defaultValue={user.name} {...register("name", { required: true })} required className="input input-info w-full" />
                    {errors.name && <span className="text-red-500">This field is required</span>}
                </div>
                <div>
                    <label htmlFor="skills" className="block">Skills</label>
                    <input type="text" defaultValue={user.skills.join(',')} {...register("skills", { required: true })} required className="input input-info w-full" />
                    {errors.skills && <span className="text-red-500">This field is required</span>}
                </div>
                <div>
                    <label htmlFor="causes" className="block">Causes</label>
                    <input type="text" defaultValue={user.causes.join(',')} {...register("causes", { required: true })} required className="input input-info w-full" />
                    {errors.causes && <span className="text-red-500">This field is required</span>}
                </div>
                <div>
                    <label htmlFor="volunteers hours" className="block">Working Hours</label>
                    <input type="number" defaultValue={user.volunteer_hours} {...register("volunteer_hours", { required: true })} required className="input input-info w-full" />
                    {errors.volunteer_hours && <span className="text-red-500">This field is required</span>}
                </div>
                <input type="submit" value="Update" className="w-full btn btn-accent" />
            </form>
        </div>
    );
};

export default UpdateProfile;