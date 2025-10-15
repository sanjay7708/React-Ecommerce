import React, { useEffect, useState } from 'react'
import api from '../api'
import '../css/home.css'
import { Link, useLocation } from 'react-router-dom'

export const Home = () => {
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const location = useLocation()
  const query = new URLSearchParams(location.search).get('q') || ''

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true)
        setError(null)

        // ✅ Correct URL
        const endpoint = query ? `store/product/?q=${query}` : 'store/product/'

        const res = await api.get(endpoint, { withCredentials: true })
        setProduct(res.data)
      } catch (error) {
        console.error(error)
        setError('Something went wrong while fetching products.')
      } finally {
        setLoading(false)
      }
    }

    getProduct()
  }, [query])

  if (loading) return <p className="loading">Loading products...</p>
  if (error) return <p className="error">{error}</p>

  return (
    <div className="products-container">
      {product.length > 0 ? (
        product.map((item) => (
          <div className="product-card" key={item.id}>
            <Link to={`/products/${item.slug}`}>
              <img
                src={item.images[0]?.image || '/placeholder.png'}
                alt={item.short_name}
              />
              <h3>{item.short_name}</h3>
              <p className="price">₹{item.base_price}</p>
            </Link>
          </div>
        ))
      ) : (
        <div className="no-results">
          <h3>No products found{query ? ` for “${query}”` : ''}.</h3>
          {query && (
            <Link to="/" className="back-btn">
              Back to all products
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
