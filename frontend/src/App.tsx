import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/user/login';
import RegisterPage from './pages/user/register';
import ProfilePage from './pages/user/Profile';
import AdminMainPage from './pages/admin';
import { useSelector } from 'react-redux';

function App() {
  const { user } = useSelector((state: any) => state.user);
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <NavBar />
        </header>
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users/login' element={<LoginPage />} />
        <Route path='/users/register' element={<RegisterPage />} />
        <Route path='/users/profile/:id' element={<ProfilePage />} />
        {
          user !== null && user.isAdmin && 
          <Route path='/admin' element={<AdminMainPage />} />
        }
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
