import { useContext } from "react";
import { CreateAuth } from "../../components/AuthProvider/AuthProvider";

const Profile = () => {
    const { user } = useContext(CreateAuth);

    return (
        <div className="lg:w-1/2 mx-auto">
            <div className="absolute top-0">
                <h1 className="text-center font-bold text-3xl">Welcome to {user.name}</h1>
            </div>
            <div className="shadow-inner p-5 shadow-gray-500 rounded-md mx-auto h-full">
                <div className="px-10">
                    <div className="flex items-center justify-between mt-5">
                        <div>
                            <p className="font-thin italic text-base"><span className="font-semibold">Email:</span> {user.email}</p>
                        </div>
                        <div>
                            <button className="btn btn-primary">Edit</button>
                        </div>
                    </div>
                    <div className="space-y-5">
                        <div className="flex gap-10">
                            <p className="font-thin italic text-base"><span className="font-semibold">Type:</span> {user.role}</p>
                            <p className="font-thin italic text-base"><span className="font-semibold">Working:</span> {user.volunteer_hours} hours</p>
                        </div>
                        <div>
                            <span className="font-semibold">Skills:</span>
                            {
                                user.skills?.map((skill, index) => <span key={index} className="mx-2 font-thin italic text-base">{skill}</span>)
                            }
                        </div>
                        <div>
                            <span className="font-semibold">Causes:</span>
                            {
                                user.causes?.map((cause, index) => <span key={index} className="mx-2 font-thin italic text-base">{cause}</span>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;