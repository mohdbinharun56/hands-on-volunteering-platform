import { useContext } from "react";
import { CreateAuth } from "../AuthProvider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
    const { user } = useContext(CreateAuth)
    // const [error, setError] = useState('');

    // const refClose = useRef();

    const navigate = useNavigate()

    const handleJoin = () => {
        if (!user) {
            navigate('/login')
        }
        else {
            console.log("Register")
        }
    }

    // const handleComment = (e) => {
    //     e.preventDefault();
    //     const commentValue = e.target.comments.value;
    //     if (!commentValue) {
    //         setError("This field is required!")
    //     } else {
    //         const post_id = post?.id;
    //         const comments = { message: commentValue, message_by: user?.id, post_id }
    //         console.log(comments);

    //         fetch('http://localhost:5000/comments', {
    //             method: "POST",
    //             headers: { 'content-type': 'application/json' },
    //             body: JSON.stringify(comments)
    //         })
    //             .then(res => res.json())
    //             .then(data => {
    //                 console.log(data);
    //                 if(data.status===200){
    //                     toast("Comments sent----");
    //                     refClose.current.click();
    //                 }
    //                 else{
    //                     toast("Comments does not sent----/ Please try again.");
    //                     refClose.current.click();
    //                 }
    //             })
    //         setError('');
    //     }
    //     e.target.reset();
    // }

    // const handleMessage = (e) => {
    //     e.preventDefault();
    //     alert("Comming Soon");
    // }
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
                                // user ?
                                <div>
                                    {
                                        user?.role === 'admin' ? <div>
                                            <Link className="btn mr-5" to={`postDeatails/${post.id}`}>Details</Link>
                                            <button className="btn btn-error">Delete</button>
                                        </div>
                                            :
                                            <div className="flex items-center mt-1">
                                                <Link className="btn mr-5" to={`postDeatails/${post.id}`}>Details</Link>
                                                {/* <button className="btn btn-success" onClick={handleMessage}>Message</button>

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
                                                                            <button ref={refClose} className="btn">Close</button>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </dialog>
                                                        </div>
                                                } */}
                                            </div>
                                    }
                                </div> //: <button onClick={handleJoin} className="btn btn-primary">Join</button>
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default PostCard;