import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getCsrfToken } from '../getCsrfToken'
import api from '../api'
import '../css/ProductDetails.css'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useContext } from 'react'
import { AuthContext } from '../App'

export const ProductDetails = () => {
    const { username, setUsername, isLoggedIn, setIsLoggedIn, cartCount, setCartCount } = useContext(AuthContext)
    const navigate = useNavigate()
    const { slug } = useParams()
    const [product, setProduct] = useState(null)
    const [selectedVariation, setSelectedVariation] = useState(null)
    console.log(selectedVariation)
    useEffect(() => {
        const product_detail = async () => {
            try {
                const CsrfToken = await getCsrfToken();
                const res = await api.get(`store/product/${slug}`, {
                    withCredentials: true
                })

                setProduct(res.data)
            }
            catch {
                alert('error while fetch product')
            }
        }
        product_detail()
    }, [])
    const addToCart = async () => {
        try {
            const CsrfToken = await getCsrfToken();
            const res = await api.post("store/cartitem/", {
                product: product.id,
                variation: selectedVariation,
                quantity: 1

            }, {
                headers: {
                    "X-CSRFToken": CsrfToken
                },
                withCredentials: true
            })
            console.log(res)
            setCartCount(prev => prev + 1)
        }
        catch {
            alert('error cart add')
        }
    }

    const ordernow = async () => {

        navigate('/confirm-order',{
            state:{
                product,
                selectedVariation
            }
        })

        // try {
        //     const CsrfToken = await getCsrfToken();
        //     const res = await api.post("store/order/", {
        //         items_input: [
        //             {
        //                 product: product.id,
        //                 variation: selectedVariation,  // variation id
        //                 quantity: 1,
        //             },
        //         ],
        //     }, {
        //         headers: {
        //             "Content-Type": "application/json",
        //             "X-CSRFToken": CsrfToken
        //         },
        //         withCredentials: true
        //     })
        //     navigate('/orders')
        // }
        // catch (error) {
        //     console.error(error)
        // }
    }
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    if (!product) return <p>Loading</p>
    return (
        <>
            <div className="product-details-container">
                {/* LEFT SIDE */}
                <div className="product-image-wrapper">
                    {product.images.length > 0 ? (
                        <Slider {...settings}>
                            {product.images.map((img) => (
                                <div key={img.id}>
                                    <img src={img.image} alt="" />
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <img src="/placeholder.png" alt="No image" />
                    )}
                </div>

                {/* RIGHT SIDE */}
                <div className="product-info">
                    <h2>{product.short_name}</h2>
                    <p className="product-price">₹{product.base_price}</p>
                    <p className="product-description">{product.description}</p>

                    <div className="variation-list">
                        <h4>Variation:</h4>
                        {product.variations.length > 0 ? (
                            product.variations.map((variation) => (
                                <button key={variation.id} onClick={() => setSelectedVariation(variation.id)}>
                                    {variation.variation_type}:{variation.value}
                                </button>
                            ))
                        ) : (
                            <p>No variations available</p>
                        )}

                    </div>

                    <div className="product-actions">
                        <button className="btn btn-primary" onClick={addToCart}>Add to Cart</button>
                        <button className="btn btn-outline" onClick={() => ordernow()}>Order Now</button>
                    </div>
                </div>
            </div>
        </>
    )
}
