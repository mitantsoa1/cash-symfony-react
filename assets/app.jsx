import ReactDOM from "react-dom/client";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { createGlobalState } from "react-hooks-global-states";

import "./bootstrap.js";
import "./styles/app.css";

import Main from "./js/pages/Main.jsx";
import Sidebar from "./js/Sidebar.jsx";

const App = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsConnected(true);
    }
  }, []);

  return (
    <div className="flex w-full">
      <Sidebar isShow={true} isConnected={isConnected} />
      <Main />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <App />
  </Router>
);
