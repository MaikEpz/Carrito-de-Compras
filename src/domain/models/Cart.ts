import type { Product } from './Product'

/**
 * Modulo: Modelos de Dominio
 * 
 * Responsabilidad:
 * - Definir la estructura de datos para el carrito de compras.
 * 
 * Contexto de Negocio:
 * - El carrito de compras es una parte fundamental del proceso de compra, donde se almacenan los productos seleccionados por el usuario antes de finalizar la compra.
 * 
 * Dependencias:
 * - Product  
 */
export interface CartItem {
  product: Product
  quantity: number
}

export interface CartState {
  items: CartItem[]
  isOpen: boolean
}
