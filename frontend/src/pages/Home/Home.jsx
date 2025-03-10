import { useContext } from "react";
import { CreateAuth } from "../../components/AuthProvider/AuthProvider";

const Home = () => {
    const {user} = useContext(CreateAuth);
    return (
        <div className="lg:w-1/2 mx-auto">
            <h1 className="text-3xl text-center">Welcome to Volunteers Platform: {user.name}</h1>
        </div>
    );
};

export default Home;