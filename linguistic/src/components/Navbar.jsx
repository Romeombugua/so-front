import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const Navbar = ({ isAuthenticated, logout }) => {
  const guestLinks = (
    <Fragment>
      <li className='nav-item'>
        <Link className='nav-link' to='/signup'>Sign Up</Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/login'>
          <span style={{backgroundColor:'red', borderRadius:'10px', padding:'0.5em'}}>Login</span>
        </Link>
      </li>

    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <li className='nav-item'>
        <Link className='nav-link' to='/transcripts'>My Transcripts</Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/translations'>My Translations</Link>
      </li>
      <li className='nav-item'>
        <a className='nav-link' href='#!' onClick={logout}>Logout</a>
      </li>
    </Fragment>
  );

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light fixed-top'>
      <div className='container'>
        <Link className='navbar-brand' to='/' style={{fontWeight:'bold'}}>LinguifyHub</Link>
        <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav'
          aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse justify-content-end' id='navbarNav'>
          <ul className='navbar-nav'>
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);
