import { useEffect, useState } from "react";
import { makeRequest } from "../makeRequest";

const useFetch=(url)=>{

    const [products,setProducts]=useState([])
    const [isLoading,setIsLoading]=useState(false)
    const [error,setError]=useState(false)

    useEffect(()=>{
        const fetchProducts=async ()=>{
            try {
                setIsLoading(true)
                const {data}= await makeRequest.get(url)
                setProducts(data.data)
            } catch (error) {
                setError(true)
                
            }

            setIsLoading(false)
        }
        fetchProducts()
    },[url])

    return {isLoading, error, products}

}

export default useFetch