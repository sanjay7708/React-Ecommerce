import React, { useContext, useState } from 'react'
import { getCsrfToken } from '../getCsrfToken'
import api from '../api'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../App'

export const Login = () => {
    const {username,setUsername,isLoggedIn,setIsLoggedIn}=useContext(AuthContext)
    const navigate=useNavigate()
    const [user,setUser]=useState({
        username:'',
        password:''
    })

    const getUsername=async()=>{
        try{
            const res=await api.get("accounts/whoami/",{
                withCredentials:true
            })
            if (res.status===200){
                return res.data.username
            }
            
        }
        catch(error){
            return null
        }
    }



    const handleChange=(e)=>{
        const {name,value}=e.target
        setUser((prev)=>({
            ...prev,
            [name]:value
        }))
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()

        try{
            const CsrfToken=await getCsrfToken();
            const res=await api.post("accounts/login/",user,{
                headers:{
                    "Content-Type":"application/json",
                    "X-CSRFToken":CsrfToken
                },
                withCredentials:true
            })


            

            alert(res.data.message)
            if (res.status===200){
                
                setIsLoggedIn(true)
                const fetchUsername=await getUsername();
                if (fetchUsername){
                    setUsername(fetchUsername)
                }
                navigate('/')
            }
            
        }
        catch(error){
            alert(error.response.data.message)
        }
    }
  return (
    <>
    <h2>Login</h2>
      <div className="container">
        
        <div className="form-box">
             
             <form method='post' onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="login-username">Username</label>
                    <input type="text" id="login-username" name='username' value={user.username} onChange={handleChange} placeholder="Enter your username" required />
                </div>
                <div className="input-group">
                    <label htmlFor="login-password">Password</label>
                    <input type="password" id="login-password" name='password' value={user.password} onChange={handleChange} placeholder="Enter your password" required />
                </div>
                <button type="submit" className="btn">Login</button>
                <p className="switch-text">Don't have an account? <Link to={'/signup'}>Sign up</Link></p>
            </form>
        </div>
    </div>
    </>
  )
}
