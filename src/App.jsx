import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import './Style.css';
import authService from "./appwrite/Auth"
import { login, logout } from "./store/authSlice"
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => { setLoading(false) })
  }, []);

  return !loading ? (
    <div className="h-auto flex flex-col bg-gray-100">
      <Header />
      <main className="flex-1 container mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null
}

export default App
