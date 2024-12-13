import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HiUser } from "react-icons/hi";
import { BiSolidLock } from "react-icons/bi";
import { PiUserCircleFill } from "react-icons/pi";

const RegisterForm = () => {
  const [formData, setFormData] = useState({ name: "", dob: "", email: "", password: "" });
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if all fields are filled
    const { name, dob, email, password } = formData;
    setIsFormValid(name && dob && email && password); // `true` if all fields are non-empty
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/register", formData);
      console.log("data is", data);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      setFormData({ name: "", dob: "", email: "", password: "" });
      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      console.log("error", error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="w-[25%] bg-slate-800 shadow-md rounded-lg relative">
      {/* Register Banner */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-teal-500 w-36 py-2 rounded text-center">
        <h1 className="font-semibold text-xl text-white">REGISTER</h1>
      </div>

      {/* User Avatar */}
      <div className="w-full flex justify-center items-center bg-slate-600 mb-10 h-28">
        <div className="mt-20">
          <PiUserCircleFill size={90} />
        </div>
      </div>

      {/* Input Fields */}
      <form onSubmit={handleSubmit} className="flex flex-col items-center mt-8 px-6">
        {/* Name Field */}
        <div className="w-full flex items-center p-3 rounded border border-gray-500 bg-slate-700 mb-4">
          <HiUser size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="bg-transparent text-white flex-1 ml-2 focus:outline-none"
          />
        </div>

        {/* Date of Birth Field */}
        <div className="w-full flex items-center p-3 rounded border border-gray-500 bg-slate-700 mb-4">
          <HiUser size={20} className="text-gray-400" />
          <input
            type="date"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            required
            className="bg-transparent text-white flex-1 ml-2 focus:outline-none"
          />
        </div>

        {/* Email Field */}
        <div className="w-full flex items-center p-3 rounded border border-gray-500 bg-slate-700 mb-4">
          <HiUser size={20} className="text-gray-400" />
          <input
            type="email"
            value={formData.email}
            placeholder="Email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="bg-transparent text-white flex-1 ml-2 focus:outline-none"
          />
        </div>

        {/* Password Field */}
        <div className="w-full flex items-center p-3 rounded border border-gray-500 bg-slate-700 mb-4">
          <BiSolidLock size={20} className="text-gray-400" />
          <input
            type="password"
            value={formData.password}
            placeholder="Password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            className="bg-transparent text-white flex-1 ml-2 focus:outline-none"
          />
        </div>

        {/* Terms and Conditions */}
        
        {/* Register Button */}
        <button
          type="submit"
          className={`w-full mb-10 py-2 rounded ${
            isFormValid ? "bg-teal-500 hover:bg-teal-600 text-white" : "bg-gray-500 text-gray-300 cursor-not-allowed"
          }`}
          disabled={!isFormValid}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
