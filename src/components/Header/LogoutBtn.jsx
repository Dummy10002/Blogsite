import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/Auth'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../store/authSlice'
const LogoutBtn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutHandler=()=>{
    authService.logout()
    .then(() => {
      dispatch(logout())
    })
    .then(() => {
      navigate('/login')
    })
  }
  return (
    <div>
      <button onClick={logoutHandler} className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
        logout
      </button>
    </div>
  )
}

export default LogoutBtn
