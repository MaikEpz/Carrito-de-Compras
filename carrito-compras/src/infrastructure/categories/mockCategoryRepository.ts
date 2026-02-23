import type { Category } from '../../domain/models/Category'
import type { CategoryRepository } from '../../domain/repositories/CategoryRepository'

/**
 * Módulo: Repositorio de Categorías (Mock)
 *
 * Responsabilidad:
 * - Proveer datos de categorías para filtrar productos.
 *
 * Contexto de Negocio:
 * - Este repositorio simula una fuente de datos, permitiendo el desarrollo y pruebas sin depender de una base de datos real.
 *
 * Dependencias:
 * - Category
 * - CategoryRepository
 */
const mockCategories: Category[] = [
  {
    code: 'CAT-001',
    name: 'Muebles',
    description: 'Sofás, mesas y más',
    image: '/categories/furniture.jpg',
  },
  {
    code: 'CAT-002',
    name: 'Decoración',
    description: 'Jarrones, espejos y accesorios',
    image: '/categories/decor.jpg',
  },
  {
    code: 'CAT-003',
    name: 'Iluminación',
    description: 'Lámparas y luminarias',
    image: '/categories/lighting.jpg',
  },
  {
    code: 'CAT-004',
    name: 'Textiles',
    description: 'Cojines y mantas',
    image: '/categories/textiles.jpg',
  },
]

export const mockCategoryRepository: CategoryRepository = {
  async getAll() {
    return mockCategories
  },
}
