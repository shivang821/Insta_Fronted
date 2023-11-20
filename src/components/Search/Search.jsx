import "./search.css";
import { motion } from "framer-motion";

import { ReactComponent as CancelIcon } from "../Profile/assets/crossImage.svg";
import { ReactComponent as SearchIcon } from "./assets/searchIcon.svg";
import { useEffect, useState } from "react";
import axios from "axios";
const Search = () => {
  const[inpValue,setInpValue]=useState();
  const  handleChange=(e)=>{
    setInpValue(e.target.value)
  }
  const fetchData=async()=>{
    const {data}=await axios.get(`/api/searchResult/${inpValue}`)
    console.log(data.result);
  }
  useEffect(()=>{
    const id=setTimeout(()=>{
      if(inpValue){
        fetchData()
      }
    },[2000])
    return(()=>{
      clearTimeout(id)
    })
  },[inpValue])
  return (
    <motion.div
      className="search"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.5 }}
      transition={{
        ease: "linear",
        duration: 0.5,
      }}
    >
      <div className="search2">
        <div className="search21">
          <div>
            {<SearchIcon className='searchIcon'/>}
            <input type="text" value={inpValue} onChange={handleChange} placeholder='Search' />
            {inpValue&&<CancelIcon onClick={()=>setInpValue("")} />}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Search;
