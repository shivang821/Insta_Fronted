import "./postPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { getMyPosts } from "../../actions/userActions.js";
import PostCard from "./PostCard.jsx";
const PostPage = () => {
  const dispatch = useDispatch();
//   const [page, setPage] = useState(1);
  const player = useRef();
  const {myPosts } = useSelector((state) => state.User);
//   const { device } = useSelector((state) => state.App);
  // const [touch, setTouch] = useState(false);
  useEffect(() => {
    if (myPosts.length === 0) {
      dispatch(getMyPosts());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if(player.current){
    player.current.currentTime=10
    console.log(player.current.currentTime);
  }
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
    <div className="myPosts">
        {
            myPosts.map((item,i)=>{
                return (
                    <PostCard item={item} key={i} />
                )
            })
        }
    </div>
  );
};

export default PostPage;
