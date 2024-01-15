import React, { useRef, useState  } from "react";
import "./Create.css";
import Header from "../Header/Header";

// import GoLoading from "../Loading/GoLoading";

import {auth, firestore } from '../../firebase/config'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore'

const storage = getStorage()

const Create = () => {
  
  const fileInputRef = useRef(null);
  const date = new Date()

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const [nameError, setNameError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [imageError, setImageError] = useState(false);


  const validateName = () => {
    if (name.trim() == '') {
      setNameError(true)
      return true
    }
    else{
      setNameError(false)
      return false
    }
  };

  const validateCategory = () => {
    if (category == '') {
      setCategoryError(true)
      return true
    }
    else{
      setCategoryError(false)
      return false
    }
  };

  const validatePrice = () => {
    if (price == ''  || price < 0) {
      setPriceError(true)
      return true
    }
    else{
      setPriceError(false)
      return false
    }
  };

  const validateDescription = () => {
    if (description.trim() == '') {
      setDescriptionError(true)
      return true
    }
    else{
      setDescriptionError(false)
      return false
    }
  };

  const validateImage = () => {
    if (image == '') {
      setImageError(true)
      return true
    }
    else{
      setImageError(false)
      return false
    }
  };

  const submit = async (e) => {
    e.preventDefault();
  
    const vn = validateName();
    const vc = validateCategory();
    const vp = validatePrice();
    const vd = validateDescription();
    const vi = validateImage();

   
    if (!vn && !vc && !vp && !vd && !vi) {
      
      const user = auth.currentUser;
  
      if (user) {

        const storageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(storageRef, image);
    
        const url = await getDownloadURL(storageRef);
        setImageUrl(url);

        const dbCollection = collection(firestore, 'products');
        await addDoc(dbCollection, {
          uid: user.uid,
          name: name,
          category: category,
          price: price,
          description: description,
          imageUrl: url,
          createdAt: date.toDateString(),
        });
  
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
  
        // Reset the input values
        setName('');
        setCategory('');
        setPrice('');
        setDescription('');
        setImage('');
        setImageUrl('')

  
        console.log('Image uploaded and product added:', url);
      } else {
        console.log('User not signed in.');
      }
    }
    else{
      console.log('empty fields');
    }
  };
  


  return (

    <>
      <Header />
      <div style={{ textAlign: 'start' }} className="centerDiv">
        <label>Name</label>
        <br />
        <input
          className="input"
          type="text"
          name="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={validateName}
        />
        <div className={'error'}>{nameError ? 'Name is required.' : ''}</div>
        <br />
        <label>Category:</label>
        <select
          name="Category"
          onChange={(e) => setCategory(e.target.value)}
          onBlur={validateCategory}
          className="input"
        >
          <option >Select Category</option>
          <option value="Cars">Cars</option>
          <option value="Cameras & Lenses">Cameras & Lenses</option>
          <option value="Computers & Laptops">Computers & Laptops</option>
          <option value="Mobile Phones">Mobile Phones</option>
          <option value="Motorcycles">Motorcycles</option>
          <option value="Tablets">Tablets</option>
        </select>
        <div className={'error'}>{categoryError ? 'Select a category.' : ''}</div>
        <br />
        <label>Price</label>
        <br />
        <input
          className="input"
          type="number"
          name="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          onBlur={validatePrice}
        />
        <div className={'error'}>{priceError ? 'Price must be a positive number.' : ''}</div>
        <br />
        <label>Description</label>
        <br />
        <input
          className="input"
          type="text"
          name="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={validateDescription}
        />
        <div className={'error'}>{descriptionError ? 'Description is required.' : ''}</div>
        <br />
        <img
          alt="Posts"
          width="100px"
          height="100px"
          src={image ? URL.createObjectURL(image) : ''}
        />
        <div className={'error'}>{imageError ? 'Please select an image.' : ''}</div>
        <br />
        <input
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
            // validateImage();
          }}
          onBlur={validateImage}
          ref={fileInputRef} 
        />
        <br />
        <button className="uploadBtn" onClick={submit}>
          Upload and Submit
        </button>
      </div>
    </>
  );
  

};

export default Create;
