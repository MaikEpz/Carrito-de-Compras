import { ArrowLeftIcon } from "@/assets/icons/ArrowLeftIcon"
import { CheckIcon } from "@/assets/icons/CheckIcon"
import { CartIcon } from "@/assets/icons/CartIcon"
import { MinusIcon } from "@/assets/icons/MinusIcon"
import { PlusIcon } from "@/assets/icons/PlusIcon"
import { TruckIcon } from "@/assets/icons/TruckIcon"
import { RefreshIcon } from "@/assets/icons/RefreshIcon"
import { ShieldIcon } from "@/assets/icons/ShieldIcon"
import { useCart } from "@/context/CartContext"
import { fetchProductByCode } from "@/lib/products"
import type { Product } from "@/lib/types"
import { useEffect, useState } from "react"
import { useParams } from "react-router"


export function ProductDetail() {
    const { code } = useParams<{ code: string }>()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(false)
    const [addedToCart, setAddedToCart] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const { addItem } = useCart()

    useEffect(() => {
        const loadProduct = async () => {
            if (!code) {
                setProduct(null)
                setLoading(false)
                return
            }
            setLoading(true)
            const data = await fetchProductByCode(code)
            setProduct(data)
            setLoading(false)
        }
        loadProduct()
    }, [code])

    const handleAddToCart = () => {
        if (product) {
            for (let i = 0; i < quantity; i++) {
                addItem(product)
            }
            setAddedToCart(true)
            setTimeout(() => setAddedToCart(false), 2000)
        }
    }
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
        }).format(price)
    }

    return (
        <main className="flex-1">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="mb-8">
                    <a
                        href="/"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeftIcon className="mr-2 size-3" />
                        Volver a la tienda
                    </a>
                </nav>
                {/* Loading state */}
                {loading && (

                    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                        <div className="text-center py-12">
                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                            <p className="mt-4 text-sm text-muted-foreground">Cargando producto...</p>
                        </div>
                    </div>

                )}

                {product === null && !loading && (
                    <div className="flex flex-1 flex-col items-center justify-center">
                        <h1 className="text-2xl font-semibold text-foreground">
                            Producto no encontrado
                        </h1>
                        <p className="mt-2 text-muted-foreground">
                            El producto que buscas no existe o ha sido eliminado.
                        </p>
                        <a
                            href="/"
                            className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                        >
                            Volver a la tienda
                        </a>
                    </div>
                )}

                {/* Product Detail */}
                {product && !loading && (
                <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary">
                        <img
                            src={product.image || '/placeholder.svg'}
                            alt={product.name}
                            className="object-cover"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <span className="mb-4 w-fit rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                            {product.category}
                        </span>

                        <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
                            {product.name}
                        </h1>

                        <p className="mt-4 text-3xl font-semibold text-foreground">
                            {formatPrice(product.price)}
                        </p>

                        <p className="mt-6 text-muted-foreground leading-relaxed">
                            {product.description}
                        </p>

                        <div className="my-8 h-px bg-border" />

                        {/* Quantity Selector */}
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-foreground">Cantidad:</span>
                            <div className="flex items-center gap-2">
                                <button
                                    className="flex size-8 items-center justify-center rounded-md border border-border bg-transparent text-foreground transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1}
                                >
                                    <MinusIcon className="size-3" />
                                    <span className="sr-only">Reducir cantidad</span>
                                </button>
                                <span className="w-12 text-center text-lg font-medium">
                                    {quantity}
                                </span>
                                <button
                                    className="flex size-8 items-center justify-center rounded-md border border-border bg-transparent text-foreground transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                                    onClick={() => setQuantity(quantity + 1)}
                                    disabled={quantity >= product.stock}
                                >
                                    <PlusIcon className="size-3" />
                                    <span className="sr-only">Aumentar cantidad</span>
                                </button>
                            </div>
                            <span className="text-sm text-muted-foreground">
                                {product.stock} disponibles
                            </span>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            className="mt-8 inline-flex w-full items-center justify-center rounded-lg bg-primary px-6 py-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer sm:w-auto"
                            onClick={handleAddToCart}
                            disabled={addedToCart}
                        >
                            {addedToCart ? (
                                <>
                                    <CheckIcon className="mr-2 h-5 w-5" />
                                    Añadido al carrito
                                </>
                            ) : (
                                <>
                                    <CartIcon className="mr-2 h-5 w-5" />
                                    Agregar al carrito
                                </>
                            )}
                        </button>

                        {/* Features */}
                        <div className="mt-10 grid gap-4 sm:grid-cols-3">
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <TruckIcon className="h-5 w-5 shrink-0" />
                                <span>Envío gratis a partir de 100€</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <RefreshIcon className="h-5 w-5 shrink-0" />
                                <span>Devolución en 30 días</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <ShieldIcon className="h-5 w-5 shrink-0" />
                                <span>Garantía de 2 años</span>
                            </div>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </main>
    )
}
