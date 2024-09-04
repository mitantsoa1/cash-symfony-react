import React from "react";
import { Link } from "react-router-dom";

function SidebarItem({ to, children, isConnected, isShow = true, onClick }) {
  var hover = "";
  var cursor = " cursor-default ";

  if (isConnected) {
    hover = " hover:bg-blue-500 ";
    cursor = " cursor-pointer ";
  }

  return (
    <li
      className={`h-16 pl-3 border-b ${cursor}  border-gray-300/20  ${hover} ${
        isShow ? "block" : "hidden"
      }`}
    >
      {isConnected ? (
        <Link
          to={to}
          className="flex items-center w-full h-full font-normal text-white"
          onClick={onClick}
        >
          {children}
        </Link>
      ) : (
        <span className="flex items-center w-full h-full font-normal text-white opacity-50 ">
          {children}
        </span>
      )}
    </li>
  );
}

export default SidebarItem;
