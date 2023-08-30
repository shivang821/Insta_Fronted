// import React from 'react'

import { useSelector } from "react-redux";
import ReelComponent from "./ReelComponent";
import {
  LazyComponentProps,
  LazyLoadComponent,
} from "react-lazy-load-image-component";
const AllReels = () => {
  const { reels } = useSelector((state) => state.Reels);
  return (
    <>
      {reels.map((item, i) => {
        return (
          <>
            <LazyLoadComponent>
              <ReelComponent item={item} ind={i} key={i} />
            </LazyLoadComponent>
          </>
        );
      })}
    </>
  );
};

export default AllReels;
