import { useContext } from "react";
import { CreateAuth } from "../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";

const PostCard = ({ post,handleDelete }) => {
    const { user } = useContext(CreateAuth)

    return (
        <>
            {
                post?.status === "Open" && <div className="card bg-base-100 w-96 shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title text-xl">{post.title}!</h2>
                        <p>{post.description}</p>
                        <p className="text-sm font-semibold"><span>{post.urgency}</span></p>
                        <p className="text-lg"><span className="font-medium">Status:</span> {post.status}</p>
                        <div className="card-actions justify-end">
                            <div>
                                {
                                    user?.role === 'admin' ? <div>
                                        <Link className="btn mr-5" to={`postDeatails/${post.id}`}>Details</Link>
                                        <button className="btn btn-error" onClick={()=>handleDelete(post.id)}>Delete</button>
                                    </div>
                                        :
                                        <div className="flex items-center mt-1">
                                            <Link className="btn mr-5" to={`postDeatails/${post.id}`}>Details</Link>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default PostCard;