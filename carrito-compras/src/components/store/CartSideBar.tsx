'use client'

import { useCart } from "@/context/CartContext"

function MinusIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
    )
}

function PlusIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
    )
}

function TrashIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
    )
}

export function CartSidebar() {
    const { state, removeItem, updateQuantity, getTotal, closeCart } = useCart()
    const { items } = state

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
        }).format(price)
    }

    if (items.length === 0) {
        return (
            <div className=" flex flex-1 flex-col items-center justify-center py-12">
                <div className="text-center">
                    <p className="text-lg font-medium text-foreground">Tu carrito está vacío</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Añade algunos productos para comenzar
                    </p>
                    <a
                        href="/"
                        onClick={closeCart}
                        className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-secondary transition-colors hover:bg-primary/90"
                    >
                        Explorar Productos
                    </a>
                </div>
            </div>
        )
    }

    return (
        <div className="flex h-full flex-col">
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-4">
                    {items.map((item) => (
                        <li key={item.product.id} className="flex gap-4">
                            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
                                <img
                                    src={item.product.image || "/placeholder.svg"}
                                    alt={item.product.name}
                                    className="h-full w-full object-cover"
                                />

                            </div>
                            <div className="flex flex-1 flex-col">
                                <div className="flex justify-between">
                                    <h4 className="text-sm font-medium text-foreground line-clamp-1">
                                        {item.product.name}
                                    </h4>
                                    <button
                                        className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground transition-colors hover:text-destructive"
                                        onClick={() => removeItem(item.product.id)}
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                        <span className="sr-only">Eliminar</span>
                                    </button>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {formatPrice(item.product.price)}
                                </p>
                                <div className="mt-auto flex items-center gap-2">
                                    <button
                                        className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-transparent text-foreground transition-colors hover:bg-secondary"
                                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                    >
                                        <MinusIcon className="h-3 w-3" />
                                        <span className="sr-only">Reducir cantidad</span>
                                    </button>
                                    <span className="w-8 text-center text-sm font-medium">
                                        {item.quantity}
                                    </span>
                                    <button
                                        className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-transparent text-foreground transition-colors hover:bg-secondary"
                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                    >
                                        <PlusIcon className="h-3 w-3" />
                                        <span className="sr-only">Aumentar cantidad</span>
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Cart Footer */}
            <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">Subtotal</span>
                    <span className="text-sm font-medium">{formatPrice(getTotal())}</span>
                </div>
                <div className="my-2 h-px bg-border" />
                <div className="flex items-center justify-between py-2">
                    <span className="text-base font-semibold">Total</span>
                    <span className="text-base font-semibold">{formatPrice(getTotal())}</span>
                </div>
                <div className="mt-4 space-y-2">
                    <a
                        href="/carrito"
                        onClick={closeCart}
                        className="flex w-full items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                        Ver Carrito
                    </a>
                    <button
                        onClick={closeCart}
                        className="flex w-full items-center justify-center rounded-lg border border-border bg-transparent px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                    >
                        Finalizar Compra
                    </button>
                </div>
            </div>
        </div>
    )
}
