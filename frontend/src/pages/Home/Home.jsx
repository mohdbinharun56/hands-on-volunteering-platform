import { useContext } from "react";
import { CreateAuth } from "../../components/AuthProvider/AuthProvider";

const Home = () => {
    const {user} = useContext(CreateAuth);
    return (
        <div>
            <h1 className="text-5xl text-center">Welcome to Volunteers Platform: {user.name}</h1>
        </div>
    );
};

export default Home;