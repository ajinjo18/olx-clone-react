import React, { useState }  from "react";
import { Link } from "react-router-dom";

import Logo from "../../olx-logo.png";
import "./Login.css";

import { auth, signInWithEmailAndPassword } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';



function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loginErr, setLoginErr] = useState(false)

  const navigate = useNavigate()

  const submit = async(e)=>{
    e.preventDefault()
    try{
      setLoginErr(false)
      await signInWithEmailAndPassword(auth, email, password)
      // toast.success('Login successful!', {
      //   position: 'top-right',
      //   autoClose: 3000, // Close the notification after 3 seconds
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      // });
      // const success = success('Login successful!', {
      //   position: 'top-right',
      //   autoClose: 3000, // Close the notification after 3 seconds
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      // });
      // sessionStorage.setItem(success);
      navigate('/')
    }
    catch(error){
      console.error(error.message);
      setLoginErr(true)
    }
  }

  const closeModal = ()=>{
    navigate('/')
  }
  
  return (<>
    {/* {loading && <RoundLoading/> } */}
    <ToastContainer />
    <div>
      <div className="loginParentDiv">
        <div style={{ textAlign: 'end' }}>
          <FontAwesomeIcon
            icon={faTimes}
            onClick={closeModal}
            style={{ fontSize: '1.5em', cursor: 'pointer' }}
          />
        </div>
        <img width="200px" height="200px" src={Logo} alt=""></img>
        <div style={{ textAlign: 'center' }}>
            {loginErr && <i style={{ color: 'red' }}>Invalid credentials</i>}
        </div>
        <form style={{textAlign:'start'}} onSubmit={submit} >
          <label>Email</label>
          <br />
          <input
            onChange={(e)=>setEmail(e.target.value)}
            className="input"
            type="email"
            name="email"
          />
          <br />
          <label>Password</label>
          <br />
          <input
            onChange={(e)=>setPassword(e.target.value)}
            className="input"
            type="password"
            name="password"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to="/signup">Signup</Link>
      </div> 
    </div>
    </>
  );
}

export default Login;
