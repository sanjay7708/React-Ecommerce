E-Commerce Frontend (React)

This is the frontend application for a full-stack eCommerce platform built using React.
It connects with a Django REST Framework backend using Axios and supports routing using React Router DOM.


Project Overview

This React application allows users to:

Register and log in

View product listings

Add products to the cart

Modify cart items

Place orders

Interact with backend APIs securely using session-based authentication

✨ Features

User authentication (Login / Logout)

Product listing

Add to cart functionality

Update and remove cart items

Order placement

API integration using Axios

Client-side routing using React Router

Tech Stack
  Frontend:

    React.js

    JavaScript (ES6+)

    HTML5

    CSS3

  Libraries:

    Axios (API requests)

    React Router DOM (Routing)
Project Structure:


React-Ecommerce/
│
├── shop/                  # Main React application
│   ├── components/        # Reusable components
│   ├── pages/             # Page-level components
│   ├── services/          # API calls using Axios
│   ├── styles/            # CSS files
│   ├── App.js             # Main app component
│   ├── index.js           # Entry point
│   └── ProductDetails.css # Product UI styling
│
├── README.md


Installation & Setup
1)Clone the repository
git clone https://github.com/sanjay7708/React-Ecommerce.git
cd React-Ecommerce

2)Install dependencies
npm install

3)Start the development server
npm start


The application will run at:

http://localhost:3000/

API Integration

The frontend communicates with the backend using Axios.

Example configuration:

import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  withCredentials: true, // session-based authentication
});

export default api;

Authentication

Uses session-based authentication

Backend handles login sessions

Axios sends cookies automatically

Routing

Routing is handled using react-router-dom.

Example:

import { BrowserRouter, Routes, Route } from "react-router-dom";

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  </BrowserRouter>

Features:

  Product listing

  Product detail page

  Add to cart

  Update cart items

  Responsive design

  API integration with backend
