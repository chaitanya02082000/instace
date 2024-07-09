import React from 'react';
 

const CardSkeleton = () => {
  return (
    <div className="card-skeleton">
      <div className="media shimmerBG"></div>
      <div className="p-32">
        <div className="title-line shimmerBG"></div>
        <div className="content-line shimmerBG"></div>
        <div className="content-line shimmerBG"></div>
        <div className="content-line shimmerBG"></div>
        <div className="end m-t-24 shimmerBG"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
