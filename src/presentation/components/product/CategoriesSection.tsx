import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { getCategories } from '../../../application/categories/getCategories'
import { mockCategoryRepository } from '../../../infrastructure/categories/mockCategoryRepository'
import type { Category } from '../../../domain/models/Category'

/** * Módulo: Sección de Categorías
 *
 * Responsabilidad: 
 * - Mostrar las categorías disponibles para filtrar productos en el catálogo.
 *
 * Contexto de Negocio:
 * - El usuario desea explorar el catálogo de productos por categorías para encontrar lo que busca de manera más eficiente.
 *
 * Dependencias:
 * - getCategories: Función para obtener las categorías disponibles.
 * - mockCategoryRepository: Repositorio simulado para obtener categorías.
 * - Category: Modelo de datos para una categoría.
 */
export function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const loadedCategories = await getCategories(mockCategoryRepository)
        setCategories(loadedCategories)
      } catch (error) {
        console.error('Error al cargar categorías:', error)
      }
    }

    loadCategories()
  }, [])

  return (
    <section id="categorias" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Explora por Categoría
          </h2>
          <p className="mt-4 text-muted-foreground">
            Encuentra exactamente lo que buscas para tu espacio
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.code}
              to={`/catalogo?categoria=${category.name.toLowerCase()}`}
              className="group relative overflow-hidden rounded-xl"
            >
              <div className="aspect-[4/5] relative bg-secondary">
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                  <p className="mt-1 text-sm text-white/80">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
