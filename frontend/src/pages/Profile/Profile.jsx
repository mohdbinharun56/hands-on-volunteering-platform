import { useContext } from "react";
import { CreateAuth } from "../../components/AuthProvider/AuthProvider";
import { Link } from "react-router-dom";

const Profile = () => {
    const { user } = useContext(CreateAuth);

    return (
        <div className="lg:w-1/2 mx-auto">
            <div className="absolute top-0">
                <h1 className="text-center font-bold text-3xl mt-10">Welcome to {user.name}</h1>
            </div>
            <div className="card ">
                <div className="card-body">
                    <div className="flex items-center justify-between mt-5">
                        <div>
                            <p className="font-thin italic text-base"><span className="font-semibold">Email:</span> {user.email}</p>
                        </div>
                        <div>
                            {/* <button  onClick={()=>handleEditProfile(user?.id)}>Edit</button> */}
                            <Link className="btn btn-primary" to={`/profiles/${user?.id}`}>Edit</Link>
                        </div>
                    </div>
                    <div className="space-y-5">
                        <div className="flex gap-10">
                            <p className="font-thin italic text-base"><span className="font-semibold">role:</span> {user.role}</p>
                            <p className="font-thin italic text-base"><span className="font-semibold">Working:</span> {user.volunteer_hours} hours</p>
                        </div>
                        <div>
                            <p className="font-semibold">Skills:</p>
                            {
                                user.skills?.map((skill, index) => <span key={index} className="mx-2 font-thin italic text-base">{skill}</span>)
                            }
                        </div>
                        <div>
                            <p className="font-semibold">Causes:</p>
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