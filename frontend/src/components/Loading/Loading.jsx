import React from "react";
import HasLoader from "react-spinners/HashLoader";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <HasLoader color="#0067ff" />
    </div>
  );
};

export default Loading;
