import { useCart } from "@/context/CartContext"
import { TrashIcon } from "@/assets/icons/TrashIcon"
import { MinusIcon } from "@/assets/icons/MinusIcon"
import { PlusIcon } from "@/assets/icons/PlusIcon"
import { Link } from "react-router"

export function CartSidebar() {
    const { state, removeItem, updateQuantity, getTotal, closeCart } = useCart()
    const { items } = state

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
        }).format(price)
    }
    const getDiscountedPrice = (price: number, discount: number) => {
        return discount > 0 ? price - (price * discount) / 100 : price
    }

    if (items.length === 0) {
        return (
            <div className=" flex flex-1 flex-col items-center justify-center py-12">
                <div className="text-center">
                    <p className="text-lg font-medium text-foreground">Tu carrito está vacío</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Añade algunos productos para comenzar
                    </p>
                    <Link
                        to="/"
                        onClick={closeCart}
                        className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-secondary transition-colors hover:bg-primary/90"
                    >
                        Explorar Productos
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="flex h-full flex-col">
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-4">
                    {items.map((item) => {
                        const hasDiscount = item.product.discount > 0
                        const discountedPrice = getDiscountedPrice(
                            item.product.price,
                            item.product.discount
                        )
                        return (
                        <li key={item.product.code} className="flex gap-4">
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
                                        onClick={() => removeItem(item.product.code)}
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                        <span className="sr-only">Eliminar</span>
                                    </button>
                                </div>
                                <div className="text-sm">
                                    {hasDiscount && (
                                        <p className="text-muted-foreground line-through">
                                            {formatPrice(item.product.price)}
                                        </p>
                                    )}
                                    <p className="text-muted-foreground">
                                        {formatPrice(discountedPrice)}
                                    </p>
                                </div>
                                <div className="mt-auto flex items-center gap-2">
                                    <button
                                        className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-transparent text-foreground transition-colors hover:bg-secondary"
                                        onClick={() => updateQuantity(item.product.code, item.quantity - 1)}
                                    >
                                        <MinusIcon className="h-3 w-3" />
                                        <span className="sr-only">Reducir cantidad</span>
                                    </button>
                                    <span className="w-8 text-center text-sm font-medium">
                                        {item.quantity}
                                    </span>
                                    <button
                                        className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-transparent text-foreground transition-colors hover:bg-secondary"
                                        onClick={() => updateQuantity(item.product.code, item.quantity + 1)}
                                    >
                                        <PlusIcon className="h-3 w-3" />
                                        <span className="sr-only">Aumentar cantidad</span>
                                    </button>
                                </div>
                            </div>
                        </li>
                        )})}
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
                    <Link
                        to="/carrito"
                        onClick={closeCart}
                        className="flex w-full items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                        Ver Carrito
                    </Link>
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
