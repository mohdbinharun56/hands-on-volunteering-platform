import { useContext, useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { CreateAuth } from "../AuthProvider/AuthProvider";
import { toast } from "react-toastify";

const PostDetails = () => {
    const { user, refClose } = useContext(CreateAuth);
    const [error, setError] = useState("");
    const [comments,setComments] = useState([]);

    const loadPost = useLoaderData();
    const {id} = useParams();

    // console.log(loadPost.data[0])
    // console.log("id is ",id)

    useEffect(()=>{
        fetch(`http://localhost:5000/comments/${id}`,{
            method: "GET",
            headers: {'content-type': 'application/json'}
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data.data);
            if(data.data){
                setComments(data.data)
            }
        })
        .catch(error=>{
            console.log("Error to fetch comments data by ID: error is-> ",error)
        })
    },[])

    const handleComment = (e) => {
        e.preventDefault();
        const commentValue = e.target.comments.value;
        if (!commentValue) {
            setError("This field is required!")
        } else {
            const post_id = id;
            const comments = { message: commentValue, message_by: user?.id, post_id }
            // console.log(comments);

            fetch('http://localhost:5000/comments', {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(comments)
            })
                .then(res => res.json())
                .then(data => {
                    console.log("data is: ",data.data);
                    if (data.status === 200) {
                        toast("Comments sent----");
                        window.location.reload();
                        refClose.current.click();
                    }
                    else {
                        toast("Comments does not sent----/ Please try again.");
                        refClose.current.click();
                    }
                })
            setError('');
        }
        e.target.reset();
    }
    return (
        <div className="lg:w-1/2 mx-auto ">
            <div className="card shadow-md p-5">
                <p className="font-thin text-sm">Post By,</p>
                <div className="flex items-center pl-5">
                    <h1 className="card-title ">{loadPost.data[0].name}{'-'}</h1>
                    <small>{loadPost.data[0].email}</small>
                </div>
                <div className="card-body space-y-1">
                    <h1 className="font-bold text-3xl"> {loadPost.data[0].title}</h1>
                    <p className="text-base font-normal"><span className="font-semibold">Overview:</span> {loadPost.data[0].description}</p>
                    <p className="text-base font-normal"><span className="font-semibold">Category:</span> {loadPost.data[0].urgency}</p>
                    <p className="text-base font-normal"><span className="font-semibold">Status:</span> {loadPost.data[0].status}</p>
                </div>
                {/* Buuton */}
                <div>
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
            </div>
            <div className="mt-10">
                <h1 className="text-3xl font-mediun">Comments: <span className="text-2xl">{comments.length}</span></h1>
                <div className="mt-5">
                    {
                        comments.map((comment,index)=><div key={index} className="card border-2 border-slate-400 mb-10 p-10 ">
                            <p>{index+1}</p>
                            <h1><span className="font-medium">Commented By:</span> {comment.name}</h1>
                            <small>{comment.email}</small>
                            <p className="mt-3"><span className="font-medium">message:</span> {comment.message}</p>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default PostDetails;