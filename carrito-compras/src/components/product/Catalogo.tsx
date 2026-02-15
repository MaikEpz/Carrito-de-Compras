import { useState, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router'
import { searchProducts } from '@/lib/products'
import type { Product } from '@/lib/types'
import { CloseIcon } from '@/assets/icons/CloseIcon'
import { ProductView } from './ProductView'
import { ChevronIcon } from '@/assets/icons/ChevronIcon'
import { GridIcon } from '@/assets/icons/GridIcon'
import { ListIcon } from '@/assets/icons/ListIcon'

const categories = ['Muebles', 'Decoración', 'Iluminación', 'Textiles']
const priceRanges = [
  { label: 'Menos de $50', min: 0, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: '$100 - $200', min: 100, max: 200 },
  { label: 'Más de $200', min: 200, max: Infinity }
]

export function Catalogo() {
  const location = useLocation()
  const { categoryParam, searchParam } = useMemo(() => {
    const params = new URLSearchParams(location.search)
    return {
      categoryParam: params.get('categoria'),
      searchParam: params.get('buscar'),
    }
  }, [location.search])

  // Estados temporales (mientras el usuario selecciona opciones)
  const [tempSearchQuery, setTempSearchQuery] = useState(searchParam || '')
  const [tempSelectedCategories, setTempSelectedCategories] = useState<string[]>(categories)
  const [tempSelectedPriceRanges, setTempSelectedPriceRanges] = useState<number[]>([])
  
  // Estados aplicados (los que realmente filtran)
  const [appliedSearchQuery, setAppliedSearchQuery] = useState(searchParam || '')
  const [appliedCategories, setAppliedCategories] = useState<string[]>(categories)
  const [appliedPriceRanges, setAppliedPriceRanges] = useState<number[]>([])
  
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name'>('name')
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [showPriceDropdown, setShowPriceDropdown] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      try {
        let categoriesToApply = tempSelectedCategories
        let searchToApply = tempSearchQuery
        
        if (categoryParam) {
          const formatted = categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)
          if (categories.includes(formatted)) {
            setTempSelectedCategories([formatted])
            setAppliedCategories([formatted])
            categoriesToApply = [formatted]
          }
        }
        if (searchParam) {
          setTempSearchQuery(searchParam)
          setAppliedSearchQuery(searchParam)
          searchToApply = searchParam
        }
        
        const priceRangesFilter = tempSelectedPriceRanges.map(index => priceRanges[index])
        const results = await searchProducts({
          query: searchToApply || undefined,
          categories: categoriesToApply.length > 0 ? categoriesToApply : undefined,
          priceRanges: priceRangesFilter.length > 0 ? priceRangesFilter : undefined,
        })
        setProducts(results)
      } catch (error) {
        console.error('Error al cargar productos:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadProducts()
  }, [categoryParam, searchParam])

  const handleApplyFilters = async () => {
    setAppliedSearchQuery(tempSearchQuery)
    setAppliedCategories(tempSelectedCategories)
    setAppliedPriceRanges(tempSelectedPriceRanges)
    setShowCategoryDropdown(false)
    setShowPriceDropdown(false)
    
    // Cargar productos con los nuevos filtros
    setLoading(true)
    try {
      const priceRangesFilter = tempSelectedPriceRanges.map(index => priceRanges[index])
      const results = await searchProducts({
        query: tempSearchQuery,
        categories: tempSelectedCategories.length > 0 ? tempSelectedCategories : undefined,
        priceRanges: priceRangesFilter.length > 0 ? priceRangesFilter : undefined,
      })
      setProducts(results)
    } catch (error) {
      console.error('Error al buscar productos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryToggle = (category: string) => {
    setTempSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handlePriceRangeToggle = (index: number) => {
    setTempSelectedPriceRanges(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Ordenar
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    return result
  }, [products, sortBy])

  const clearFilters = async () => {
    setTempSearchQuery('')
    setTempSelectedCategories(categories)
    setTempSelectedPriceRanges([])
    setAppliedSearchQuery('')
    setAppliedCategories(categories)
    setAppliedPriceRanges([])
    
    // Recargar todos los productos
    setLoading(true)
    try {
      const results = await searchProducts({
        categories: categories,
      })
      setProducts(results)
    } catch (error) {
      console.error('Error al limpiar filtros:', error)
    } finally {
      setLoading(false)
    }
  }

  const hasActiveFilters = appliedSearchQuery || appliedCategories.length !== categories.length || appliedPriceRanges.length > 0

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            Catálogo de productos
          </h1>
        </div>
        {/* Search Bar */}
        <div className="mb-6 mx-auto max-w-2xl">
          <div className="flex gap-2">
            <input
              type="text"
              value={tempSearchQuery}
              onChange={(e) => setTempSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleApplyFilters()}
              placeholder="Buscar productos..."
              className="flex-1 rounded-lg border border-border bg-card px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              onClick={handleApplyFilters}
              className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary/90 transition-colors cursor-pointer"
            >
              Buscar
            </button>
          </div>
          {/* Results message */}
          <p className="mt-4 text-center text-sm text-muted-foreground">
            {appliedSearchQuery ? (
              <>
                Mostrando {filteredProducts.length} {filteredProducts.length === 1 ? 'resultado' : 'resultados'} para "{appliedSearchQuery}"
              </>
            ) : (
              <>
                Mostrando {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'}
              </>
            )}
          </p>
        </div>

        {/* Filters Bar */}
        <div className="mb-8 border-b border-border pb-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium">Filtros:</span>
            
            {/* Category Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowCategoryDropdown((prev) => {
                    const next = !prev
                    if (next) {
                      setShowPriceDropdown(false)
                    }
                    return next
                  })
                }}
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:bg-secondary"
              >
                Categoría
                <ChevronIcon className={`h-4 w-4 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showCategoryDropdown && (
                <div className="absolute left-0 top-full mt-2 w-64 rounded-lg border border-border bg-white shadow-lg z-10">
                  <div className="p-4">
                    <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                      {categories.map((category) => (
                        <label key={category} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={tempSelectedCategories.includes(category)}
                            onChange={() => handleCategoryToggle(category)}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          <span className="text-sm">{category}</span>
                        </label>
                      ))}
                    </div>
                    <button
                      onClick={handleApplyFilters}
                      className="w-full rounded border border-black bg-primary px-4 py-2 text-sm text-primary-foreground font-medium transition-colors hover:bg-primary/90 cursor-pointer"
                    >
                      Aplicar
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Price Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowPriceDropdown((prev) => {
                    const next = !prev
                    if (next) {
                      setShowCategoryDropdown(false)
                    }
                    return next
                  })
                }}
                className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm hover:bg-secondary transition-colors cursor-pointer"
              >
                Precio
                <ChevronIcon className={`h-4 w-4 transition-transform ${showPriceDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showPriceDropdown && (
                <div className="absolute left-0 top-full mt-2 w-64 rounded-lg border border-border bg-background shadow-lg z-10">
                  <div className="p-4">
                    <div className="space-y-3 mb-4">
                      {priceRanges.map((range, index) => (
                        <label key={index} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={tempSelectedPriceRanges.includes(index)}
                            onChange={() => handlePriceRangeToggle(index)}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          <span className="text-sm">{range.label}</span>
                        </label>
                      ))}
                    </div>
                    <button
                      onClick={handleApplyFilters}
                      className="w-full rounded border border-black bg-primary px-4 py-2 text-sm text-primary-foreground font-medium hover:bg-primary/90 transition-colors cursor-pointer"
                    >
                      Aplicar
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <CloseIcon className="h-4 w-4" />
                Limpiar filtros
              </button>
            )}

            {/* Sort Dropdown and View Toggle */}
            <div className="ml-auto flex items-center gap-4">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Ordenar por:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors cursor-pointer"
                >
                  <option value="price-asc">Precio: menor a mayor</option>
                  <option value="price-desc">Precio: mayor a menor</option>
                  <option value="name">Nombre A-Z</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex rounded-lg border border-border">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-secondary' : 'bg-card hover:bg-secondary/50'} rounded-l-lg transition-colors cursor-pointer`}
                >
                  <GridIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-secondary' : 'bg-card hover:bg-secondary/50'} rounded-r-lg transition-colors cursor-pointer`}
                >
                  <ListIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-sm text-muted-foreground">Cargando productos...</p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && (
          <ProductView
            products={filteredProducts}
            noCategoriesSelected={appliedCategories.length === 0}
            viewMode={viewMode}
          />
        )}
      </main>
    </div>
  )
}
