import { createContext, useContext, useReducer, type ReactNode } from 'react'
import type { CartState } from '../../domain/models/Cart'
import type { Product } from '../../domain/models/Product'
import { addToCart } from '../../application/cart/addToCart'
import { removeFromCart } from '../../application/cart/removeFromCart'
import { updateQuantity } from '../../application/cart/updateQuantity'
import { clearCart } from '../../application/cart/clearCart'
import { calculateTotals } from '../../application/cart/calculateTotals'
import { getItemCount } from '../../application/cart/getItemCount'

/**
 * Módulo: Contexto de Carrito
 *
 * Responsabilidad:
 * - Proveer un contexto global para gestionar el estado del carrito de compras.
 *
 * Contexto de Negocio:
 * - Permite a cualquier componente acceder y modificar el carrito sin necesidad de prop drilling.
 *
 * Dependencias:
 * - CartState
 * - Product
 * - addToCart
 * - removeFromCart
 * - updateQuantity
 * - clearCart
 * - calculateTotals
 * - getItemCount
 */
const initialState: CartState = {
  items: [],
  isOpen: false,
}

// Define las acciones que el carrito puede manejar
type CartAction =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'REMOVE_ITEM'; productCode: string }
  | { type: 'UPDATE_QUANTITY'; productCode: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'CLOSE_CART' }

// Reducer para manejar las acciones del carrito
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM':
      return addToCart(state, action.product)
    case 'REMOVE_ITEM':
      return removeFromCart(state, action.productCode)
    case 'UPDATE_QUANTITY':
      return updateQuantity(state, action.productCode, action.quantity)
    case 'CLEAR_CART':
      return clearCart(state)
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }
    case 'CLOSE_CART':
      return { ...state, isOpen: false }
    default:
      return state
  }
}
// Define el tipo del contexto para asegurar que los componentes que lo consumen tengan acceso a las funciones y estado necesarios
interface CartContextType {
  state: CartState
  addItem: (product: Product) => void
  removeItem: (productCode: string) => void
  updateQuantity: (productCode: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  closeCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

// Crea el contexto del carrito con un valor inicial nulo, que será proporcionado por el CartProvider
const CartContext = createContext<CartContextType | null>(null)


export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', product })
  }

  const removeItem = (productCode: string) => {
    dispatch({ type: 'REMOVE_ITEM', productCode })
  }

  const updateQuantity = (productCode: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productCode, quantity })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' })
  }

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' })
  }

  const getTotal = () => {
    return calculateTotals(state).subtotal
  }

  const getCartItemCount = () => {
    return getItemCount(state)
  }

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        closeCart,
        getTotal,
        getItemCount: getCartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
