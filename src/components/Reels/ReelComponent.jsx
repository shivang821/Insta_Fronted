import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { ReactComponent as MuteIcon } from "../CreateModal/assets/muteIcon.svg";
import { ReactComponent as UnMuteIcon } from "../CreateModal/assets/unMuteIcon.svg";
const ReelComponent = ({ item, mute, handleMute }) => {
  const scrollRef = useRef(null);
  const { device } = useSelector((state) => state.App);
  const ref = useRef();
  const ref1 = useRef();
  const [play, setPlay] = useState(false);
  const callbackFun = (entries) => {
    // if (entries[0].isIntersecting) {
    //   setPlay(true);
    // } else {
    //   setPlay(false);
    // }
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setPlay(true);
        entry.target.mute = false;
        entry.target.autoPlay = true;
      } else {
        setPlay(false);
        entry.target.autoPlay = false;
        entry.target.mute = true;
        entry.target.mute = true;
      }
    });
  };
  const callbackFun1 = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.play();
        entry.target.style.visibility = "visible";
      } else {
        entry.target.pause();
        entry.target.style.visibility = "hidden";
      }
    });
  };
  useEffect(() => {
    const options = {
      threshold: 0.52,
    };
    const observer = new IntersectionObserver(callbackFun, options);
    const observer1 = new IntersectionObserver(callbackFun1, options);
    if (ref1.current) observer1.observe(ref1.current);
    if (ref.current) observer.observe(ref.current);
    if (ref.current) {
      if (play) {
        ref.current.play();
      } else {
        ref.current.pause();
      }
      ref.current.addEventListener("contextmenu", (event) =>
        event.preventDefault()
      );
    }
    if (ref1.current) {
      if (play) {
        ref1.current.play();
      } else {
        ref1.current.pause();
      }
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
        ref.current.removeEventListener("contextmenu", (event) =>
        event.preventDefault()
      );
      }
      if (ref1.current) observer1.unobserve(ref1.current);
    };
  }, [ref, ref1, play]);
  useEffect(() => {}, [device]);
  return (
    <div className="reel" ref={scrollRef}>
      <video
        className="reelVideo"
        ref={ref}
        src={item ? item.posts[0].url : ""}
        loop
        disablePictureInPicture
        controlsList="nodownload nofullscreen noplaybackrate"
        muted={mute}
        onClick={() => handleMute(!mute)}
      ></video>
      {device !== "mob" && (
        <video
          ref={ref1}
          src={item ? item.posts[0].url : ""}
          className="backVideo reelVideo"
          preload="metadata"
          muted
          loop
        ></video>
      )}
      {!mute ? (
        <UnMuteIcon
          className="unMuteIcon icon"
          onClick={() => handleMute(!mute)}
        />
      ) : (
        <MuteIcon className="muteIcon icon" onClick={() => handleMute(!mute)} />
      )}
    </div>
  );
};
ReelComponent.propTypes = {
  item: PropTypes.object,
  ind: PropTypes.number,
  mute: PropTypes.bool,
  handleMute: PropTypes.function,
};
export default ReelComponent;
