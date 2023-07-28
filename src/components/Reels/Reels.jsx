
import { useEffect, useState } from 'react'
import './reels.css'
import { motion } from 'framer-motion'
const Reels = () => {
  const [Arr,setArr]=useState([])
  useEffect(()=>{
    const imgArr=[
      {
        type: 'img'
      },
      {
        type: 'img'
      },
      {
        type: 'img'
      },
      {
        type: 'img'
      },
      {
        type: 'img'
      },
      {
        type: 'img'
      },
      {
        type: 'img'
      },
      {
        type: 'img'
      },
      {
        type: 'img'
      },
      {
        type: 'img'
      },
      {
        type: 'img'
      },
      {
        type: 'img'
      },
      {
        type: 'img'
      },
      {
        type: 'img'
      },
      {
        type: 'img'
      },
      {
        type: 'img'
      },
      {
        type: 'img'
      },
      {
        type: 'img'
      },
      {
        type: 'img'
      },
      {
        type: 'img'
      },
      {
        type: 'img'
      },
      {
        type: 'img'
      },
      {
        type: 'img'
      },
      {
        type: 'img'
      },
      {
        type: 'img'
      },
      {
        type: 'img'
      },
      {
        type: 'img'
      },
      {
        type: 'img'
      },
      {
        type: 'img'
      },
      {
        type: 'img'
      },
      {
        type: 'img'
      },
      {
        type: 'img'
      },
      {
        type: 'img'
      },
      {
        type: 'img'
      },
      {
        type: 'img'
      },
      {
        type: 'img'
      },
      {
        type: 'img'
      },
      {
        type: 'img'
      },
      {
        type: 'img'
      },
    ]
    // const vidArr=[
    //   {
    //     type: 'vid'
    //   },
    //   {
    //     type: 'vid'
    //   },
    //   {
    //     type: 'vid'
    //   },
    //   {
    //     type: 'vid'
    //   },
    //   {
    //     type: 'vid'
    //   },
    //   {
    //     type: 'vid'
    //   },
    // ]
    // const [isRight,setIsRight]=useState(true);
    function swap(){
      let ind=2;
      let isRight=true;
      // for(let i=0;i<vidArr.length;i++){
      //   imgArr.splice(ind,0,vidArr[i]);
      //   if(isRight){
      //     ind+=6;
      //     isRight=false;
      //   }else{
      //     ind+=10;
      //     isRight=true;
      //   }
      // }
      for(let i=0;i<imgArr.length&&ind<imgArr.length;i++){
        imgArr[ind].type='vid';
        imgArr[ind]={...imgArr[ind],className:'vid'}
        if(isRight){
          ind+=6;
          isRight=false;
        }else{
          ind+=10;
          isRight=true;
        }
      }
    }
    swap()
    setArr(imgArr)
  },[])
  return (
    <motion.div
      className='reels'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{opacity: 0.5 }}
      transition={{
        ease: "linear",
        duration: .5,
      }}
    >
      <div className='reelsCenter' >
        {Arr.map((item, i) => {
          return (
            <div key={i} className={item.type}>
              {item.type==='vid'? <div className='vidDiv'><h3>{i+1}</h3></div>: <div className="imgDiv"><h3>{i+1}</h3></div> }
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default Reels