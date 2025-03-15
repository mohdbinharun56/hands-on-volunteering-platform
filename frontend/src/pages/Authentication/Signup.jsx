import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Signup = () => {
    const [error, setError] = useState("");
    const [skillsError, setSkillsError] = useState("");
    const [skillsInput, setSkillsInputs] = useState("");
    const [skills, setSkills] = useState([]);
    const [causesInput, setCausesInput] = useState("");
    const [causes, setCauses] = useState([]);
    const [causesError, setCausesError] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm();
    // register button call method
    const handleRegister = (data, e) => {
        e.preventDefault();
        // console.log(data);
        const { name, email, password,role } = data;

        if (password.length < 6) {
            setError('Password must be at least 6 characters or long');
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setError('Password must contain at least one UPPERCASE');
            return;
        }
        if (!/[a-z]/.test(password)) {
            setError('Password must contain at least one lowercase');
            return;
        }
        if (skills.length === 0) {
            setSkillsError("Skills is required");
            return;
        }
        if (causes.length === 0) {
            setCausesError("Causes is required");
            return;
        }
        e.target.reset();
        // console.log({ "name": name, "Email": email, 'Password': password,role, skills, causes })
        setError("");
        setSkillsError("");
        setCausesError("")
        setSkills("");
        setCauses("");

        const newUser = {
            name,email,password,role,skills,causes
        }
        
        // register user
        fetch('http://localhost:5000/users/registers-user',{
            method: "POST",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newUser)
        })
        .then(res=>res.json())
        .then(data=>console.log(data))
        .catch(error=>setError(error.message))

    }

    const handleAddSkills = () => {
        if (skillsInput !== "") {
            setSkills([...skills, skillsInput]);
            setSkillsInputs("");
            setError("");
            setSkillsError("");
        }
    }

    const handleAddCauses = () => {
        if (causesInput !== "") {
            setCauses([...causes, causesInput]);
            setCausesInput("");
            setError("");
            setCausesError("");
        }
    }

    return (
        <div>
            <div className="mt-2">
                <div className="space-y-5 md:w-[600px] mx-auto shadow-md border border-[#ABABAB] rounded-md px-10 py-4 ">
                    <h1 className="text-2xl md:text-4xl font-bold">Register</h1>
                    <form className="space-y-10" onSubmit={handleSubmit(handleRegister)}>
                        <input type="text"
                            placeholder="Name"
                            {...register("name", { required: true })}
                            className="w-full text-base font-medium outline-none border border-black p-2 rounded-ss-xl"
                        />
                        {errors.name && <span className="text-red-500">This field is required</span>}

                        <input type="email"
                            placeholder="Email"
                            {...register("email", { required: true })}
                            className="w-full text-base font-medium outline-none border border-black p-2 rounded-ss-xl"
                        />
                        {errors.email && <span className="text-red-500">This field is required</span>}
                        <div className="flex items-center">
                            <input type="password"
                                placeholder="Password"
                                {...register("password", { required: true })}
                                className="w-full text-base font-medium outline-none border border-black p-2 rounded-ss-xl"
                            />
                            {/* <span onClick={handleToggle} className="relative -left-7">{toggle ? <IoEyeOffSharp className="cursor-pointer" /> : <FaRegEye className="cursor-pointer" />}</span> */}
                        </div>
                        {errors.password && <span className="text-red-500">This field is required</span>}
                        
                        <div>
                            <select className="w-full text-base font-medium outline-none border border-black p-2 rounded-ss-xl" {...register("role", { required: true })}>
                                <option value="volunteer">volunteer</option>
                                <option value="admin">admin</option>
                            </select>
                            {errors.role && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div>
                            <div>
                                {/* The button to open modal */}
                                <label htmlFor="my_modal_7" className="btn">
                                    skills
                                </label>

                                {/* Modal implementation */}
                                <input type="checkbox" id="my_modal_7" className="modal-toggle" />
                                <div className="modal" role="dialog">
                                    <div className="modal-box">
                                        <h3 className="text-lg font-bold">Skills</h3>

                                        <input
                                            type="text"
                                            placeholder="Add Skills"
                                            value={skillsInput}
                                            onChange={(e) => setSkillsInputs(e.target.value)}
                                            className="w-full text-base font-medium outline-none border border-black p-2 rounded-ss-xl mt-2"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddSkills}
                                            className="btn font-bold text-lg mt-2 w-full btn-accent"
                                        >
                                            Add+
                                        </button>
                                        {
                                            skills && <div>{skills.map((skill, index) => <p key={index}>{skill}</p>)}</div>
                                        }
                                    </div>
                                    <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
                                </div>
                                {
                                    skills && <div className="space-y-1 mt-2">{skills.map((skill, index) => <p key={index}>{skill}</p>)}</div>
                                }
                            </div>
                            {
                                skillsError && <span className="text-red-500">This field is required</span>
                            }
                        </div>

                        <div>
                            {/* Open the modal using document.getElementById('ID').showModal() method */}
                            <button type="button" className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>causes</button>
                            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg">Causes</h3>
                                    <input
                                        type="text"
                                        placeholder="education : environmental : healthcare"
                                        value={causesInput}
                                        onChange={(e) => setCausesInput(e.target.value)}
                                        className="w-full text-base font-medium outline-none border border-black p-2 rounded-ss-xl mt-2"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddCauses}
                                        className="btn font-bold text-lg mt-2 w-full btn-accent"
                                    >
                                        Add causes
                                    </button>
                                    {
                                        causes && <div>{causes.map((cause, index) => <p key={index}>{cause}</p>)}</div>
                                    }

                                    <div className="modal-action">
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn btn-primary">Close</button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                            {
                                causes && <div>{causes.map((cause, index) => <p key={index}>{cause}</p>)}</div>
                            }
                            {
                                causesError && <span className="text-red-500">This field is required</span>
                            }
                        </div>

                        {
                            error && <small className="text-red-500">{error}</small>
                        }
                        <input type="submit" value="Register" className="bg-[#00335A] text-white py-2 px-4 font-medium w-full text-base cursor-pointer hover:bg-[#063051]" />
                    </form>
                    <p className="text-center text-base font-medium mt-4">Already have an account? Please <Link to="/login" className="text-[#063051] hover:underline">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Signup;