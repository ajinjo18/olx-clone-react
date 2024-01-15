import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../olx-logo.png";
import "./Signup.css";

// import SignUpLoading from "../Loading/SignUpLoading";

import {createUserWithEmailAndPassword,auth,firestore,updateProfile} from '../../firebase/config'
import {collection, addDoc} from 'firebase/firestore'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


export default function Signup() {

  const navigate = useNavigate()

  // State variables
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // Error messages
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // User exist
  const [userExistErr, setUserExistErr] = useState(false)


  // Validation functions
  const validateName = () => {
    if (!name) {
      setNameError('Name required');
      return true
    } else {
      setNameError('');
      return false
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Valid email required.');
      return true
    } else {
      setEmailError('');
      return false
    }
  };

  const validatePhone = () => {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      setPhoneError('Valid 10-digit phone.');
      return true
    } else {
      setPhoneError('');
      return false
    }
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError('Use a strong password');
      return true
    } else {
      setPasswordError('');
      return false
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const vn = validateName();
    const ve = validateEmail();
    const vpa = validatePhone();
    const vph = validatePassword();


    if (!vn && !ve && !vpa && !vph) {

      console.log(2);

      const dbCollection = collection(firestore, 'userInfo')

      const register = async()=>{

        try {
          setUserExistErr(false)
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          await updateProfile(userCredential.user, { displayName: name });


          await addDoc(dbCollection,{id:userCredential.user.uid , Name:name , Email:email , Phone:phone})
          navigate('/login')
        }
        catch (error) {
          console.error('Error signing up:', error.message);
          setUserExistErr(true)
        }
      }

      register()
    }
    else{
      console.log('validation error');
    }
  };


  const closeModal = ()=>{
    navigate('/')
  }


  return (<>
    {/* {loading && <SignUpLoading/> }  */}
    <div>
      <div className="signupParentDiv">
        <div style={{ textAlign: 'end' }}>
          <FontAwesomeIcon
            icon={faTimes}
            onClick={closeModal}
            style={{ fontSize: '1.5em', cursor: 'pointer' }}
          />
        </div>
        <img width="200px" height="200px" src={Logo} alt=""></img>
        <div style={{ textAlign: 'center', marginTop:'-30px', marginBottom: '20px' }}>
            {userExistErr && <i style={{ color: 'red' }}>User exist</i>}
        </div>
        <form style={{ textAlign: 'start' }} onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label>Full Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={validateName}
              name="name"
            />
            {nameError && <div style={{color:'red'}} className="error">{nameError}</div>}
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Email</label>
            <br />
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
              name="email"
            />
            {emailError && <div style={{color:'red'}} className="error">{emailError}</div>}
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Phone</label>
            <br />
            <input
              className="input"
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={validatePhone}
              name="phone"
            />
            {phoneError && <div style={{color:'red'}} className="error">{phoneError}</div>}
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Password</label>
            <br />
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={validatePassword}
              name="password"
            />
            {passwordError && <div style={{color:'red'}} className="error">{passwordError}</div>}
          </div>

          <br />
          <button type="submit">Signup</button>
        </form>
        <Link to="/login">Login</Link>
      </div>
    </div> 
    </>
  );
}

