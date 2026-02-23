import type { Category } from '../models/Category'

/**
 * Módulo: Repositorio de Categorías
 *
 * Responsabilidad:
 * - Proveer una interfaz para acceder a las categorías disponibles.
 *
 * Contexto de Negocio:
 * - Las categorías agrupan productos y permiten a los usuarios filtrar el catálogo.
 *
 * Dependencias:
 * - Category
 */
export interface CategoryRepository {
  getAll(): Promise<Category[]>
}
