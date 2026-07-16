import type { CartState } from '../../domain/models/Cart'

/**
 * Modulo: Gestion de Carrito
 * 
 * Responsabilidad:
 * - Obtener el conteo total de items en el carrito.
 * 
 * Contexto de Negocio:
 * - El usuario desea conocer cuántos productos ha agregado al carrito.
 * 
 * Dependencias:
 * - CartState
 */

export function getItemCount(state: CartState): number {
  return state.items.reduce((count, item) => count + item.quantity, 0)
}
