import React from 'react'
import { useCart } from '@/context/CartContext'
import type { Product } from '@/lib/types'
import { CartIcon } from '@/assets/icons/CartIcon'

interface ProductCardProps {
    product: Product
    viewMode?: 'grid' | 'list'
}

export function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
    const { addItem } = useCart()
    const hasDiscount = product.discount > 0
    const discountedPrice = hasDiscount
        ? product.price - (product.price * product.discount) / 100
        : product.price

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
        }).format(price)
    }

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        addItem(product)
    }

    return (
        <article className={`group overflow-hidden rounded-xl bg-card shadow-sm transition-shadow hover:shadow-md ${viewMode === 'list' ? 'flex flex-row' : ''
            }`}>
            <a href={`/catalogo/${product.code}`} className={viewMode === 'list' ? 'flex flex-row w-full' : ''}>
                <div className={`relative overflow-hidden bg-secondary ${viewMode === 'grid'
                        ? 'aspect-square'
                        : 'w-40 h-40 flex-shrink-0'
                    }`}>
                    <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {product.discount > 0 && (
                        <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-semibold">
                            -{product.discount}%
                        </div>
                    )}
                </div>
                <div className={`p-4 ${viewMode === 'list' ? 'flex flex-col justify-between flex-1' : ''}`}>
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            {product.category}
                        </p>
                        <h3 className={`mt-1 font-medium text-foreground ${viewMode === 'grid' ? 'line-clamp-1' : ''}`}>
                            {product.name}
                        </h3>
                        {viewMode === 'list' && (
                            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                                {product.description}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                            {hasDiscount && (
                                <p className="text-sm text-muted-foreground line-through">
                                    {formatPrice(product.price)}
                                </p>
                            )}
                            <p className="text-lg font-semibold text-foreground">
                                {formatPrice(discountedPrice)}
                            </p>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition-all hover:scale-110 cursor-pointer"
                        >
                            <CartIcon className="h-4 w-4" />
                            <span className="sr-only">Agregar al carrito</span>
                        </button>
                    </div>
                </div>
            </a>
        </article>
    )
}
