import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
// import { easeInOut } from "framer-motion";
// import { useInView } from "react-intersection-observer"
import { LazyLoadComponent } from "react-lazy-load-image-component";

const ReelComponent = ({ item }) => {
  const scrollRef = useRef(null);

  const { device } = useSelector((state) => state.App);
  const ref = useRef();
  const ref1 = useRef();
  const [play, setPlay] = useState(false);
  const calbackFun = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setPlay(true);
      } else {
        setPlay(false);
      }
    });
  };
  const calbackFun1 = (entries) => {
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
      threshold: 1,
    };
    const observer = new IntersectionObserver(calbackFun, options);
    const observer1 = new IntersectionObserver(calbackFun1, options);
    if (ref1.current) observer1.observe(ref1.current);
    if (ref.current) observer.observe(ref.current);
    if (ref.current) {
      if (play) {
        ref.current.play();
      } else {
        ref.current.pause();
      }
    }
    return () => {
      if (ref.current) observer.unobserve(ref.current);
      if (ref1.current) observer1.unobserve(ref1.current);
    };
  }, [ref, ref1, play]);
  useEffect(() => {}, [device]);
  return (
    <div className="reel" ref={scrollRef}>
      <LazyLoadComponent>
        <video
          className="reelVideo"
          autoPlay
          ref={ref}
          src={item ? item.posts[0].url : ""}
          muted
          loop
          preload="metadata"
        ></video>
        {device !== "mob" && (
          <video
            autoPlay
            ref={ref1}
            src={item ? item.posts[0].url : ""}
            className="backVideo reelVideo"
            muted
            loop
          ></video>
        )}
      </LazyLoadComponent>
    </div>
  );
};
ReelComponent.propTypes = {
  item: PropTypes.object,
  ind: PropTypes.number,
};
export default ReelComponent;
