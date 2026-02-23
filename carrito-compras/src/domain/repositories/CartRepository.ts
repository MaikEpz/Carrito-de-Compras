import type { CartState } from '../models/Cart'
/**
 * Modulo: Repositorio de Carrito
 *
 * Responsabilidad:
 * - Proveer una interfaz para acceder y modificar el estado del carrito.
 *
 * Contexto de Negocio:
 * - El carrito es una entidad central que debe ser persistida y recuperada.
 *
 * Dependencias:
 * - CartState
 */
export interface CartRepository {
  getState(): CartState
  setState(state: CartState): void
}
