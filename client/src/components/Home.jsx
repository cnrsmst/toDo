import React, { useState,useRef,useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function Home({ setIsLoggedIn }) {
  const containerRef = useRef(null);
  const signInButtonRef = useRef(null);
  const signUpButtonRef = useRef(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true);
      navigate("/todos")
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const signUpButton = signUpButtonRef.current;
    const signInButton = signInButtonRef.current;

    const handleSignUpClick = () => {
      container.classList.add("right-panel-active");
    };

    const handleSignInClick = () => {
      container.classList.remove("right-panel-active");
    };

    signUpButton.addEventListener('click', handleSignUpClick);
    signInButton.addEventListener('click', handleSignInClick);

  },[])

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
        `${import.meta.env.VITE_LOGIN_URL}`,
        loginData
      );
      // Başarılı giriş durumunda yapılacak işlemler
      localStorage.setItem('accessToken', response.data.token);
      // console.log(response.data);
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
        `${import.meta.env.VITE_REGISTER_URL}`,
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

<div className="container loginDiv" id="container" ref={containerRef}>
	<div className="form-container sign-up-container">
		<form onSubmit={handleRegisterSubmit}>
			<h1>Create Account</h1>
			<input type="text" id="usernameinput"
              value={registerData.username}
              onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
              required
              aria-describedby="emailHelp"
              placeholder="Enter username" />
			<input type="email" id="emailinput"
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              required
              aria-describedby="emailHelp"
              placeholder="Enter email" />
			<input type="password" id="passwordinput"
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              required
              placeholder="Password" />
			<button type="submit" id="signUp">Sign Up</button>
		</form>
	</div>
	<div className="form-container sign-in-container">
		<form onSubmit={handleLoginSubmit}>
			<h1>Sign in</h1>
			{/* <span>or use your account</span> */}
			<input type="text"
              value={loginData.username}
              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
              required
              aria-describedby="emailHelp"
              placeholder="Enter username" />
			<input type="password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              required
              placeholder="Password" />
			<a href="#">Forgot your password?</a>
			<button id="signIn">Sign In</button>
		</form>
	</div>
	<div className="overlay-container">
		<div className="overlay">
			<div className="overlay-panel overlay-left">
				<h1>Welcome Back!</h1>
				<p>To keep connected with us please login with your personal info</p>
				<button className="ghost" id="signIn" ref={signInButtonRef}>Sign In</button>
			</div>
			<div className="overlay-panel overlay-right">
				<h1>Hello, Friend!</h1>
				<p>Enter your personal details and start journey with us</p>
				<button className="ghost" type="submit" id="signUp" ref={signUpButtonRef}>Sign Up</button>
			</div>
		</div>
	</div>
</div>
  );
}

export default Home;
