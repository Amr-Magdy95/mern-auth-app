import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Signin = () => {
  const [formData, setFormData] = useState({});
  const { currentUser, error, loading } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());

      const response = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(response);
      if (!response.ok) throw new Error(data.message);
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (err) {
      dispatch(signInFailure(err.message));
    }
  };
  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        {error?.exists && <p className="text-red-700 mb-5">{error.message}</p>}
        <h1 className="text-3xl text-center font-semibold my-7">Signin</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="bg-slate-100 p-3 rounded-lg "
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="bg-slate-100 p-3 rounded-lg "
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "LOADING..." : "Signin"}
          </button>
        </form>
        <div
          className="flex gap-2 mt-5
      onChange={handleChange}"
        >
          <p>Don't have an account? </p>
          <span className="text-blue-500 ">
            <Link to="/signup">Signup</Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Signin;
