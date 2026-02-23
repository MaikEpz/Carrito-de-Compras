import type { CartState } from '../../domain/models/Cart'

/**
 * Modulo: Gestion de Carrito
 * Responsabilidad:
 * - Eliminar un producto del carrito de compras.
 * Contexto de Negocio:
 * - El usuario desea remover un producto específico de su carrito.
 * Dependencias:
 * - CartState
 */
export function removeFromCart(state: CartState, productCode: string): CartState {
  return {
    ...state,
    items: state.items.filter((item) => item.product.code !== productCode),
  }
}
