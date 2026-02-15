import { ArrowLeftIcon } from '@/assets/icons/ArrowLeftIcon'
import { CreditCardIcon } from '@/assets/icons/CreditCardIcon'
import { MinusIcon } from '@/assets/icons/MinusIcon'
import { PlusIcon } from '@/assets/icons/PlusIcon'
import { ShieldIcon } from '@/assets/icons/ShieldIcon'
import { ShoppingBagIcon } from '@/assets/icons/ShoppingBagIcon'
import { TrashIcon } from '@/assets/icons/TrashIcon'
import { TruckIcon } from '@/assets/icons/TruckIcon'
import { useCart } from '@/context/CartContext'
import { Link } from 'react-router'

export function CartView() {
    const { state, removeItem, updateQuantity, getTotal, clearCart } = useCart()
    const { items } = state

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
        }).format(price)
    }

    const subtotal = getTotal()
    const shipping = subtotal >= 100 ? 0 : 9.99
    const total = subtotal + shipping
    return (
        <main className="flex-1 bg-background">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="mb-8">
                    <Link
                        to="/"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeftIcon className="mr-2 h-4 w-4" />
                        Continuar comprando
                    </Link>
                </nav>

                <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Tu Carrito
                </h1>
                {items.length === 0 ? (
                    <div className="mt-16 flex flex-col items-center justify-center text-center">
                        <div className="rounded-full bg-secondary p-6">
                            <ShoppingBagIcon className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <h2 className="mt-6 text-xl font-semibold text-foreground">
                            Tu carrito está vacío
                        </h2>
                        <p className="mt-2 text-muted-foreground">
                            Parece que aún no has añadido ningún producto a tu carrito.
                        </p>
                        <Link
                            to="/"
                            className="mt-8 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                        >
                            Explorar Productos
                        </Link>
                    </div>
                ) : (
                    <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-12">
                        {/* Cart Items */}
                        <div className="lg:col-span-7">
                            <div className="flex items-center justify-between border-b border-border pb-4">
                                <span className="text-sm text-muted-foreground">
                                    {items.length} producto{items.length !== 1 ? 's' : ''} en tu carrito
                                </span>
                                <button
                                    className="inline-flex items-center text-sm text-destructive transition-colors hover:text-destructive/90"
                                    onClick={clearCart}
                                >
                                    <TrashIcon className="mr-2 h-4 w-4" />
                                    Vaciar carrito
                                </button>
                            </div>

                            <ul className="divide-y divide-border">
                                {items.map((item) => (
                                    <li key={item.product.code} className="flex gap-6 py-6">
                                        {/* Product Image */}
                                        <Link
                                            to={`/catalogo/${item.product.code}`}
                                            className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-secondary sm:h-32 sm:w-32"
                                        >
                                            <img
                                                src={item.product.image || '/placeholder.svg'}
                                                alt={item.product.name}
                                                className="object-cover "

                                            />
                                        </Link>

                                        {/* Product Info */}
                                        <div className="flex flex-1 flex-col">
                                            <div className="flex justify-between">
                                                <div>
                                                    <Link
                                                        to={`/catalogo/${item.product.code}`}
                                                        className="font-medium text-foreground hover:underline"
                                                    >
                                                        {item.product.name}
                                                    </Link>
                                                    <p className="mt-1 text-sm text-muted-foreground">
                                                        {item.product.category}
                                                    </p>
                                                </div>
                                                <p className="text-lg font-semibold text-foreground">
                                                    {formatPrice(item.product.price * item.quantity)}
                                                </p>
                                            </div>

                                            <div className="mt-auto flex items-center justify-between">
                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-transparent text-foreground transition-colors hover:bg-secondary"
                                                        onClick={() =>
                                                            updateQuantity(item.product.code, item.quantity - 1)
                                                        }
                                                    >
                                                        <MinusIcon className="h-3 w-3" />
                                                        <span className="sr-only">Reducir cantidad</span>
                                                    </button>
                                                    <span className="w-10 text-center font-medium">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-transparent text-foreground transition-colors hover:bg-secondary"
                                                        onClick={() =>
                                                            updateQuantity(item.product.code, item.quantity + 1)
                                                        }
                                                    >
                                                        <PlusIcon className="h-3 w-3" />
                                                        <span className="sr-only">Aumentar cantidad</span>
                                                    </button>
                                                </div>

                                                {/* Remove Button */}
                                                <button
                                                    className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-destructive"
                                                    onClick={() => removeItem(item.product.code)}
                                                >
                                                    <TrashIcon className="mr-1 h-4 w-4" />
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Order Summary */}
                        <div className="mt-8 lg:col-span-5 lg:mt-0">
                            <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
                                <h2 className="text-xl font-semibold text-foreground">Resumen del Pedido</h2>

                                <div className="mt-6 space-y-4">
                                    {/* Promo Code */}
                                    <div>
                                        <label className="text-sm font-medium text-foreground">
                                            Código promocional
                                        </label>
                                        <div className="mt-2 flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Introduce tu código"
                                                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                            />
                                            <button className="rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
                                                Aplicar
                                            </button>
                                        </div>
                                    </div>

                                    <div className="h-px bg-border" />

                                    {/* Price Breakdown */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Subtotal</span>
                                            <span className="font-medium">{formatPrice(subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Envío</span>
                                            <span className="font-medium">
                                                {shipping === 0 ? (
                                                    <span className="text-green-600">Gratis</span>
                                                ) : (
                                                    formatPrice(shipping)
                                                )}
                                            </span>
                                        </div>
                                        {shipping > 0 && (
                                            <p className="text-xs text-muted-foreground">
                                                Añade {formatPrice(100 - subtotal)} más para envío gratis
                                            </p>
                                        )}
                                    </div>

                                    <div className="h-px bg-border" />

                                    <div className="flex justify-between text-lg font-semibold">
                                        <span>Total</span>
                                        <span>{formatPrice(total)}</span>
                                    </div>

                                    <button className="flex w-full items-center justify-center rounded-lg bg-primary px-6 py-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                                        <CreditCardIcon className="mr-2 h-5 w-5" />
                                        Finalizar Compra
                                    </button>

                                    <p className="text-center text-xs text-muted-foreground">
                                        Impuestos incluidos. El envío se calcula en el siguiente paso.
                                    </p>

                                    {/* Trust Badges */}
                                    <div className="mt-6 grid grid-cols-2 gap-4 pt-4">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <TruckIcon className="h-4 w-4 shrink-0" />
                                            <span>Envío gratis +100€</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <ShieldIcon className="h-4 w-4 shrink-0" />
                                            <span>Pago seguro</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                )}
            </div>

        </main >
    )
}