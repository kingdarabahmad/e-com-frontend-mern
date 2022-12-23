import React, { useState } from 'react'
import "./Product.scss"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import BalanceIcon  from "@mui/icons-material/Balance"
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import {useDispatch} from "react-redux"
import {addToCart} from "../../redux/cartSlice"

const Product = () => {
  const id=useParams().id
  const [selectedImg, setSelectedImg] =useState("img")
  const [quantity, setQuantity]= useState(1)
  const dispatch=useDispatch()

  const {products, isLoading, error}=useFetch(`/products/${id}?populate=*`)

  return (
    <div className='product'>
    {isLoading? "loading" : <>
    <div className='left'>
        <div className='images'>
          <img src={process.env.REACT_APP_API_UPLOAD_URL+products?.attributes?.img?.data?.attributes?.url} alt="" onClick={()=>setSelectedImg("img")}/>
          <img src={process.env.REACT_APP_API_UPLOAD_URL+products?.attributes?.img2?.data?.attributes?.url} alt="" onClick={()=>setSelectedImg("img2")}/>
        </div>
        <div className='mainImg'>
        {products.length!==0 ?<img src={process.env.REACT_APP_API_UPLOAD_URL+products?.attributes[selectedImg]?.data?.attributes?.url} alt=""/>:" "}  
        </div>
      </div>
      <div className='right'>
        <h1>{products?.attributes?.title}</h1>
        <span className='price'>₹{products?.attributes?.price}</span>
        <p>{products?.attributes?.desc}</p>
        <div className='quantity'>
          <button onClick={()=>setQuantity((prev)=>(prev===1?1:prev-1))}>-</button>
          {quantity}
          <button onClick={()=>setQuantity(prev=>prev+1)}>+</button>
        </div>
        <button className='add' onClick={()=>dispatch(addToCart({
          id:products.id,
          title:products.attributes.title,
          desc:products.attributes.desc,
          price:products.attributes.price,
          img:products.attributes.img.data.attributes.url,
          quantity,
        }))}>
          <AddShoppingCartIcon/> ADD TO CART
        </button>
        <div className='link'>
          <div className='item'>
            <FavoriteBorderIcon/> ADD TO WISH LIST
          </div>
          <div className='item'>
            <BalanceIcon/> ADD TO COMPARE
          </div>
        </div>
      </div>
    </>}
      
    </div>
  )
}

export default Product