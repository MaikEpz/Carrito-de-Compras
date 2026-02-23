import type { CartState } from '../../domain/models/Cart'

/**
 * Modulo: Gestion de Carrito
 * 
 * Responsabilidad:
 * - Actualizar la cantidad de un producto en el carrito.
 * 
 * Contexto de Negocio:
 * - El usuario desea modificar la cantidad de un producto específico en su carrito.
 * - Si la cantidad se establece en cero o menos, el producto se elimina del carrito.
 * 
 * Dependencias:
 * - CartState
 */
export function updateQuantity(
  state: CartState,
  productCode: string,
  quantity: number
): CartState {
  if (quantity <= 0) {
    return {
      ...state,
      items: state.items.filter((item) => item.product.code !== productCode),
    }
  }

  return {
    ...state,
    items: state.items.map((item) =>
      item.product.code === productCode
        ? { ...item, quantity }
        : item
    ),
  }
}
