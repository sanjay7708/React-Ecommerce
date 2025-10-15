import React, { useEffect, useState, useContext } from 'react'
import { getCsrfToken } from '../getCsrfToken'
import api from '../api'
import { AuthContext } from '../App'
import "../css/cart.css"
import { useNavigate } from 'react-router-dom'

export const Cart = () => {
    const navigate = useNavigate()
    const [cart, setCart] = useState(null)
    const { cartCount, setCartCount } = useContext(AuthContext)

    useEffect(() => {
        fetchCart()
    }, [])

    const fetchCart = async () => {
        try {
            const res = await api.get('store/cart/', { withCredentials: true })
            if (res.data.length > 0) {
                const cartData = res.data[0]
                setCart(cartData)
                setCartCount(cartData.total_items)
            } else {
                setCart(null)
                setCartCount(0)
            }
        } catch (error) {
            alert("Error fetching cart")
        }
    }

    const quantityControl = async (itemId, newQuantity) => {
        if (newQuantity < 1) return // prevent negative/zero quantity
        try {
            const CsrfToken = await getCsrfToken()
            await api.patch(`store/cartitem/${itemId}/`,
                { quantity: newQuantity },
                {
                    headers: { "X-CSRFToken": CsrfToken },
                    withCredentials: true
                }
            )
            fetchCart()
        }
        catch (error) {
            console.error("Error updating quantity:", error)
        }
    }

    const PlaceOrder = (item) => {
        navigate('/confirm-order', {
            state: {
                product: item.product_detail,
                selectedVariation: item.variation_detail?.id,
                Quantity: item.quantity
            }
        })
    }

    if (!cart || !cart.items || cart.items.length === 0) {
        return <h1 style={{ textAlign: 'center', marginTop: '50px' }}>Your cart is Empty</h1>
    }

    return (
        <div className="cart-page">
            <div className="cart-container">
                {cart.items.map(item => (
                    <div className="cart-card" key={item.id}>
                        <div className="cart-left">
                            <img src={item.product_detail.images[0]?.image || "/placeholder.png"} alt={item.product_detail.short_name} />
                        </div>
                        <div className="cart-right">
                            <h3>{item.product_detail.short_name}</h3>
                            {item.variation_detail && (
                                <p>{item.variation_detail.variation_type}: {item.variation_detail.value}</p>
                            )}
                            <div className="quantity-control">
                                <button onClick={() => quantityControl(item.id, item.quantity - 1)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => quantityControl(item.id, item.quantity + 1)}>+</button>
                            </div>
                            <p>Subtotal: ₹{item.subtotal}</p>
                            <div className="product-actions">
                                <button className="btn btn-outline" onClick={() => PlaceOrder(item)}>Order Now</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart-total-bottom">
                <h3>Total: ₹{cart.total}</h3>
            </div>
        </div>
    )
}
