import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../Store/Registration/RegistrationThunk";
import toast, { Toaster } from "react-hot-toast";
import mainimg from "../assets/Doctors-bro.png";
import { ArrowLeft } from "lucide-react";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!username || !password) {
    //   setMessage("Both fields are required");
    //   return;
    // }

    try {
      const user = await dispatch(loginUser({ username, password })).unwrap();
      console.log(user);

      localStorage.setItem("currentUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (err) {
      // setMessage(typeof err === "string" ? err : "Login failed");
      console.log(err);
      
    }
  };

  return (
    //     <div className="flex items-center justify-center min-h-screen bg-gray-100">
    //       <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white rounded shadow-md w-80">
    //         <h2 className="text-2xl font-semibold text-center">Login</h2>

    //         {(error || message) && (
    //           <p className="text-sm text-center text-red-500">
    //             {error || message}
    //           </p>
    //         )}

    //         <input
    //           type="text"
    //           placeholder="Username"
    //           className="w-full p-2 border rounded"
    //           value={username}
    //           onChange={(e) => setUsername(e.target.value)}
    //         />
    //         <input
    //           type="password"
    //           placeholder="Password"
    //           className="w-full p-2 border rounded"
    //           value={password}
    //           autoComplete="current-password"
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //         <button
    //           type="submit"
    //           className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
    //           disabled={loading}
    //         >
    //           {loading ? 'Logging in...' : 'Login'}
    //         </button>
    //         <p className="text-sm text-center">
    //           Don't have an account?{' '}
    //           <Link to="/register" className="text-blue-500 underline">
    //             Register
    //           </Link>
    //         </p>
    //       </form>
    // <Toaster/>
    //     </div>
    <div className="flex justify-center items-center mt-12">
      <div className="flex justify-center items-center bg-slate-100 w-[80%] h-[85vh]  rounded-lg">
        <div className="w-[50%] h-[100vh] flex justify-center items-center">
          <img className="w-[80%]  h-[80%] " src={mainimg} />
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl items-start mb-10">Sign In To Doctor App</h1>

          <Link to="/mainpage" className=" w-full text-start">
            <ArrowLeft className="flex items-start" />
          </Link>
          <form className="flex flex-col w-full">
            <input
              type="text"
              placeholder="Username"
              className="w-[90%] border rounded-md my-3 px-4 py-2"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-[90%] border rounded-md my-3 px-4 py-2"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <p className="text-end me-9 text-blue-600 font-bold">
              Forget Password ?
            </p>
            <button
              type="submit"
              className="bg-black w-[90%] text-2xl text-white py-3 rounded-lg my-3"
              onClick={handleSubmit}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
