import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import OAuth from "../../shared/components/OAuth";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setLoading(false);
      setError(null);
      navigate("/signin");
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };
  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        {error && <p className="text-red-700 mb-5">{error}</p>}
        <h1 className="text-3xl text-center font-semibold my-7">Signup</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            id="username"
            className="bg-slate-100 p-3 rounded-lg "
            onChange={handleChange}
          />
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
            {loading ? "LOADING..." : "Signup"}
          </button>
          <OAuth />
        </form>
        <div
          className="flex gap-2 mt-5
      onChange={handleChange}"
        >
          <p>Have an account? </p>
          <span className="text-blue-500 ">
            <Link to="/signin">Signin</Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Signup;
