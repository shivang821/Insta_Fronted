import "./reels.css";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader.jsx";
import { useEffect, useRef, useState } from "react";
import { getReels } from "../../actions/postAction";
import ReelComponent from "./ReelComponent";
const Reels = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const ref = useRef();
  const { reels, loading, hasMore } = useSelector((state) => state.Reels);
  const { device } = useSelector((state) => state.App);
  // const [touch, setTouch] = useState(false);
  useEffect(() => {
    if (reels.length === 0) {
      dispatch(getReels({ page: 1, limit: 2 }));
    }
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      let a = device === "mob" ? window.innerHeight - 56 : window.innerHeight;
      let b = document.querySelector(".reelsMainDiv").scrollTop;
      let c = document.querySelector(".reelsMainDiv").scrollHeight;
      console.log(a+b," ",c);
      if (a + b >= c) {
        console.log("touch");
        if (!loading && hasMore) {
          setPage((prev) => prev + 1);
          dispatch(getReels({ page: page + 1, limit: 2 }));
        }
        // setTouch(true);
      } else {
        // setTouch(false);
      }
    };
    ref.current.addEventListener("scroll", handleScroll);
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [hasMore, loading, device, dispatch, page]);
  return (
    <motion.div
      ref={ref}
      className="reelsMainDiv"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.5 }}
      transition={{
        ease: "linear",
        duration: 0.5,
      }}
    >
      {reels.map((item, i) => {
        return (
          <>
            <ReelComponent item={item} ind={i} key={i} />
          </>
        );
      })}
      {loading && <Loader/>}
    </motion.div>
  );
};

export default Reels;
