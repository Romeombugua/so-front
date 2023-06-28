import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import axios from 'axios';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    // Reset the error state on form submit
    setError(null);
    try {
      await login(email, password);
    } catch (err) {
      // Update the error state if the login fails
      setError(err.response.data.detail);
    }
  };

  const continueWithGoogle = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/auth/o/google-oauth2/?redirect_uri=http://127.0.0.1:3000`
      );

      window.location.replace(res.data.authorization_url);
    } catch (err) {
      console.log("Error logging in");
    }
  };

  const continueWithFacebook = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/auth/o/facebook/?redirect_uri=http://127.0.0.1:8000/facebook`
      );

      window.location.replace(res.data.authorization_url);
    } catch (err) {}
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4 shadow">
        <h1 className="card-title text-center">Log In</h1>
        <p className="card-text text-center">Sign into your Account</p>
        {/* Conditionally render the error message */}
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={e => onChange(e)}
              minLength="6"
              required
            />
          </div>
          <button className="btn btn-primary btn-block" type="submit">
            Login
          </button>
        </form>
        {/*<div className="text-center mt-3">
          <button className="btn btn-danger" onClick={continueWithGoogle}>
            Continue With Google
          </button>
          <button className="btn btn-primary ml-2" onClick={continueWithFacebook}>
            Continue With Facebook
          </button>
        </div>
  */}
        <p className="text-center mt-3">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
        <p className="text-center">
          Forgot your Password? <Link to="/reset-password">Reset Password</Link>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
