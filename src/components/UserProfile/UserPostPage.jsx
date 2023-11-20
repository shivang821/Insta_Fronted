import "../Profile/postPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import PostCard from "../Profile/PostCard.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import { userPosts_success } from "../../reducers/UserProfileReducer.js";
const PostPage = () => {
  const dispatch = useDispatch();
  const {id}=useParams()
  const player = useRef();
  const {userPosts } = useSelector((state) => state.UserProfile);
  useEffect(() => {
    const getPosts=async()=>{
        const {data}=await axios.get(`/api/userPosts/${id}`)
        dispatch(userPosts_success(data.posts))
    }
    if(userPosts.length===0){
        getPosts()
        localStorage.setItem('currentUser',id)
    }
    return(()=>{
        localStorage.setItem('currentUser',null)
    })
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
            userPosts.map((item,i)=>{
                return (
                    <PostCard item={item} key={i} />
                )
            })
        }
    </div>
  );
};

export default PostPage;
