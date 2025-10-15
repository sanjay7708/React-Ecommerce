import React, { useEffect, useState } from 'react'
import api from '../api'
import '../css/address.css'
import { Link } from 'react-router-dom'
import { getCsrfToken } from '../getCsrfToken'

export const Address = () => {
  const [address, setAddress] = useState([])

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await api.get("store/address/", {
          withCredentials: true
        })
        const sorted=res.data.sort((a,b)=>(b.is_default ? 1:0)-(a.is_default?1:0))
        setAddress(sorted)
        
      } catch {
        alert('error while fetch Address')
      }
    }
    fetchAddress()
  }, [])
  const removeAddress=async(itemId)=>{
    try{
        const CsrfToken=await getCsrfToken();
        const res=await api.delete(`store/address/${itemId}/`,{
            headers:{
                "X-CSRFToken":CsrfToken
            },
            withCredentials:true
            
        })
        setAddress((prev)=>prev.filter((addr)=>addr.id!==itemId))
    }
    catch{

    }
  }
  return (
    <>
      <h2>Your Addresses</h2>

      <div className="address-container">
        {/* Add address card */}
        <Link to={'/add-address'}>
          <div className="add-box">
            + Add address
          </div>
        </Link>

        {/* Loop through addresses */}
        {address.length > 0 ? (
          address.map((val, ind) => (
            <div className="address-card" key={ind}>
                {val.is_default && <div className="default">Default</div>}
              <p><strong>{val.user}</strong></p>
              <p><span>{val.building_no},</span> {val.street_name}</p>
              <p>{val.city}, {val.state}, {val.pincode}</p>
              <p>{val.country}</p>
              <p>Phone Number: {val.country_code}{val.phoneNumber}</p>
              <div className="actions">
                <Link to={`/edit-address/${val.id}`}>Edit</Link>| <a href="#" onClick={()=>removeAddress(val.id)} >Remove</a>
              </div>
            </div>
          ))
        ) : (
          <p>empty</p>
        )}
      </div>
    </>
  )
}
