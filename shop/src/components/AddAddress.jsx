import React, { useState } from 'react'
import { getCsrfToken } from '../getCsrfToken'
import api from '../api';
import { useNavigate } from 'react-router-dom';

export const AddAddress = () => {
    const navigate=useNavigate()
    const [address,setAddress]=useState({
        address_type:"",
        building_no:"",
        street_name:"",
        city:"",
        district:"",
        state:"",
        pincode:"",
        country:"",
        country_code:"",
        phoneNumber:"",
        is_default:false
    })


    const handleChange=(e)=>{
        const {name, value, type, checked}=e.target
        setAddress({...address,[name]:type==='checkbox'?checked:value})
        
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const CsrfToken=await getCsrfToken();
            const res=await api.post('store/address/',address,{
                headers:{
                    "Content-Type":"application/json",
                    'X-CSRFToken':CsrfToken
                },
                withCredentials:true
            })
            alert(`address ${res.statusText},successfully`)
            navigate('/address')
        }
        catch{
            alert('there is an error while add address')
        }
    }

  return (
    <>
        <div className="form-box" id='signup'>
                <h2>SignUp</h2>
                
                <form method='post' onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="signup-username">Address Type:</label>
                        <input type="text" id="signup-username" name='address_type' value={address.address_type} onChange={handleChange} placeholder="HOME or OFFICE" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="signup-email">building_no</label>
                        <input type="text" id="signup-email" name='building_no' value={address.building_no} onChange={handleChange} placeholder="building_no" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="signup-password">street_name</label>
                        <input type="text" id="signup-password" name='street_name' value={address.street_name}  onChange={handleChange} placeholder="street_name" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="signup-confirm">City</label>
                        <input type="text" id="signup-confirm" name='city' value={address.city} onChange={handleChange} placeholder="city" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="signup-confirm">district</label>
                        <input type="text" id="signup-confirm" name='district' value={address.district} onChange={handleChange} placeholder="district" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="signup-confirm">State</label>
                        <input type="text" id="signup-confirm" name='state' value={address.state} onChange={handleChange} placeholder="State" required />
                    </div>
                       <div className="input-group">
                        <label htmlFor="signup-confirm">Pincode</label>
                        <input type="text" id="signup-confirm" name='pincode' value={address.pincode} onChange={handleChange} placeholder="Pincode" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="signup-confirm">country</label>
                        <input type="text" id="signup-confirm" name='country' value={address.country} onChange={handleChange} placeholder="country" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="signup-confirm">country_code</label>
                        <input type="text" id="signup-confirm" name='country_code' value={address.country_code} onChange={handleChange} placeholder="country_code" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="signup-confirm">phoneNumber</label>
                        <input type="text" id="signup-confirm" name='phoneNumber' value={address.phoneNumber} onChange={handleChange} placeholder="phoneNumber" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="signup-confirm">Defalut Address</label>
                        <input type="checkbox" id="signup-confirm" name='is_default' value={address.is_default} onChange={handleChange} placeholder="is_default"  />
                    </div>
                    <button type="submit" className="btn">Save Address</button>
                </form>
            </div>
    </>
  )
}
