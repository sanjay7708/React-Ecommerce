import React, { useState } from 'react'
import '../css/contact.css'
import { getCsrfToken } from '../getCsrfToken'
import api from '../api'
export const Contact = () => {
    const [contactForm,setContactForm]=useState({
        name:'',
        email:'',
        message:''
    })
    const handleChange=async(e)=>{
        const {name,value}=e.target
        setContactForm((prev)=>({
            ...prev,
            [name]:value
        }))
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{    
            const CsrffToken=await getCsrfToken();
            const res=await api.post('store/contact/',contactForm,{
                headers:{
                    'Content-Type':'application/json',
                    'X-CSRFToken':CsrffToken
                },
                withCredentials:true
            })
            if(res.status===201){
                alert('message sent successfully')
            }
        }
        catch{
            alert('please try again!')
        }
    }
  return (
    <>
    <section className="contact-section">
        <div className="contact-container">
            
            
            <div className="contact-info">
                <h2>Contact Us</h2>
                <p>We’d love to hear from you! Whether you have a question, feedback, or need assistance, our team is ready to help.</p>
                <ul>
                    <li><strong>Address:</strong> 123 Market Street, New Delhi, India</li>
                    <li><strong>Phone:</strong> +91 98765 43210</li>
                    <li><strong>Email:</strong> support@myapp.com</li>
                </ul>
            </div>

            
            <div className="contact-form" onSubmit={handleSubmit}>
                <form action="#" method="post">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" name="name" value={contactForm.name} onChange={handleChange} placeholder="Your Name" required />

                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" value={contactForm.email} onChange={handleChange} placeholder="you@example.com" required />

                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" value={contactForm.message} onChange={handleChange} placeholder="Write your message here..." required></textarea>

                    <button type="submit">Send Message</button>
                </form>
            </div>

        </div>
    </section>
    </>
  )
}
