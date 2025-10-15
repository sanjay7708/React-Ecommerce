import React from 'react'
import '../css/about.css'
export const About = () => {
  return (
    <>
     <div className="about-container">
      <div className="about-card">
        <h1>About Our Store</h1>
        <p>
          Welcome to <strong>ShopNex</strong>, your one-stop destination for
          all your shopping needs. We offer a wide range of products — from
          the latest electronics and fashion trends to home essentials and
          lifestyle accessories.  
        </p>
        <p>
          Our mission is simple: to provide high-quality products at
          competitive prices, backed by a smooth and secure shopping
          experience. With fast delivery, easy returns, and excellent
          customer service, we aim to make your online shopping journey
          effortless and enjoyable.
        </p>
        <p>
          Whether you're searching for something specific or just browsing,
          <strong> ShopNex</strong> is here to help you find exactly what you
          need — anytime, anywhere.
        </p>
        <p className="thank-you">
          Thank you for choosing us. Happy Shopping!
        </p>
      </div>
    </div>
    </>
  )
}
