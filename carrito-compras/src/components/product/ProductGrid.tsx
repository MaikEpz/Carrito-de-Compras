'use client'

import type { Product } from '@/lib/types'
import { ProductCard } from './ProductCard'

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
  noCategoriesSelected?: boolean
}

export function ProductGrid({ products, isLoading, noCategoriesSelected }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductGridSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-lg font-medium text-foreground">
          No se encontraron productos
        </p>
        {!noCategoriesSelected && (
          <p className="mt-1 text-sm text-muted-foreground">
            Intenta con otra búsqueda o categoría
          </p>
        )}
        {noCategoriesSelected && (
          <p className="mt-1 text-sm text-muted-foreground">
            Selecciona al menos una categoria para ver productos
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

function ProductGridSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl bg-card">
      <div className="aspect-square w-full animate-pulse bg-secondary" />
      <div className="p-4">
        <div className="h-3 w-16 animate-pulse rounded bg-secondary" />
        <div className="mt-2 h-5 w-3/4 animate-pulse rounded bg-secondary" />
        <div className="mt-3 h-6 w-20 animate-pulse rounded bg-secondary" />
      </div>
    </div>
  )
}
