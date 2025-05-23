import React from 'react'
import {Container,LogoutBtn,Logo} from '../index'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const Header = () => {
  const authStatus = useSelector((state)=>state.auth.status)
  const navigate = useNavigate()
  const navItem =[
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]
  return (
    <header className="py-3 shadow bg-gray-400">
      <Container>
        <nav className="flex items-center">
          <div className="mr-6">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <ul className="flex ml-auto space-x-4 items-center">
            {navItem.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="px-4 py-2 rounded hover:bg-gray-600 hover:text-white transition-colors duration-200 font-medium"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
