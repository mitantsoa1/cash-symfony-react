import React from "react";

const Entete = ({ children }) => {
  return (
    <div className="flex-grow  overflow-hiddenmin-h-10 max-h-10">
      <h3 className="text-2xl font-semibold">{children}</h3>
    </div>
  );
};

export default Entete;
