import React, { useContext,useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { IsUserContext } from "../../ContextStore/UserContext";
import { AllPost } from '../../ContextStore/AllPostContext'
import { signOut, auth } from '../../firebase/config';
import { PostContext } from '../../ContextStore/PostContext'


import "./Header.css";

import OlxLogo from "../../assets/OlxLogo";
import SearchIcon from "../../assets/SearchIcon"
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";

import Search from '../Search/Search';

function Header() {

    const user = useContext(IsUserContext) 
    const {productView,productDetails} = useContext(PostContext)
    const navigate = useNavigate()
    
    const handleLogout = async () => {
        try {
          await signOut(auth);
          navigate('/')
        } 
        catch (error) {
          console.error('Error signing out:', error.message);
        }
    };

    const allPost = useContext(AllPost)


    const [wordEntered, setWordEntered] = useState("");



    const searchProduct = () => {
        if (wordEntered) {
        const result = allPost.find(product => product.name.toLowerCase() === wordEntered.toLowerCase());
    
        if (result) {
            productDetails(result);
            navigate('/view');
        } else {
            alert("No items found..");
        }
        } else {
        alert("No items found.., please search by product name");
        }
    };


  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <input type="text" 
          placeholder="Search specific product..."
          onChange={(e)=>setWordEntered(e.target.value)}
        />
          <div onClick={searchProduct}> <SearchIcon /> </div>
    
         
        </div>
        <div className="productSearch">
            <div className="search">
                <div className="searchInputs">
                    <input
                    type="text"
                    placeholder="Find Cars,Mobile,Motorcycles and more..."
                    />
                    <div className="searchIcon">          
                    <div> <SearchIcon /> </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {user ? (
            user
          ) : (
            <Link to="/login">
              <span>Login</span>
            </Link>
          )}
          <hr />
        </div>
        {user && (
          <span onClick={handleLogout} className="logout-span">
            Logout
          </span>
        )}
        
        <Link to="/create">
          {" "}
          <div className="sellMenu">
            <SellButton></SellButton>
            <div className="sellMenuContent">
              <SellButtonPlus></SellButtonPlus>
              <span>SELL</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
    
}

export default Header;
