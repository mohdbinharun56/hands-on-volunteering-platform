import { useContext, useState } from "react";
import { CreateAuth } from "../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
    const { user } = useContext(CreateAuth)
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const handleJoin = () => {
        if (!user) {
            navigate('/login')
        }
        else {
            console.log("Register")
        }
    }

    const handleComment = (e) => {
        e.preventDefault();
        const commentValue = e.target.comments.value;
        if (!commentValue) {
            setError("This field is required!")
        } else {
            const posted_by = post?.posted_by;
            const comments = { message: commentValue, message_by: user?.id, posted_by }
            setError('');
            console.log(comments);
        }
        e.target.reset();
    }

    const handleMessage = (e)=>{
        e.preventDefault();
        alert("Comming Soon");
    }
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
                            {
                                user ? <div>
                                    {
                                        user?.role === 'admin' ?
                                            <button className="btn btn-error">Delete</button> :
                                            <div className="flex">
                                                <button className="btn btn-success" onClick={handleMessage}>Message</button>
                                                {/* <button className="btn btn-active">Comment</button> */}
                                                {/* Open the modal using document.getElementById('ID').showModal() method */}
                                                {
                                                    user?.id === post?.posted_by ? 
                                                    <button className="btn btn-primary ml-5">Edit</button>
                                                    : <div>
                                                            <button className="btn btn-neutral ml-5" onClick={() => document.getElementById('my_modal_5').showModal()}>Comment</button>
                                                            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                                                <div className="modal-box">
                                                                    <h3 className="font-bold text-lg">Comments by {user.name}</h3>
                                                                    <form className="mt-2 space-y-3" onSubmit={handleComment}>
                                                                        <label htmlFor="comments" className="mt-3">comments</label>
                                                                        <textarea placeholder="write here..." name="comments" className="outline-none border border-slate-300 p-1  w-full rounded-md"></textarea>
                                                                        {error && <span className="text-red-500">{error}</span>}
                                                                        <input type="submit" value="Send" className="w-full btn btn-primary" />
                                                                    </form>
                                                                    <div className="modal-action">
                                                                        <form method="dialog">
                                                                            {/* if there is a button in form, it will close the modal */}
                                                                            <button className="btn">Close</button>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </dialog>
                                                        </div>
                                                }
                                            </div>
                                    }
                                </div> : <button onClick={handleJoin} className="btn btn-primary">Join</button>
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default PostCard;