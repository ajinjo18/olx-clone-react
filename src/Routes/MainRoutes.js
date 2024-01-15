import React, { useState, useEffect } from 'react'
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
// import {firestore,query,startAt,orderBy,endAt,limit} from '../../firebase/config'
import { collection, getDocs } from 'firebase/firestore'

import Home from '../Pages/Home'
import LoginPage from '../Pages/Login'
import SignupPage from '../Pages/Signup'
import Create from '../Components/Create/Create'
import View from '../Components/View/View'

import { IsUserContext } from '../ContextStore/UserContext'
import { PostContext } from '../ContextStore/PostContext'
import { AllPost } from '../ContextStore/AllPostContext'
import { auth, firestore } from '../firebase/config'

const MainRoutes = () => {

    const [user, setUser] = useState('')
    const [productView, setProductView] = useState('')
    const [allPost, setAllPost] = useState([])

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
          if (authUser) {
            setUser(authUser.displayName);
          } 
          else {
            setUser('');
          }
    
        });
      
        return () => unsubscribe();
    }, []);

    const productDetails = (item)=>{
        setProductView(item)
    }

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const productCollection = collection(firestore, 'products');
            const querySnapshot = await getDocs(productCollection);
    
            const productsData = [];
            querySnapshot.forEach((doc) => {
              productsData.push({ id: doc.id, ...doc.data() });
            });
            setAllPost(productsData);
          } catch (error) {
            console.error('Error fetching products:', error.message);
          }
        };
    
        fetchProducts();
    }, []);



  return (
    <AllPost.Provider value={allPost}>
        <IsUserContext.Provider value={user} >
            <PostContext.Provider value={ {productView,productDetails}} >
                <Router>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={user ? <Home /> : <LoginPage />} />
                        <Route path='/Signup' element={user ? <Home /> : <SignupPage />} />
                        <Route path='/create' element={user ? <Create /> : <LoginPage />} />
                        <Route path='/view' element={<View />} />
                    </Routes>
                </Router>
            </PostContext.Provider>
        </IsUserContext.Provider>
    </AllPost.Provider>
  )
}

export default MainRoutes
