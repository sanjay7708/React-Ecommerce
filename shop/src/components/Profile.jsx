import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../App'
import "../css/profile.css"
import api from '../api'
import { Link } from 'react-router-dom'

export const Profile = () => {
  const [orders, setOrders] = useState([])
  const { username, setUsername, isLoggedIn, setIsLoggedIn, cartCount, setCartCount } = useContext(AuthContext)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('store/order/', {
          withCredentials: true
        })
        console.log(res.data)
      }
      catch {
        console.log('error')
      }
    }
    fetchOrders()
  }, [])


  return (
    <>
      <div className="profile-container">
        <div className="welcome">
          Welcome, <span id="username">{username}</span>
        </div>

        <div className="content">
          {/* Orders Box */}
          <Link to={'/orders'}>
            <div className="box" id="orders">
            <h2>Your Orders</h2>
          
          </div>
          </Link>
          

          {/* Address Box */}
          <Link to={'/address'}>
          <div className="box" id="address">
            <h2>Your Address</h2>
          </div>
          </Link>
          

        </div>
      </div>
    </>
  )
}
