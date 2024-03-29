import "./reelPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getMyReels } from "../../actions/userActions.js";
import { ReactComponent as CancelIcon } from "./assets/crossImage.svg";
import { ReactComponent as ArrowIcon } from "./assets/arrowImage.svg";
import { motion } from "framer-motion";
import ReelCard from "./ReelCard.jsx";
// import ReelComponent from "../Reels/ReelComponent.jsx";
import { ReactComponent as MuteIcon } from "../CreateModal/assets/muteIcon.svg";
import { ReactComponent as UnMuteIcon } from "../CreateModal/assets/unMuteIcon.svg";
const ReelPage = () => {
  const dispatch = useDispatch();
  const [mute, setMute] = useState(true);
  const [currentReel, setCurrentReel] = useState(null);
  const [ind, setInd] = useState(null);
  const videoRef = useRef(null);
  const left = useRef(null);
  const right = useRef(null);
  const player = useRef();
  const { myReels } = useSelector((state) => state.User);
  useEffect(() => {
    if (myReels.length === 0) {
      dispatch(getMyReels());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (player.current) {
    player.current.currentTime = 10;
  }
  const handleMute = (muteValue) => {
    setMute(muteValue);
  };

  useEffect(() => {
    if (currentReel) {
      setCurrentReel(myReels[ind]);
    }
  }, [ind]);
  const forward = () => {
    if (ind < myReels.length - 1) {
      setInd((pre) => pre + 1);
    }
  };
  const backward = () => {
    if (ind > 0) {
      setInd((pre) => pre - 1);
    }
  };
  //   const setCurrentReelFunc=(item)=>{
  //     setCurrentReel
  //   }
  //   useEffect(() => {
  //     const observer = new IntersectionObserver(
  //       (entries) => {
  //         if (entries[0].isIntersecting) {
  //           if (!loading && hasMorePosts) {
  //             setPage((prev) => prev + 1);
  //             dispatch(getReels({ page: page + 1, limit: 5 }));
  //           }
  //         }
  //       },
  //       { threshold: .8 }
  //     );
  //     if (ref.current.children[reels.length - 1]) {
  //       observer.observe(ref.current.children[reels.length - 1]);
  //     }
  //     return () => {
  //       if (ref.current&&ref.current.children[reels.length - 1]) {
  //         observer.unobserve(ref.current.children[reels.length - 1]);
  //       }
  //     };
  //   }, [ref, reels.length, loading,hasMore,page,dispatch],device);
  return (
    <div className="myReels">
      {myReels.map((item, i) => {
        return (
          <div
            key={i}
            className="myReelsDiv"
            onClick={() => {
              setCurrentReel(item);
              setInd(i);
            }}
          >
            <ReelCard item={item} />
          </div>
        );
      })}
      {currentReel !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.5 }}
          transition={{
            ease: "ease",
            duration: 0.3,
          }}
          className="reelModal"
        >
          <div
            className="reelComponentdiv"
            ref={videoRef}
            style={{ height: "auto", width: "auto" }}
            onClick={() => handleMute(!mute)}
          >
            <div className="reel reelVid">
              <video
                className="reelVideo"
                src={currentReel.posts[0].url}
                loop
                autoPlay
                disablePictureInPicture
                controlsList="nodownload nofullscreen noplaybackrate"
                muted={mute}
              ></video>
              <div className="actionDiv">
                {!mute ? (
                  <UnMuteIcon
                    className="unMuteicon "
                    onClick={() => handleMute(!mute)}
                  />
                ) : (
                  <MuteIcon
                    className="muteicon "
                    onClick={() => handleMute(!mute)}
                  />
                )}
              </div>
              {/* <div className="gradientDiv"></div> */}
            </div>
          </div>
          <CancelIcon
            className="cancelDiv"
            onClick={() => {
              setCurrentReel(null);
            }}
          />
          <ArrowIcon ref={right} style={{display:`${ind===myReels.length-1?'none':'block'}`}} className="forward" onClick={forward} />
          <ArrowIcon ref={left} style={{display:`${ind===0?'none':'block'}`}} className="backward" onClick={backward} />
        </motion.div>
      )}
    </div>
  );
};

export default ReelPage;
