import { useEffect, useState } from "react";
import "./search.css";
import { motion } from "framer-motion";
const Search = () => {
  const [Arr, setArr] = useState([]);
  useEffect(() => {
    const imgArr = [
      {
        type: "img",
      },
      {
        type: "img",
      },
      {
        type: "img",
      },
      {
        type: "img",
      },
      {
        type: "img",
      },
      {
        type: "img",
      },
      {
        type: "img",
      },
      {
        type: "img",
      },
      {
        type: "img",
      },
      {
        type: "img",
      },
      {
        type: "img",
      },
      {
        type: "img",
      },
      {
        type: "img",
      },
      {
        type: "img",
      },
      {
        type: "img",
      },
      {
        type: "img",
      },
      {
        type: "img",
      },
      {
        type: "img",
      },
      {
        type: "img",
      },
      {
        type: "img",
      },
      {
        type: "img",
      },
      {
        type: "img",
      },
      {
        type: "img",
      },
      {
        type: "img",
      },
      {
        type: "img",
      },
      {
        type: "img",
      },
      {
        type: "img",
      },
      {
        type: "img",
      },
      {
        type: "img",
      },
      {
        type: "img",
      },
      {
        type: "img",
      },
      {
        type: "img",
      },
      {
        type: "img",
      },
      {
        type: "img",
      },
      {
        type: "img",
      },
      {
        type: "img",
      },
      {
        type: "img",
      },
      {
        type: "img",
      },
      {
        type: "img",
      },
    ];
    function swap() {
      let ind = 2;
      let isRight = true;
      for (let i = 0; i < imgArr.length && ind < imgArr.length; i++) {
        imgArr[ind].type = "vid";
        imgArr[ind] = { ...imgArr[ind], className: "vid" };
        if (isRight) {
          ind += 6;
          isRight = false;
        } else {
          ind += 10;
          isRight = true;
        }
      }
    }
    swap();
    setArr(imgArr);
  }, []);
  return (
    <div className="search">
      <motion.div
        className="search2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.5 }}
        transition={{
          ease: "linear",
          duration: 0.5,
        }}
      >
        <div className="searchCenter">
          {Arr.map((item, i) => {
            return (
              <div key={i} className={item.type}>
                {item.type === "vid" ? (
                  <div className="vidDiv">
                    <h3>{i + 1}</h3>
                  </div>
                ) : (
                  <div className="imgDiv">
                    <h3>{i + 1}</h3>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Search;
