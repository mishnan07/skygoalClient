// ... (previous code)

const SignUp = ({ edit, user }) => {
    // ... (previous code)
  
    return (
      <div>
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
                  {/* ... (previous code) */}
                  <div className="relative">
                    {user && user.profileImage && (
                      <img
                        src={user.profileImage}
                        alt="Profile"
                        className="rounded-full w-20 h-20 mx-auto mb-4"
                      />
                    )}
                    <label
                      htmlFor="image"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Profile Image <span className="text-gray-500">(Optional)</span>
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
                  {/* ... (previous code) */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default SignUp;
  