import type { CartState } from '../../domain/models/Cart'
import type { Product } from '../../domain/models/Product'

/**
 * Modulo: Gestion de Carrito
 *
 * Responsabilidad:
 * - Agregar productos al carrito y actualizar sus cantidades.
 *
 * Contexto de Negocio:
 * - Un producto existente incrementa su cantidad en una unidad.
 * - Un producto nuevo se agrega al carrito con cantidad inicial de 1.
 *
 * Dependencias:
 * - CartState
 * - Product
 */

export function addToCart(state: CartState, product: Product): CartState {
  const existing = state.items.find((item) => item.product.code === product.code)
  if (existing) {
    return {
      ...state,
      items: state.items.map((item) =>
        item.product.code === product.code
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    }
  }

  return { ...state, items: [...state.items, { product, quantity: 1 }] }
}
