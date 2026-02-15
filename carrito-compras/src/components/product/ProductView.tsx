import type { Product } from '@/lib/types'
import { ProductCard } from './ProductCard'

interface ProductGridProps {
  products: Product[]
  noCategoriesSelected?: boolean
  viewMode?: 'grid' | 'list'
}

export function ProductView({ products, noCategoriesSelected, viewMode = 'grid' }: ProductGridProps) {
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
    <div className={viewMode === 'grid' 
      ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4' 
      : 'flex flex-col gap-4'}>
      {products.map((product) => (
        <ProductCard key={product.code} product={product} viewMode={viewMode} />
      ))}
    </div>
  )
}
