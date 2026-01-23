import { useState } from 'react'
import { CartProvider } from './context/CartContext'
import { Header } from './components/layout/Header'
import { MainLayout } from './components/layout/MainLayout'



function App() {

  return (
    <CartProvider>
      <Header />
      <main className="flex-1">
        <MainLayout />
      </main>
    
    </CartProvider>

  )
}

export default App
