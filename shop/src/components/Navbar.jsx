import React, { useContext, useState } from 'react'
import { getCsrfToken } from '../getCsrfToken'
import api from '../api'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../App'
import '../css/navbar.css'
import profilePic from "../assets/profile_icon.png"
import cartPic from "../assets/cart_icon.png"
import axios from 'axios'
export const Navbar = () => {
  const { username, setUsername, isLoggedIn, setIsLoggedIn,cartCount,setCartCount } = useContext(AuthContext)
  const [dropdown, setDropdown] = useState(false)
  const [query,setQuery]=useState('')
  const navigate = useNavigate()
  const logout = async (e) => {
    e.preventDefault()

    try {
      const CsrfToken = await getCsrfToken();
      const res = await api.post("accounts/logout/", {}, {
        headers: {
          "X-CSRFToken": CsrfToken
        },
        withCredentials: true
      })
      alert('logged out')
      setUsername("")
      setIsLoggedIn(false)
      navigate("/login")
    }
    catch (error) {
      alert('error while logout')
    }
  }
  const handleSearch=async(e)=>{
    e.preventDefault()
    if(query.trim()!=''){
      navigate(`/?q=${query.trim()}`)
    }
  }
  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
        <li><Link to="/">ShopNex</Link></li>
        </div>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
           <li className="cart-link">
          <Link to="/cart">
            <img src={cartPic} alt="Cart" className="icon" />
            {cartCount}
          </Link>
        </li>
          
          
          {isLoggedIn ? (
            <li className='dropdown' onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)}>
              <img src={profilePic} alt="" />
              
              {dropdown && (
                <ul className='dropdown-menu'>
                  <li><Link to={'/profile'}>{username}</Link></li>
                  <li><Link>setting</Link></li>
                  <li><Link onClick={(e)=>logout(e)}>Logout</Link></li>
                </ul>
              )}
            </li>
          ) : (
            <li><Link to={'/login'}>Login</Link></li>
          )}
        </ul>
        <form className="navbar-search" onSubmit={handleSearch}>
          
          <input type="text" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search..." />
          <button>Search</button>
        
        </form>
        
      </nav>
    </>
  )
}
