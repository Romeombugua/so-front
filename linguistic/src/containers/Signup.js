import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';
import axios from 'axios';

const Signup = ({ signup, isAuthenticated }) => {
  const [accountCreated, setAccountCreated] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    re_password: ''
  });

  const [error, setError] = useState(null);

  const { first_name, last_name, email, password, re_password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    if (password === re_password) {
      signup(first_name, last_name, email, password, re_password);
      setAccountCreated(true);
    }else{
      setError("Passwords don't match");
    }
  };

  const continueWithGoogle = async () => {
    try {
      const res = await axios.get(
        'http://127.0.0.1:8000/auth/o/google-oauth2/?redirect_uri=http://127.0.0.1:8000/google'
      );

      window.location.replace(res.data.authorization_url);
    } catch (err) {}
  };

  const continueWithFacebook = async () => {
    try {
      const res = await axios.get(
        'http://127.0.0.1:8000/auth/o/facebook/?redirect_uri=http://127.0.0.1:8000/facebook'
      );

      window.location.replace(res.data.authorization_url);
    } catch (err) {}
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  if (accountCreated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="card-title text-center">Sign Up</h1>
              <p className="card-text text-center">Create your Account</p>
              <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="First Name*"
                    name="first_name"
                    value={first_name}
                    onChange={e => onChange(e)}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Last Name*"
                    name="last_name"
                    value={last_name}
                    onChange={e => onChange(e)}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Email*"
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
                    placeholder="Password*"
                    name="password"
                    value={password}
                    onChange={e => onChange(e)}
                    minLength="6"
                    required
                  />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="form-group">
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Confirm Password*"
                    name="re_password"
                    value={re_password}
                    onChange={e => onChange(e)}
                    minLength="6"
                    required
                  />
                </div>
                <button className="btn btn-primary btn-block" type="submit">
                  Register
                </button>
              </form>
              <div className="text-center mt-3">
                {/*<button
                  className="btn btn-danger"
                  onClick={continueWithGoogle}
                >
                  Continue With Google
                </button>
                <button className="btn btn-primary ml-2" onClick={continueWithFacebook}>
                  Continue With Facebook
                </button>
  */}
              </div>
              <p className="text-center mt-3">
                Already have an account? <Link to="/login">Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps, { signup })(Signup);
