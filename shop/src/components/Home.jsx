import React, { useEffect, useState } from 'react'
import api from '../api'
import '../css/home.css'
import { Link, useLocation } from 'react-router-dom'

export const Home = () => {
  const [product, setProduct] = useState([])
  const [nextPage, setNextPage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const location = useLocation()
  const query = new URLSearchParams(location.search).get('q') || ''

  const fetchProducts = async (url, isNext = false) => {
    try {
      setLoading(true)
      setError(null)

      const res = await api.get(url, { withCredentials: true })
      
      if (isNext) {
        setProduct(prev => [...prev, ...res.data.results])  // append products
      } else {
        setProduct(res.data.results) // first load
      }

      setNextPage(res.data.next)
    } catch (error) {
      console.error(error)
      setError('Something went wrong while fetching products.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const endpoint = query
      ? `store/product/?q=${query}&limit=10&offset=0`
      : `store/product/?limit=10&offset=0`

    fetchProducts(endpoint)
  }, [query])

  return (
    <div className="products-container">
      {product.map((item) => (
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
      ))}

      {/* ✅ Load More Button */}
      {nextPage && (
        <button className="load-more-btn" onClick={() => fetchProducts(nextPage, true)}>
          Load More
        </button>
      )}

      {!loading && !nextPage && product.length === 0 && (
        <div className="no-results">
          <h3>No products found{query ? ` for “${query}”` : ''}.</h3>
          {query && (
            <Link to="/" className="back-btn">
              Back to all products
            </Link>
          )}
        </div>
      )}

      {loading && <p className="loading">Loading products...</p>}
      {error && <p className="error">{error}</p>}
    </div>
  )
}
