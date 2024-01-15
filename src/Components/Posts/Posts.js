import React, { useState, useEffect, useContext } from "react";
// import { Link } from "react-router-dom";

import "./Post.css";

import {firestore,query,orderBy,limit} from '../../firebase/config'
import { collection, getDocs } from 'firebase/firestore'
import PostCards from "../PostCards/PostCards";
import { AllPost } from '../../ContextStore/AllPostContext'


function Posts() {

  let [posts2, setPosts2] = useState([]);

  const allPost = useContext(AllPost)

  useEffect(() => {
    const fetchProducts2 = async () => {
      try {
        const productCollection = collection(firestore, 'products');
  
        const totalProductsSnapshot = await getDocs(productCollection);
      const totalProducts = totalProductsSnapshot.size;

      const querySnapshot = await getDocs(
        query(
          productCollection,
          orderBy('name'),
          limit(5)
        )
      );
  
        const productsData = [];
        querySnapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() });
        });
        setPosts2(productsData);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };
  
    fetchProducts2();
  }, []);

  
  let freshRecomendationCards = posts2.slice(0, 5).map((product, index) => (
    <div className="fresh-recomendation-card" key={index}>
      <PostCards product={product} index={index} />
    </div>
  ));
  

  let quickMenuCards = allPost.map((product, index) => {
    return(<div className="quick-menu-cards" key={index}> <PostCards product={product} index={index} /> </div>);
  });



return (
  <div style={{justifyContent:'start'}} className="postParentDiv">
    {allPost && (
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          {/* <Link to="./viewmore">
            {" "}
            <span>View more</span>{" "}
          </Link> */}
        </div>
        <div className="cards">
          {" "}
          {quickMenuCards}
        </div>
      </div>
    )}
   <div className="recommendations">
      <div className="heading">
        <span>Fresh recommendations</span>
      </div>
      <div className="fresh-recomendation-cards cards">{freshRecomendationCards}</div> 
    </div> 
  </div>
);
}

export default Posts;
