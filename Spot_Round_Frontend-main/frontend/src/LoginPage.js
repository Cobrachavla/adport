import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const [signUpData, setSignUpData] = useState({ username: '', email: '', password: '', mobile: '' });
    const [signInData, setSignInData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        setIsRightPanelActive(true);
    };

    const handleSignInClick = () => {
        setIsRightPanelActive(false);
    };

    const handleSignUpChange = (e) => {
        setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
    };

    const handleSignInChange = (e) => {
        setSignInData({ ...signInData, [e.target.name]: e.target.value });
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/addUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signUpData),
            });
            const result = await response.json();
            console.log(result);
            if (result.operation === 'success') {
                alert('Sign Up Successful');
            } else {
                alert('Sign Up Failed');
            }
        } catch (error) {
            console.error('Error during sign-up:', error);
        }
    };

    const handleSignInSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await fetch('http://localhost:4000/loginByPost', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(signInData),
          });
  
          if (response.ok) {
              const result = await response.json();
              console.log(result);
              if (response.status === 200) {
                  alert('Login Successful');
                  navigate('/'); // Redirect to Home.jsx
              } else {
                  alert('Login Failed');
              }
          } else {
              console.error('Login Error:', response.statusText);
              alert('Login Failed');
          }
      } catch (error) {
          console.error('Error during login:', error);
      }
  };
  
    return (
      <div className= "auth-page">
        <div className={`container ${isRightPanelActive ? "right-panel-active" : ""}`} id="container">
            <div className="form-container sign-up-container">
                <form onSubmit={handleSignUpSubmit}>
                    <h1>Create Account</h1>
                    <div className="social-container">
                        <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                    </div>
                    <input type="text" name="username" placeholder="Name" value={signUpData.username} onChange={handleSignUpChange} />
                    <input type="email" name="email" placeholder="Email" value={signUpData.email} onChange={handleSignUpChange} />
                    <input type="password" name="password" placeholder="Password" value={signUpData.password} onChange={handleSignUpChange} />
                    <input type="text" name="mobile" placeholder="Mobile Number" value={signUpData.mobile} onChange={handleSignUpChange} />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form onSubmit={handleSignInSubmit}>
                    <h1>Sign in</h1>
                    <div className="social-container">
                        <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                    </div>
                    <span>or use your account</span>
                    <input type="email" name="email" placeholder="Email" value={signInData.email} onChange={handleSignInChange} />
                    <input type="password" name="password" placeholder="Password" value={signInData.password} onChange={handleSignInChange} />
                    <a href="#">Forgot your password?</a>
                    <button type="submit">Sign In</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button className="ghost" id="signIn" onClick={handleSignInClick}>Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button className="ghost" id="signUp" onClick={handleSignUpClick}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
        </div> 
    );
};

export default LoginForm;
