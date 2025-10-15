import { createContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { Home } from './components/Home'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import { Signup } from './components/Signup'
import { Login } from './components/Login'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Navbar } from './components/Navbar'
import { ProductDetails } from './components/ProductDetails'
import { Cart } from './components/Cart'
import api from './api'
import { Profile } from './components/Profile'
import { Orders } from './components/Orders'
import { Address } from './components/Address'
import { AddAddress } from './components/AddAddress'
import { EditAddress } from './components/EditAddress'
import { ConfirmOrder } from './components/ConfirmOrder'
import { OrderDetails } from './components/OrderDetails'


export const AuthContext=createContext()
function App() {
  const [cartCount,setCartCount]=useState(0)
  const [username, setUsername] = useState(
    ()=>localStorage.getItem(("username"))||"user"
  )
  const [isLoggedIn,setIsLoggedIn]=useState(
    ()=>JSON.parse(localStorage.getItem(("isLoggedIn"))||false)
  )
  useEffect(()=>{
    localStorage.setItem("isLoggedIn",JSON.stringify(isLoggedIn))
    localStorage.setItem("username",username)

    const getCartCount=async()=>{
      try{
        const res=await api.get('store/cart/',{
          withCredentials:true
        })
        
        setCartCount(res.data[0].total_items)
        
      }
      catch{
        console.log('error')
      }
    }
    getCartCount()
  },[isLoggedIn,username])

  return (
    <>
    <AuthContext.Provider value={{username,setUsername,isLoggedIn,setIsLoggedIn,cartCount,setCartCount}}>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/products/:slug' element={<ProductDetails/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/address' element={<Address/>}/>
        <Route path='/add-address' element={<AddAddress/>}/>
        <Route path='/edit-address/:id' element={<EditAddress/>}/>
        <Route path='/confirm-order' element={<ConfirmOrder/>}/>
        <Route path='/order-details/:id' element={<OrderDetails/>}/>
      </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
      
    </>
  )
}

export default App
