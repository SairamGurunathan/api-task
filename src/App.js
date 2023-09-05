import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./App.css";
import SideBar from "./Components/SideBar";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./Components/LoginPage";
import ProtectedRoute from "./Components/ProtectedRoute";
// import { ToastContainer } from "react-toastify";



function App() {
  const [isAuthenticated,setIsAuthenticated] = useState(false);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={  
        <LoginPage setIsAuthenticated={setIsAuthenticated}/> 
        }/>

        <Route path="/dashboard" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <SideBar  />
        </ProtectedRoute>
          }/>
      </Routes>
      {/* <ToastContainer/> */}
    </div>
  );
}

export default App;
