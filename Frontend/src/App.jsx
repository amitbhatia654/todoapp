import React, { useEffect } from "react";
import "./App.css";
import HomePage from "./Components/HomePage";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <div>
      <HomePage></HomePage>
      <ToastContainer position="bottom-left" />
    </div>
  );
}
