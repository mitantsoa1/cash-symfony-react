import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Compte from "./compte/Compte";
import Adresse from "./adresse/Adresse";
import Commission from "./Commission";
import Frais from "./Frais";
import Transaction from "./Transaction";
import Etat from "./Etat";
import Login from "./auth/Login";
import Register from "./auth/Register";

const Main = () => {
  return (
    <div className={`w-5/6 h-screen px-4 pl-3 pr-0 bg-gray-100 ml-1/6 `}>
      <Routes>
        <Route path="/compte" element={<Compte />} />
        <Route path="/adresse" element={<Adresse />} />
        <Route path="/commission" element={<Commission />} />
        <Route path="/frais" element={<Frais />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/etat" element={<Etat />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<div></div>} />
        <Route path="*" element={<Navigate to="/frais" />} />
      </Routes>
    </div>
  );
};

export default Main;
