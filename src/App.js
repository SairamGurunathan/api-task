import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ProtectedRoute from "./Utilities/ProtectedRoute";
import LoginPage from "./Authentication/LoginPage";
import SideBar from "./Components/SideBar";



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
          <SideBar/>
        </ProtectedRoute>
          }/>
      </Routes>
    </div>
  );
}

export default App;
