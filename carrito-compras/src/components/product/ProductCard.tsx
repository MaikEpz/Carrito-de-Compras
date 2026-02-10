'use client'

import React from 'react'
import { useCart } from '@/context/CartContext'
import type { Product } from '@/lib/types'

function CartIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
    )
}

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCart()

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
        <article className="group overflow-hidden rounded-xl bg-card shadow-sm transition-shadow hover:shadow-md">
            <a href={`/producto/${product.id}`}>
                <div className="relative aspect-square overflow-hidden bg-secondary">
                    <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    <button
                        onClick={handleAddToCart}
                        className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:scale-115 cursor-pointer"
                    >
                        <CartIcon className="h-4 w-4 text-secondary-foreground bg-background" />
                        <span className="sr-only">Agregar al carrito</span>
                    </button>
                </div>
                <div className="p-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {product.category}
                    </p>
                    <h3 className="mt-1 font-medium text-foreground line-clamp-1">
                        {product.name}
                    </h3>
                    <p className="mt-2 text-lg font-semibold text-foreground">
                        {formatPrice(product.price)}
                    </p>
                </div>
            </a>
        </article>
    )
}
