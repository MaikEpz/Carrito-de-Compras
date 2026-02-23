import type { CartState } from '../../domain/models/Cart'

/**
 * Modulo de aplicacion: regla de calculo de totales del carrito como transformacion pura.
 *
 * Responsabilidad:
 * - Calcular subtotal, shipping y total del carrito.
 * 
 * Contexto de Negocio:
 * - El subtotal se calcula sumando el precio de cada producto multiplicado por su cantidad, aplicando descuentos si los hay.
 * - El shipping es gratuito para pedidos mayores o iguales a $100, de lo contrario es $9.99.
 * - El total es la suma del subtotal y el shipping.
 * 
 * Dependencias:
 * - CartState
 */

export interface CartTotals {
  subtotal: number
  shipping: number
  total: number
}

export function calculateTotals(state: CartState): CartTotals {
  const subtotal = state.items.reduce((total, item) => {
    const discountedPrice =
      item.product.discount > 0
        ? item.product.price - (item.product.price * item.product.discount) / 100
        : item.product.price
    return total + discountedPrice * item.quantity
  }, 0)

  const shipping = subtotal >= 100 ? 0 : 9.99
  return { subtotal, shipping, total: subtotal + shipping }
}
