import { useState, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router'
import { searchProducts } from '../../../application/products/searchProducts'
import { mockProductRepository } from '../../../infrastructure/products/mockProductRepository'
import { getCategories } from '../../../application/categories/getCategories'
import { mockCategoryRepository } from '../../../infrastructure/categories/mockCategoryRepository'
import { getPriceRanges } from '../../../application/priceRanges/getPriceRanges'
import { mockPriceRangeRepository } from '../../../infrastructure/priceRanges/mockPriceRangeRepository'
import type { Product } from '../../../domain/models/Product'
import type { Category } from '../../../domain/models/Category'
import type { PriceRange } from '../../../domain/models/PriceRange'
import { CloseIcon } from '@/assets/icons/CloseIcon'
import { ProductView } from './ProductView'
import { ChevronIcon } from '@/assets/icons/ChevronIcon'
import { GridIcon } from '@/assets/icons/GridIcon'
import { ListIcon } from '@/assets/icons/ListIcon'

/**
 * Componente de catálogo de productos.
 * 
 * Responsabilidades:
 * - Mostrar un listado de productos con opciones de búsqueda, filtrado y ordenamiento.
 * - Permitir a los usuarios aplicar filtros por categoría y rango de precio.
 * - Actualizar la URL con los parámetros de búsqueda y categoría para compartir enlaces.
 * 
 * Contexto de Negocio:
 * - El catálogo es la página principal donde los usuarios pueden explorar los productos disponibles.
 * - La capacidad de filtrar y ordenar productos mejora la experiencia de usuario y facilita la búsqueda.
 * - La sincronización de filtros con la URL permite a los usuarios compartir fácilmente sus búsquedas y categorías favoritas.
 * 
 * Dependencias:
 * - searchProducts: Función para buscar productos según criterios.
 * - getCategories: Función para obtener la lista de categorías disponibles.
 * - getPriceRanges: Función para obtener la lista de rangos de precio disponibles.
 */
export function Catalogo() {
  const location = useLocation()
  const { categoryParam, searchParam } = useMemo(() => {
    const params = new URLSearchParams(location.search)
    return {
      categoryParam: params.get('categoria'),
      searchParam: params.get('buscar'),
    }
  }, [location.search])

  // Estados para categorías y rangos de precio
  const [categories, setCategories] = useState<Category[]>([])
  const [priceRanges, setPriceRanges] = useState<PriceRange[]>([])

  const [tempSearchQuery, setTempSearchQuery] = useState(searchParam || '')
  const [tempSelectedCategories, setTempSelectedCategories] = useState<string[]>(
    []
  )
  const [tempSelectedPriceRanges, setTempSelectedPriceRanges] = useState<
    number[]
  >([])

  const [appliedSearchQuery, setAppliedSearchQuery] = useState(searchParam || '')
  const [appliedCategories, setAppliedCategories] = useState<string[]>([])
  const [appliedPriceRanges, setAppliedPriceRanges] = useState<number[]>([])

  const [sortBy, setSortBy] = useState<
    'default' | 'price-asc' | 'price-desc' | 'name'
  >('name')
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [showPriceDropdown, setShowPriceDropdown] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  // Cargar categorías y rangos de precio
  useEffect(() => {
    const loadFilters = async () => {
      try {
        const loadedCategories = await getCategories(mockCategoryRepository)
        const loadedPriceRanges = await getPriceRanges(mockPriceRangeRepository)
        
        setCategories(loadedCategories)
        setPriceRanges(loadedPriceRanges)
        
        // Si es la primera carga, inicializar categorías según si hay parámetro en URL
        if (categoryParam) {
          const formatted =
            categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)
          const categoryExists = loadedCategories.some(c => c.name === formatted)
          if (categoryExists) {
            setTempSelectedCategories([formatted])
            setAppliedCategories([formatted])
          } else {
            // Si la categoría del parámetro no existe, seleccionar todas
            setTempSelectedCategories(loadedCategories.map(c => c.name))
            setAppliedCategories(loadedCategories.map(c => c.name))
          }
        } else {
          // Si no hay parámetro de categoría, seleccionar todas por defecto
          setTempSelectedCategories(loadedCategories.map(c => c.name))
          setAppliedCategories(loadedCategories.map(c => c.name))
        }
      } catch (error) {
        console.error('Error al cargar filtros:', error)
      }
    }

    loadFilters()
  }, [categoryParam])

  // Sincronizar parámetro de búsqueda con estado
  useEffect(() => {
    if (searchParam) {
      setTempSearchQuery(searchParam)
      setAppliedSearchQuery(searchParam)
    } else {
      setTempSearchQuery('')
      setAppliedSearchQuery('')
    }
  }, [searchParam])

  useEffect(() => {
    if (categories.length === 0) return // Esperar a que se carguen las categorías

    const loadProducts = async () => {
      setLoading(true)
      try {
        let categoriesToApply = appliedCategories
        let searchToApply = appliedSearchQuery

        // Si no hay categorías para aplicar, no buscar nada
        if (categoriesToApply.length === 0) {
          setProducts([])
          setLoading(false)
          return
        }

        const priceRangesFilter = appliedPriceRanges.map(
          (index) => priceRanges[index]
        )
        const results = await searchProducts(mockProductRepository, {
          query: searchToApply || undefined,
          categories: categoriesToApply,
          priceRanges:
            priceRangesFilter.length > 0 ? priceRangesFilter : undefined,
        })
        setProducts(results)
      } catch (error) {
        console.error('Error al cargar productos:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [appliedCategories, appliedSearchQuery, appliedPriceRanges, priceRanges])

  const handleApplyFilters = async () => {
    setAppliedSearchQuery(tempSearchQuery)
    setAppliedCategories(tempSelectedCategories)
    setAppliedPriceRanges(tempSelectedPriceRanges)
    setShowCategoryDropdown(false)
    setShowPriceDropdown(false)

    setLoading(true)
    try {
      // Si no hay categorías seleccionadas, no mostrar productos
      if (tempSelectedCategories.length === 0) {
        setProducts([])
        setLoading(false)
        return
      }

      const priceRangesFilter = tempSelectedPriceRanges.map(
        (index) => priceRanges[index]
      )
      const results = await searchProducts(mockProductRepository, {
        query: tempSearchQuery,
        categories: tempSelectedCategories,
        priceRanges:
          priceRangesFilter.length > 0 ? priceRangesFilter : undefined,
      })
      setProducts(results)
    } catch (error) {
      console.error('Error al buscar productos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryToggle = (category: string) => {
    setTempSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  const handlePriceRangeToggle = (index: number) => {
    setTempSelectedPriceRanges((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  const filteredProducts = useMemo(() => {
    let result = [...products]

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
    const categoryNames = categories.map(c => c.name)
    
    setTempSearchQuery('')
    setTempSelectedCategories(categoryNames)
    setTempSelectedPriceRanges([])
    setAppliedSearchQuery('')
    setAppliedCategories(categoryNames)
    setAppliedPriceRanges([])

    setLoading(true)
    try {
      const results = await searchProducts(mockProductRepository, {
        categories: categoryNames,
      })
      setProducts(results)
    } catch (error) {
      console.error('Error al limpiar filtros:', error)
    } finally {
      setLoading(false)
    }
  }

  const hasActiveFilters =
    appliedSearchQuery ||
    appliedCategories.length !== categories.length ||
    appliedPriceRanges.length > 0

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            Catálogo de productos
          </h1>
        </div>
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
          <p className="mt-4 text-center text-sm text-muted-foreground">
            {appliedSearchQuery ? (
              <>
                Mostrando {filteredProducts.length}{' '}
                {filteredProducts.length === 1 ? 'resultado' : 'resultados'} para
                "{appliedSearchQuery}"
              </>
            ) : (
              <>
                Mostrando {filteredProducts.length}{' '}
                {filteredProducts.length === 1 ? 'producto' : 'productos'}
              </>
            )}
          </p>
        </div>

        <div className="mb-8 border-b border-border pb-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium">Filtros:</span>

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
                <ChevronIcon
                  className={`h-4 w-4 transition-transform ${
                    showCategoryDropdown ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {showCategoryDropdown && (
                <div className="absolute left-0 top-full mt-2 w-64 rounded-lg border border-border bg-white shadow-lg z-10">
                  <div className="p-4">
                    <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                      {categories.map((category) => (
                        <label
                          key={category.code}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={tempSelectedCategories.includes(category.name)}
                            onChange={() => handleCategoryToggle(category.name)}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          <span className="text-sm">{category.name}</span>
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
                <ChevronIcon
                  className={`h-4 w-4 transition-transform ${
                    showPriceDropdown ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {showPriceDropdown && (
                <div className="absolute left-0 top-full mt-2 w-64 rounded-lg border border-border bg-background shadow-lg z-10">
                  <div className="p-4">
                    <div className="space-y-3 mb-4">
                      {priceRanges.map((range, index) => (
                        <label
                          key={index}
                          className="flex items-center gap-2 cursor-pointer"
                        >
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

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <CloseIcon className="h-4 w-4" />
                Limpiar filtros
              </button>
            )}

            <div className="ml-auto flex items-center gap-4">
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

              <div className="flex rounded-lg border border-border">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${
                    viewMode === 'grid'
                      ? 'bg-secondary'
                      : 'bg-card hover:bg-secondary/50'
                  } rounded-l-lg transition-colors cursor-pointer`}
                >
                  <GridIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${
                    viewMode === 'list'
                      ? 'bg-secondary'
                      : 'bg-card hover:bg-secondary/50'
                  } rounded-r-lg transition-colors cursor-pointer`}
                >
                  <ListIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-sm text-muted-foreground">Cargando productos...</p>
          </div>
        )}

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
