import React from 'react'
import ProductCard from './components/productcard/ProductCard'
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './components/protectedroutes/ProtectRoutes';
import SignUp from './components/signup/SignUp'
import SignIn from './components/signin/SignIn'
import Navbar from './components/navbar/Navbar';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
          <Route path='/products' element={ <ProtectedRoutes><ProductCard /></ProtectedRoutes>} />
      </Routes>
    </div>
  )
}

export default App
