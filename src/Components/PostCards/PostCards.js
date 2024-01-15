import React,{useContext} from 'react'
import Heart from '../../assets/Heart'
import {useNavigate} from "react-router-dom";
// import {PostContext} from "../../contextStore/PostContext";
import "./postcards.css"

import {PostContext} from '../../ContextStore/PostContext'

function PostCards({product,index}) {

  const {productView,productDetails} = useContext(PostContext)

    // let {setPostContent} = useContext(PostContext)//at the time of onClick on post ,the specified post item assigned to postContent by setPostContent function and it will be stored in a global context PostContext
 
    const navigate = useNavigate()//at the time of onClick on post , we want redirect to the view post page

    return (
      <div style={{textAlign: 'start', justifyContent:'start'}} className="card" key={index} onClick={()=>{
        productDetails(product)
        navigate("/view")
      }}>
        <div className="favorite">
          <Heart></Heart>
        </div>
        <div className="image">
          <img src={product.imageUrl} alt="" />
        </div>
        <div className="content">
          <p className="rate">&#x20B9; {product.price}</p>
          <span className="category"> {product.category} </span>
          <p className="name"> {product.name}</p>
        </div>
        <div className="date">
          <span>{product.createdAt}</span>
        </div>
      </div>
       
    )
}

export default PostCards
