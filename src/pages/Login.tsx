import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppDispatch, RootState } from "../app/data/store";
import { loginGoogle, loginUsers } from "../app/data/authSlice";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const handleLogin = () => {
    dispatch(loginUsers({ email, password }))
      .unwrap()
      .then(() => {
        toast.success("Logged in successfully!");
        navigate("/"); // Navigate to home or dashboard after successful login
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleSocialSignIn = async () => {
    // Implement Google Sign In
    const result = await signInWithPopup(auth, googleProvider);
    const idToken = await result.user.getIdToken();
    dispatch(loginGoogle(idToken))
      .unwrap()
      .then(() => {
        toast.success("Logged in successfully!");
        navigate("/"); // Navigate to home or dashboard after successful login
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <button
          onClick={handleLogin}
          aria-label="Login"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Login
        </button>
        <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
          <p className="text-center font-semibold mx-4 mb-0">OR</p>
        </div>
        <div className="w-full">
          <button
            onClick={handleSocialSignIn}
            aria-label="Google Login"
            className="btn w-full bg-green-400"
          >
            Google Login
          </button>
        </div>
        <p className="mt-4 text-center text-gray-600">
          don't have account{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline hover:text-blue-700 font-semibold transition duration-300"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
