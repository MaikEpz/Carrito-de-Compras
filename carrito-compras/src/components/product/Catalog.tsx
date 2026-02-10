'use client'

import { useState, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router'
import { mockProducts } from '@/lib/products'
import { ProductGrid } from './ProductGrid'

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

const categories = ['Muebles', 'Decoración', 'Iluminación', 'Textiles']
const priceRanges = [
  { label: 'Menos de $50', min: 0, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: '$100 - $200', min: 100, max: 200 },
  { label: 'Más de $200', min: 200, max: Infinity }
]

export function Catalog() {
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

  useEffect(() => {
    if (categoryParam) {
      const formatted = categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)
      if (categories.includes(formatted)) {
        setTempSelectedCategories([formatted])
        setAppliedCategories([formatted])
      }
    }
    if (searchParam) {
      setTempSearchQuery(searchParam)
      setAppliedSearchQuery(searchParam)
    }
  }, [categoryParam, searchParam])

  const handleApplyFilters = () => {
    setAppliedSearchQuery(tempSearchQuery)
    setAppliedCategories(tempSelectedCategories)
    setAppliedPriceRanges(tempSelectedPriceRanges)
    setShowCategoryDropdown(false)
    setShowPriceDropdown(false)
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
    let result = [...mockProducts]

    // Filtrar por categoría aplicada
    if (appliedCategories.length === 0) {
      return []
    }
    result = result.filter((p) => appliedCategories.includes(p.category))

    // Filtrar por rangos de precio aplicados
    if (appliedPriceRanges.length > 0) {
      result = result.filter((p) => 
        appliedPriceRanges.some(index => {
          const range = priceRanges[index]
          return p.price >= range.min && p.price < range.max
        })
      )
    }

    // Filtrar por búsqueda aplicada
    if (appliedSearchQuery.trim()) {
      const query = appliedSearchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      )
    }

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
  }, [appliedCategories, appliedPriceRanges, appliedSearchQuery, sortBy])

  const clearFilters = () => {
    setTempSearchQuery('')
    setTempSelectedCategories([])
    setTempSelectedPriceRanges([])
    setAppliedSearchQuery('')
    setAppliedCategories([])
    setAppliedPriceRanges([])
  }

  const hasActiveFilters = appliedSearchQuery || appliedCategories.length > 0 || appliedPriceRanges.length > 0

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
              className="rounded-lg bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-black/80"
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
            <span className="text-sm font-medium">Filter</span>
            
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
                      className="w-full rounded border border-black px-4 py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors"
                    >
                      Apply
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
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:bg-secondary"
              >
                Precio
                <ChevronIcon className={`h-4 w-4 transition-transform ${showPriceDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showPriceDropdown && (
                <div className="absolute left-0 top-full mt-2 w-64 rounded-lg border border-border bg-card shadow-lg z-10">
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
                      className="w-full rounded border border-black px-4 py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
              >
                <CloseIcon className="h-4 w-4" />
                Limpiar filtros
              </button>
            )}

            {/* Sort Dropdown */}
            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm font-medium">Ordenar por:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
                <option value="name">Nombre A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <ProductGrid
          products={filteredProducts}
          noCategoriesSelected={appliedCategories.length === 0}
        />
      </main>
    </div>
  )
}
