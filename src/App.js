import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./App.css";
import SideBar from "./Components/SideBar";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./Pages/ProtectedRoute";
import LoginPage from "./Pages/LoginPage";



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
    </div>
  );
}

export default App;
