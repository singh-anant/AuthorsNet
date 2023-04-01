import React from "react";
import "./app.css";
// We want to visit differnet pages so we use react router dom
import { RouterProvider } from "react-router-dom";
import Router from "./Router/Router";
// importing componnet from Component Folder
// import Navbar from "./Components/Navbar/Navbar";
// import Footer from "./Components/Footer";

// Importing all pages from WebPage folder
// import Home from "./WebPage/Home";
// import Login from "./WebPage/Login/Login";
// import Register from "./WebPage/Register/Register";
// import Single from "./WebPage/Single";
// import Write from "./WebPage/Write";

const App = () => {
  return (
    <div className="app">
      <div className="container"></div>
      <RouterProvider router={Router} />
    </div>
  );
};

export default App;
