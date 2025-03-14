import { useContext } from "react";
import { CreateAuth } from "../../components/AuthProvider/AuthProvider";
import { Link, useLoaderData } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import PostCard from "../../components/loadPostsCard/PostCard";
import EventsCard from "../../components/EventsCard/EventsCard";

const Home = () => {
    const { user,events } = useContext(CreateAuth);
    const loadedPosts = useLoaderData();
    console.log(loadedPosts.data);
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
                        loadedPosts?.data?.map(post => <PostCard key={post.id} post={post}></PostCard>)
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