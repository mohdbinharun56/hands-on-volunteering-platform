import { useContext, useState } from "react";
import { CreateAuth } from "../../components/AuthProvider/AuthProvider";
import { Link, useLoaderData } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import PostCard from "../../components/loadPostsCard/PostCard";
import EventsCard from "../../components/EventsCard/EventsCard";
import Swal from "sweetalert2";

const Home = () => {
    const { user, events } = useContext(CreateAuth);
    const loadedPosts = useLoaderData();
    console.log(loadedPosts.data);
    const [posts, setPosts] = useState(loadedPosts.data);
    console.log(posts)

    const handleDelete = (id) => {
        // console.log("delete", id);
        // use sweet alert for delete
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/posts/${id}`, {
                    method: "DELETE"
                })
                    .then(() => console.log("Response for delete"))
                    .then((data) => {
                        console.log(data)
                        setPosts(posts.filter(post=>post.id!==id))
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    })
                    .catch(error=>console.log("error to delete post",error))
            }
        });
    }
    return (
        <div className="">
            <div>
                <Navbar></Navbar>
            </div>
            <div className="bg-violet-300 mt-10 p-20 text-center">
                <h1 className="text-3xl text-blue-950 font-bold ">Welcome to Volunteers Platform {user?.name}</h1>
                <p className="mb-5">Find volunteer opportunities and make a difference in your community</p>
                {
                    user ?
                        <Link to='/help-posts' className="font-medium  border-2 border-violet-400 p-3 bg-violet-500 text-white hover:rounded-full">Community Help Post</Link>
                        :
                        <Link to='/register' className="font-bold border-2 border-violet-400 p-3 bg-violet-500 text-white hover:rounded-full">Get Started</Link>
                }
            </div>
            <div>
                <h1 className="font-bold text-3xl mt-10 pl-20">Volunteers Opportunities</h1>
                <p className="mt-2 pl-20">Community Help to Get opportuniies of volunteers</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 px-20 mt-10 gap-10">
                    {
                        posts?.map(post => <PostCard key={post.id} post={post} handleDelete={handleDelete}></PostCard>)
                    }
                </div>
            </div>
            <div>
                <h1 className="font-bold text-3xl mt-10 pl-20">Events</h1>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 px-20 gap-10">
                    {
                        events.map(event => <EventsCard key={event.id} value={event}></EventsCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;