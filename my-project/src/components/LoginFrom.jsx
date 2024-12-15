import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PiUserCircleFill } from "react-icons/pi";
import { HiUser } from "react-icons/hi";
import { BiSolidLock } from "react-icons/bi";
const LoginForm = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await axios.post("http://localhost:5000/api/login", formData);
            console.log("in data", data)
            localStorage.setItem("users", JSON.stringify(data.data?.users));
            localStorage.setItem("token", data.token);
            alert("Login successful");
            navigate("/dashboard");
        } catch (error) {
            console.log("errr in login", error)
            alert(error.response.data.message);
        }
    };
    const isFormValid = formData.email.trim() !== "" && formData.password.trim() !== "";

    return (
        <>

            <div className="w-[25%]">
            <div className="w-full bg-slate-800 shadow-md rounded-lg relative">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-teal-500 w-36 py-2 rounded text-center">
                    <h1 className="font-semibold text-xl text-white">SIGN IN</h1>
                </div>

                <div className="w-full flex justify-center items-center bg-slate-600 mb-10 h-28">
                    <div className="mt-20">
                        <PiUserCircleFill className="" size={90} />
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col items-center mt-8 px-6">
                    <div className="w-full flex items-center p-3 rounded border border-gray-500 bg-slate-700 mb-4">
                        <HiUser size={20} className="text-gray-400" />
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="bg-transparent text-white flex-1 ml-2 focus:outline-none"
                        />
                    </div>

                    <div className="w-full flex items-center p-3 rounded border border-gray-500 bg-slate-700 mb-4">
                        <BiSolidLock size={20} className="text-gray-400" />
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            className="bg-transparent text-white flex-1 ml-2 focus:outline-none"
                        />
                    </div>

                    <div className="flex justify-between w-full text-gray-400 text-sm mb-6">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2 accent-teal-500" />
                            Remember me
                        </label>
                        <a href="#" className="hover:text-teal-400">Forgot your password?</a>
                    </div>

                    <button type="submit" className={`w-full mb-10 py-2 rounded ${isFormValid ? "bg-teal-500 hover:bg-teal-600 text-white" : "bg-gray-500 text-gray-300 cursor-not-allowed"}`}
                        disabled={!isFormValid}>
                        Login
                    </button>
                </form>
            </div>
            <p className="text-center text-gray-400 mb-4">
                    Don't have an account?
                    <span
                        className="text-teal-500 cursor-pointer hover:underline"
                        onClick={() => navigate("/register")}
                    >
                        Register here
                    </span>
                </p>
            </div>

        </>
    );
};

export default LoginForm;