/**
 * Calcula el precio con descuento aplicado.
 * @param price - Precio original
 * @param discount - Porcentaje de descuento (0-100)
 * @returns Precio con descuento aplicado
 */
export const getDiscountedPrice = (price: number, discount: number): number => {
  return discount > 0 ? price - (price * discount) / 100 : price
}
