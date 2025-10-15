import React, { useEffect, useState } from 'react'
import api from '../api'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Slider from 'react-slick'
import "../css/confirmorder.css"
import { getCsrfToken } from '../getCsrfToken'

export const ConfirmOrder = () => {
    const navigate = useNavigate()
    const { state } = useLocation()
    const [selectedVariation, setSelectedVariation] = useState(null)
    const [addressList, setAddressList] = useState([])
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const { product } = state || {}

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const res = await api.get('store/address/', { withCredentials: true })
                setAddressList(res.data)
            } catch (err) {
                alert('Error fetching addresses')
            }
        }
        fetchAddresses()
    }, [])

    const placeOrder = async () => {
        if (!selectedAddress) {
            alert("Please select an address before placing order")
            return
        }

        try {
            const csrfToken = await getCsrfToken()
            const res = await api.post('store/order/', {
                items_input: [
                    {
                        product: product.id,
                        variation: selectedVariation,
                        quantity: quantity
                    }
                ],
                address_id: selectedAddress
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken
                },
                withCredentials: true
            })
            navigate('/orders')
        } catch (err) {
            
            alert('Error placing order')
        }
    }

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    return (
        <div className="confirm-order-page">
            <div className="product-details-container">
                {/* LEFT: Product Images */}
                <div className="product-image-wrapper">
                    {product?.images?.length > 0 ? (
                        <Slider {...sliderSettings}>
                            {product.images.map(img => (
                                <div key={img.id} className="product-image-slide">
                                    <img src={img.image} alt={product.short_name} />
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <img src="/placeholder.png" alt="No image" />
                    )}
                </div>

                {/* RIGHT: Product Info */}
                <div className="product-info">
                    <h2 className="product-title">{product?.short_name}</h2>
                    <p className="product-price">₹{product?.base_price}</p>
                    <p className="product-description">{product?.description}</p>

                    {/* Variations */}
                    <div className="variation-list">
                        <h4>Select Variation:</h4>
                        {product?.variations?.length > 0 ? (
                            product.variations.map(v => (
                                <button
                                    key={v.id}
                                    className={selectedVariation === v.id ? 'selected' : ''}
                                    onClick={() => setSelectedVariation(v.id)}
                                >
                                    {v.variation_type}: {v.value} {v.price ? `(₹${v.price})` : ''}
                                </button>
                            ))
                        ) : (
                            <p>No variations available</p>
                        )}
                    </div>

                    {/* Quantity */}
                    <div className="quantity-control">
                        <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>-</button>
                        <p>{quantity}</p>
                        <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
                    </div>

                    {/* Address Cards */}
                    <div className="address-container">
                        {addressList?.length > 0 ? (
                            addressList.map(addr => (
                                <button
                                    key={addr.id}
                                    className={selectedAddress === addr.id ? 'selected' : ''}
                                    onClick={() => setSelectedAddress(addr.id)}
                                >
                                    <div className="address-card">
                                        <h3>{addr.address_type}</h3>
                                        <p>No: {addr.building_no}</p>
                                        <h3>{addr.street_name}</h3>
                                        <h3>{addr.city}</h3>
                                        <h3>{addr.district} <span>{addr.pincode}</span></h3>
                                    </div>
                                </button>
                            ))
                        ) : (
                            <h2>No address available:<Link to={'/add-address/'}>Add Address</Link></h2>
                            
                        )}
                    </div>
                </div>
            </div>

            {/* PLACE ORDER BUTTON */}
            <button className="place-order-btn" onClick={placeOrder}>
                Place Order
            </button>
        </div>
    )
}
