import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function Home({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        loginData
      );
      // Başarılı giriş durumunda yapılacak işlemler
      console.log(response.data);
      setIsLoggedIn(true);
      navigate('/todos');
    } catch (error) {
      // Hata durumunda yapılacak işlemler
      console.error(error);
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        registerData
      );
      // Başarılı kayıt durumunda yapılacak işlemler
      console.log(response.data);
    } catch (error) {
      // Hata durumunda yapılacak işlemler
      console.error(error);
    }
  };

  return (

    

    <div className="main-div">
      <div className="loginForm d-flex align-items-center justify-content-center mt-5">
        <form onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Username</label>
            <input
              type="text"
              className="form-control"
              value={loginData.username}
              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
              required
              aria-describedby="emailHelp"
              placeholder="Enter username"
            ></input>
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              required
              placeholder="Password"
            ></input>
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            ></input>
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
      <div className="loginForm d-flex align-items-center justify-content-center mt-5">
        <form onSubmit={handleRegisterSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Username</label>
            <input
              type="text"
              className="form-control"
              value={registerData.username}
              onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
              required
              aria-describedby="emailHelp"
              placeholder="Enter username"
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email</label>
            <input
              type="email"
              className="form-control"
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              required
              aria-describedby="emailHelp"
              placeholder="Enter email"
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              required
              placeholder="Password"
            ></input>
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
