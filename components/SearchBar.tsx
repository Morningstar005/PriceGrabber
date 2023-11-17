'use client'
import { scrapeAndStoreProduct } from '@/lib/action';
import React, { FormEvent, useState } from 'react'


const isValidAmazonproductURL = (url:string)=>{
  try{
    const parsedURL = new URL(url)
    const hostname = parsedURL.hostname;

    if(hostname.includes('amazon.com')||
    hostname.includes("amazon.") ||
    hostname.includes("amazon")){
      return true
    }
  }catch(error){
    return false
  }
}

const SearchBar = () => {
  const [searchPrompt, setSearchPrompt] = useState('')
  const [loading, setLoading] = useState(false)

    const handlesubmit = async (event:FormEvent<HTMLFormElement>)=>{
      event.preventDefault();
      const isValidLink = isValidAmazonproductURL(searchPrompt)
      // alert(isValidLink?'valid link':"not valind link")

      if(!isValidLink){
        return alert("please provide a valid Amazon link")
      }
      try {

        setLoading(true)
        const product = await scrapeAndStoreProduct(searchPrompt)
        
      } catch (error) {
        console.log(error)
      } finally{
        setLoading(false)
      }
    }
  return (
    <form onSubmit={handlesubmit} className='flex flex-wrap gap-4 mt-12'>
        <input type="text"
        value={searchPrompt}
        onChange={(e)=>setSearchPrompt(e.target.value)}
        placeholder='enter product link'
        className='searchbar-input'
         />
         <button type='submit'
         className='searchbar-btn'
         disabled={searchPrompt ===''}
          >
            {
              loading?"Searching...":"Search"
            }
         </button>
    </form>
  )
}

export default SearchBar