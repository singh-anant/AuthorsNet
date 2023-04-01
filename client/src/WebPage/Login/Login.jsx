// import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { login } from "../../../../server/controller/auth";
import { AuthContext } from "../../Context/AuthContext";
import "./login.css";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [errr, setErrr] = useState(null);
  const navigate = useNavigate();
  // For Auth--Context
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((previous) => ({ ...previous, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await axios.post("/auth/login", inputs);
      await login(inputs);
      navigate("/");
    } catch (error) {
      setErrr(error.response.data);
    }
  };

  return (
    <div className="auth">
      <h1>Welcome to BlogJS</h1>
      <form>
        <input
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Login</button>
        {errr && <p>{errr}</p>}
        <span>
          Dont't have a account?<Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
