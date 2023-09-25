// import React from 'react'
import "./profile.css";
import { motion } from "framer-motion";
import ProfileImg from "../sideBar/instaAssets/userProfileImage.jpg";
import { useSelector } from "react-redux";
const Profile = () => {
  const { user } = useSelector((state) => state.User);
  return (
    <div className="profile">
      <motion.div
        className="profile1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.5 }}
        transition={{
          ease: "linear",
          duration: 0.5,
        }}
      >
        <div className="profile11">
          <div className="profile111">
            <img src={user.Profile ? user.profile.url : ProfileImg} alt="" />
          </div>
          <div className="profile112">
            <div className="userName">
              <h3>{user.username}</h3>
              <div className="userName1">
                <button>Edit profile</button>
                <button>Setting</button>
              </div>
            </div>
          </div>
          <div className="profile113">
            <h4>{user.name}</h4>
            <h4>{user.email}</h4>
          </div>
          <div className="profile114">
            <h4>{user.numberOfPosts} posts</h4>
            <h4>{user.followers.length} followers</h4>
            <h4>{user.following.length} following</h4>
          </div>
        </div>
        <div className="profile12"></div>
      </motion.div>
    </div>
  );
};

export default Profile;
