import React from "react";

const Loading = () => {
  return (
    <div className="flex text-center items-center justify-center">
      <span>
        <img
          src="/images/Spinner@1x-1.6s-200px-200px.svg"
          alt="chargement ..."
        />
      </span>
    </div>
  );
};

export default Loading;
