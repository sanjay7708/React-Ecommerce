import React, { useContext, useState } from 'react'
import { getCsrfToken } from '../getCsrfToken'
import api from '../api'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../App'
import '../css/navbar.css'
import profilePic from "../assets/profile_icon.png"
import cartPic from "../assets/cart_icon.png"

export const Navbar = () => {
  const { username, setUsername, isLoggedIn, setIsLoggedIn, cartCount } = useContext(AuthContext)
  const [dropdown, setDropdown] = useState(false)
  const [hamburgerOpen, setHamburgerOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const logout = async (e) => {
    e.preventDefault()
    try {
      const CsrfToken = await getCsrfToken();
      await api.post("accounts/logout/", {}, {
        headers: { "X-CSRFToken": CsrfToken },
        withCredentials: true
      })
      setUsername("")
      setIsLoggedIn(false)
      navigate("/login")
    } catch (error) {
      alert('Error while logout')
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (query.trim() !== '') {
      navigate(`/?q=${query.trim()}`)
      setHamburgerOpen(false)
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <li><Link to="/">ShopNex</Link></li>
      </div>

      {/* Hamburger Button */}
      <div className="hamburger" onClick={() => setHamburgerOpen(prev => !prev)}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <ul className={`navbar-links ${hamburgerOpen ? 'show' : ''}`}>
        <li><Link to="/" onClick={() => setHamburgerOpen(false)}>Home</Link></li>
        <li><Link to="/about" onClick={() => setHamburgerOpen(false)}>About</Link></li>
        <li><Link to="/contact" onClick={() => setHamburgerOpen(false)}>Contact</Link></li>

        <li className="cart-link">
          <Link to="/cart" onClick={() => setHamburgerOpen(false)}>
            <img src={cartPic} alt="Cart" className="icon" />
            {cartCount}
          </Link>
        </li>

        {isLoggedIn ? (
          <li className='dropdown'
              onMouseEnter={() => setDropdown(true)}
              onMouseLeave={() => setDropdown(false)}>
            <img src={profilePic} alt="Profile" />
            {dropdown && (
              <ul className='dropdown-menu'>
                <li><Link to={'/profile'} onClick={() => setHamburgerOpen(false)}>{username}</Link></li>
                <li><Link to="#">Setting</Link></li>
                <li><Link to="#" onClick={(e) => logout(e)}>Logout</Link></li>
              </ul>
            )}
          </li>
        ) : (
          <li><Link to={'/login'} onClick={() => setHamburgerOpen(false)}>Login</Link></li>
        )}
      </ul>

      <form className="navbar-search" onSubmit={handleSearch}>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." />
        <button>Search</button>
      </form>
    </nav>
  )
}
