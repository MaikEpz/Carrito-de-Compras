import { useState } from 'react'
import { CartProvider } from './context/CartContext'
import { Header } from './layout/Header'



function App() {

  return (
    <CartProvider>
      <Header />

    </CartProvider>

  )
}

export default App
