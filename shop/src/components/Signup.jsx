import React, { useState } from 'react'
import api from '../api'
import { getCsrfToken } from '../getCsrfToken'
import '../css/login_signup.css'
import { useNavigate } from 'react-router-dom'
export const Signup = () => {
    const navigate=useNavigate()
    const [signup, setSignup] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setSignup((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const CsrfToken = await getCsrfToken();
            const res = await api.post('accounts/signup/', signup, {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": CsrfToken
                },
                withCredentials: true
            })
            if(res.status===201){
                alert(res.data.message)
                navigate('/login')

            }
            
        }
        catch (error) {
            console.error('there is an error while signup', error)
        }
    }
    return (
        <>
        <h2>SignUp</h2>
            <div className="form-box" id='signup'>
                
                <form method='post' onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="signup-username">Username</label>
                        <input type="text" id="signup-username" name='username' value={signup.username} onChange={handleChange} placeholder="Choose a username" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="signup-email">Email</label>
                        <input type="email" id="signup-email" name='email' value={signup.email} onChange={handleChange} placeholder="Enter your email" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="signup-password">Password</label>
                        <input type="password" id="signup-password" name='password' value={signup.password}  onChange={handleChange} placeholder="Enter your password" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="signup-confirm">Confirm Password</label>
                        <input type="password" id="signup-confirm" name='confirm_password' value={signup.confirm_password} onChange={handleChange} placeholder="Confirm your password" required />
                    </div>
                    <button type="submit" className="btn">Sign Up</button>
                </form>
            </div>
        </>
    )
}
