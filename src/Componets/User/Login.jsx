import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateUserInstance from "../../Axios/userAxios";
import { ClientId, ClientLogin } from "../../Redux/ClientAuth";
import Loader from "./Loader";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading,setLoading]=useState(false)

    const userInstance = CreateUserInstance()

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const isValidEmail = (email) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
        };
    
        if (email.trim().length === 0) {
          return toast.error('Please enter email');
        } else if (!isValidEmail(email)) {
          return toast.error('Please enter a valid email');
        } else if (password.length === 0) {
          return toast.error('Please enter password');
        } else if (password.length < 6) {
          return toast.error('Password should be at least 6 characters');
        }
       setLoading(true)
        const res = await userInstance.post('/login', { email, password });
        const result = res.data.userResponse;
    
        if (result.status === true) {
          const token = result.token;
          const id = result.id;
          dispatch(ClientLogin({ token: token }));
          dispatch(ClientId({ id: id }));
          navigate('/');
          setLoading(false)
        }
      } catch (error) {
        toast.error('Email or password is incorrect');
      }
    };
    
  return (
    <div>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <ToastContainer />
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">Login</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      autocomplete="off"
                      id="email"
                      name="email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      value={email}
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                    />
                    <label
                      for="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autocomplete="off"
                      id="password"
                      name="password"
                      type="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      value={password}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                    />
                    <label
                      for="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    {loading?
                      <Loader />
                    :
                    <button onClick={handleSubmit} className="bg-cyan-500 text-white rounded-md px-2 py-1">
                    Submit
                  </button>
                    }
                  </div>

                    <p onClick={()=>navigate('/register')}  className="text-sm cursor-pointer">
                      Create new account
                    </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
