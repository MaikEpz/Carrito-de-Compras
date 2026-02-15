// Tipos para la tienda online

export interface Product {
  code: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
  discount: number
}  

export interface CartItem {
  product: Product
  quantity: number
}

export interface CartState {
  items: CartItem[]
  isOpen: boolean
}

export type CartAction =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'REMOVE_ITEM'; productCode: string }
  | { type: 'UPDATE_QUANTITY'; productCode: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'CLOSE_CART' }
