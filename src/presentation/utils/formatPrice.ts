/**
 * Formatea un número como moneda en formato EUR español.
 * @param price - Precio a formatear
 * @returns Precio formateado como string (ej: "1.299,99 €")
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
}
