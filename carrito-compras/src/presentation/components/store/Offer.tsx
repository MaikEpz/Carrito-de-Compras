import React, { useEffect } from 'react'
import type { Product } from '../../../domain/models/Product'
import { ProductView } from '../product/ProductView'
import { getAllProducts } from '../../../application/products/getAllProducts'
import { mockProductRepository } from '../../../infrastructure/products/mockProductRepository'
import { Star } from '@/assets/icons/Star'

/**
 * Componente de Ofertas Especiales que muestra una sección destacada con productos en oferta, incluyendo un título, descripción y una vista de productos filtrados por descuento.
 *
 * Responsabilidad:
 * - Cargar y mostrar productos que tienen un descuento aplicado.
 * - Proporcionar una experiencia visual atractiva con un título destacado y una descripción contextual.
 * 
 * Contexto de Negocio:
 * - Los usuarios buscan ofertas especiales para encontrar productos con descuentos significativos.
 * - La sección de ofertas debe ser visualmente atractiva para captar la atención del usuario y motivar la exploración de los productos en oferta.
 * - Si no hay productos en oferta, se puede mostrar un mensaje indicando que no hay ofertas disponibles en este momento.
 * 
 * Dependencias:
 * - getAllProducts: Función para obtener la lista completa de productos desde el repositorio.
 * - mockProductRepository: Repositorio simulado para obtener los productos.
 * - ProductView: Componente para mostrar la lista de productos en formato grid o lista.
 * - Star: Icono para resaltar la sección de ofertas especiales.
 */
export function Offer() {
  const [products, setProducts] = React.useState<Product[]>([])
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true)
      const allProducts = await getAllProducts(mockProductRepository)
      setProducts(allProducts.filter((product) => product.discount > 0))
      setIsLoading(false)
    }
    loadProducts()
  }, [])

  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-gray-200 px-4 py-1.5 text-sm font-medium text-primary">
              <Star className="size-4" />
              Ofertas Especiales
            </span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-3xl lg:text-4xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Estilo Premium, Precios Únicos
          </h2>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            Diseños exclusivos con descuentos de hasta 40%. Transforma tu hogar con elegancia y ahorra.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-4 border-gray-200"></div>
              <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </div>
          </div>
        ) : (
          <div className="mt-10">
            <ProductView products={products} />
          </div>
        )}
      </div>
    </section>
  )
}
