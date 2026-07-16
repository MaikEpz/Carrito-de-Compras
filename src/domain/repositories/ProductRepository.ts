import type { Product } from '../models/Product'

/**
 * Modulo: Repositorio de Productos
 *
 * Responsabilidad:
 * - Proveer una interfaz para acceder a los productos disponibles.
 *
 * Contexto de Negocio:
 * - Los productos son entidades que pueden ser listadas, buscadas y recuperadas por código.
 *
 * Dependencias:
 * - Product
 */
export interface SearchFilters {
  query?: string
  categories?: string[]
  priceRanges?: Array<{ min: number; max: number }>
}

export interface ProductRepository {
  getAll(): Promise<Product[]>
  getByCode(code: string): Promise<Product | null>
  search(filters?: SearchFilters): Promise<Product[]>
}
