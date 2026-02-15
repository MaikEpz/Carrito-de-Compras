import { createContext, useContext, useReducer, type ReactNode } from 'react'
import type { CartState, CartAction, Product } from '../lib/types'

const initialState: CartState = {
  items: [],
  isOpen: false,
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(
        (item) => item.product.code === action.product.code
      )
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.code === action.product.code
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }
      }
      return {
        ...state,
        items: [...state.items, { product: action.product, quantity: 1 }],
      }
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.product.code !== action.productCode),
      }
    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) => item.product.code !== action.productCode
          ),
        }
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.code === action.productCode
            ? { ...item, quantity: action.quantity }
            : item
        ),
      }
    }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }
    case 'CLOSE_CART':
      return { ...state, isOpen: false }
    default:
      return state
  }
}

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
    return state.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    )
  }

  const getItemCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0)
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
        getItemCount,
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
