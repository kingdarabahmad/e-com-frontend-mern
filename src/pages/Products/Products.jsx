import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import List from '../../components/List/List'
import useFetch from '../../hooks/useFetch'
import "./Products.scss"
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

const Products = () => {

  const catId=parseInt(useParams().id)
  const [maxPrice, setMaxPrice]= useState(4000)
  const [sort, setSort]= useState("asc")
  const [selectedSubCat, setSelectedSubCat]= useState([])
  const [show,setShow]=useState(-100)
  const [windowSize,setWindowSize]=useState(window.innerWidth)
  const {products,isLoading,error}= useFetch(`/subcategories?[filters][categories][id][$eq]=${catId}`)
  const {products:category}= useFetch(`/categories/${catId}?populate=*`)
  
  const handleChange=(e)=>{
    const value= e.target.value
    const isChecked= e.target.checked
    setSelectedSubCat(
      isChecked?[...selectedSubCat,value]: selectedSubCat.filter((item)=>(item!==value))
    )
  }
  useEffect(()=>{
    window.addEventListener("resize",()=>{
      setWindowSize(window.innerWidth)
    })
  },[windowSize])

  const handleShow=()=>{
    if(windowSize<=501){

      setShow(0)
    }

  }
  const handleUnshow=()=>{
    if(windowSize<=501){
      setShow(-100)
    }
  }

  return (
    <div className='products'>
      <div  onClick={handleShow}><DoubleArrowIcon className='showFilter'/></div>
      <div className='left' style={{transform:`translate(${show}%)`}}>
        <div className='removebtn' onClick={handleUnshow}>X</div>
        <div className='filterItems'>
          <h2>Product Categories</h2>
          {products.map((item)=>(
            <div className='inputItem' key={item?.id}>
            <input type="checkbox" id={item?.id} value={item?.id} onChange={handleChange}/>
            <label htmlFor={item?.id}>{item?.attributes?.title}</label>
           </div>
          ))}
        </div>
        <div className='filterItems'>
          <h2>Filter by price</h2>
          <div className='inputItem'>
            <span>0</span>
            <input type="range" min={0} max={4000} onChange={(e)=>setMaxPrice(e.target.value)}/>
            <span>{maxPrice}</span>
          </div>
        </div>
        <div className='filterItems'>
          <h2>Sort by</h2>
          <div className='inputItem'>
            <input type="radio" id="asc" value="asc" name="price" onChange={(e)=>setSort("asc")}/>
            <label>Price (Lowest first)</label>
          </div>
          <div className='inputItem'>
            <input type="radio" id="desc" value="desc" name="price" onChange={(e)=>setSort("desc")}/>
            <label>Price (Highest first)</label>
          </div>
        </div>
      </div>
      <div className='right'>
        <img className='catImg'
          src={process.env.REACT_APP_API_UPLOAD_URL + category.attributes?.img?.data?.attributes?.url}
          alt='categoryImg'
        />
        <List catId={catId} maxPrice={maxPrice} sort={sort} subCat={selectedSubCat}/>
      </div>
    </div>
  )
}

export default Products