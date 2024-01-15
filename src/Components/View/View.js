import React, { useContext, useEffect, useState } from "react";
import {firestore} from '../../firebase/config'
import { collection, query, where, getDocs } from 'firebase/firestore';
import { PostContext } from '../../ContextStore/PostContext'

import "./View.css";

function View() {

  const {productView,productDetails} = useContext(PostContext)


  const [userDetails, setUserDetails] = useState('')


  useEffect(() => {
    const fetchUserDetails = async () => {
      if (productView && productView.uid) {
        const userInfoCollection = collection(firestore, 'userInfo');
        const userQuery = query(userInfoCollection, where('id', '==', productView.uid));
        
        try {
          const querySnapshot = await getDocs(userQuery);
  
          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setUserDetails(userData);
          } else {
            console.log('User not found');
          }
        } catch (error) {
          console.error('Error fetching user details:', error.message);
        }
      }
    };
  
    fetchUserDetails();
  }, [productView]);


  return (
    <div style={{textAlign:'start'}} className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={productView.imageUrl} alt="" />
      </div>{" "}
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {productView.price} </p>
          <span>{productView.name}</span>
          <p>{productView.category}</p>
          <span>{productView.createdAt}</span>
        </div>
        <div className="productDescription">
            <p className="p-bold">Product Description</p>
            <p>{productView.description}</p>
            
          </div>
        {userDetails &&
          <div className="contactDetails">
            <p className="p-bold">Seller details</p>
            <p>Name : {userDetails.Name}</p>
            <p>Phone : {userDetails.Phone}</p>
          </div>
        }
       
      </div>
    </div>
  );
}
export default View;
