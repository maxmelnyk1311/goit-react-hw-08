import { useDispatch } from 'react-redux';
import { refreshUser } from '../../redux/auth/authOps.js';
import { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import AppBar from "../AppBar/AppBar.jsx";
import { RestrictedRoute } from '../RestrictedRoute/RestrictedRoute.jsx';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute.jsx';

const HomePage = lazy(() => import('../../pages/HomePage.jsx'));
const RegisterPage = lazy(() => import('../../pages/RegisterPage.jsx'));
const LoginPage = lazy(() => import('../../pages/LoginPage.jsx'));
const ContactsPage = lazy(() => import('../../pages/ContactsPage.jsx'));

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => 
    {
      dispatch(refreshUser());
    }, 
    [dispatch]
  );

  return (
    <>
      <AppBar />
    
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/login" element={<RestrictedRoute component={<LoginPage />}/>} />
          <Route path="/register" element={<RestrictedRoute component={<RegisterPage />}/>} />
          <Route 
            path="/contacts" 
            element={
              <PrivateRoute 
                component={<ContactsPage />} 
                redirectTo="/login"
              />} 
          />
        </Routes>
      </Suspense>
    </>
  )
}


