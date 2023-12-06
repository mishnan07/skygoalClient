import { useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './Pages/Home';
import SignUp from './Componets/User/SignUp';
import Login from './Componets/User/Login';
import { useSelector } from 'react-redux';

function App() {
  const isAuth = useSelector((state) => state.ClientAuth.Token);
  console.log(isAuth,'99999999999999999');

  return (
    <>
          <Routes>

     
      
      <Route
          path="/*"
          element={isAuth ? <Home /> : <Navigate to="/login" />}
        />

         <Route
          path="/register"
          element={isAuth ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/login"
          element={isAuth ? <Navigate to="/" /> : <Login />}
        />

     </Routes>
    </>

  )
}

export default App
