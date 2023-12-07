import React, { useState } from "react";
import CreateUserInstance from "../../Axios/userAxios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading,setLoading]=useState(false)

  const navigate = useNavigate()

  const userInstance = CreateUserInstance();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(selectedFile.type)) {
      setSelectedImage(null);
      return toast.error("Please select a valid image file (JPEG, PNG, or GIF)");
    }

    const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB
    if (selectedFile.size > maxSizeInBytes) {
      setSelectedImage(null);
      return toast.error("Image size exceeds the maximum allowed size (5 MB)");
    }

    setSelectedImage(selectedFile);
  };

  const isStrongPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (name.trim().length === 0) {
      return toast.error("Please enter your name");
    } else if (email.trim().length === 0) {
      return toast.error("Please enter email");
    } else if (!isValidEmail(email)) {
      return toast.error("Please enter a valid email");
    } else if (password.length === 0) {
      return toast.error("Please enter password");
    } else if (password.length < 6) {
      return toast.error("Password should be at least 6 characters");
    } else if (!isStrongPassword(password)) {
      return toast.error('Password not stronger. Please use combination of M*@a9# .');
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }
      setLoading(true)
      const response = await userInstance.post("/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status === false) {
        toast.error(response.data.mes);
      } else {
        toast.success("Registration successful!");
        setLoading(false)
        setName("");
        setEmail("");
        setPassword("");
        setSelectedImage(null);
        navigate('/login')
      }
    } catch (error) {
      console.error(error);
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
                <h1 className="text-2xl font-semibold">Register</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="name"
                      name="name"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      value={name}
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="User Name"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      User Name
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="email"
                      name="email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      value={email}
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Email Address"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      value={password}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Password"
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <label
                      htmlFor="image"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Profile Image{" "}
                      <span className="text-gray-500">(Optional)</span>
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="mt-1 py-1 px-2 block w-full border-2 border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-rose-600 focus:ring focus:ring-rose-200"
                    />
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

                  <p onClick={()=>navigate('/login')}  className="text-sm cursor-pointer">
                      Already have account ?
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

export default SignUp;
