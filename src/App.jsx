import { Routes, Route, Navigate } from "react-router-dom";
import Home from './Pages/Home';
import Login from './Componets/User/Login';
import { useSelector } from 'react-redux';
import Register from './Pages/Register';

function App() {
  const isAuth = useSelector((state) => state.ClientAuth.Token);

  return (
    <>
          <Routes>

     
      
      <Route
          path="/*"
          element={isAuth ? <Home /> : <Navigate to="/login" />}
        />

         <Route
          path="/register"
          element={isAuth ? <Navigate to="/" /> : <Register />}
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
