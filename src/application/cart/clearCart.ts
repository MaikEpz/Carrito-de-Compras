import type { CartState } from '../../domain/models/Cart'

/**
 * Modulo: Gestion de Carrito
 * Responsabilidad:
 * - Limpiar el carrito de compras.
 * 
 * Contexto de Negocio:
 * - El usuario desea vaciar su carrito para comenzar una nueva selección de productos.
 * 
 * Dependencias:
 * - CartState
 */

export function clearCart(state: CartState): CartState {
  return { ...state, items: [] }
}
