import { ArrowLeftIcon } from '@/assets/icons/ArrowLeftIcon'
import { CheckIcon } from '@/assets/icons/CheckIcon'
import { CartIcon } from '@/assets/icons/CartIcon'
import { MinusIcon } from '@/assets/icons/MinusIcon'
import { PlusIcon } from '@/assets/icons/PlusIcon'
import { TruckIcon } from '@/assets/icons/TruckIcon'
import { RefreshIcon } from '@/assets/icons/RefreshIcon'
import { ShieldIcon } from '@/assets/icons/ShieldIcon'
import { formatPrice } from '../../utils/formatPrice'
import { getDiscountedPrice } from '../../utils/getDiscountedPrice'
import { useCart } from '../../context/CartContext'
import { getProductByCode } from '../../../application/products/getProductByCode'
import { mockProductRepository } from '../../../infrastructure/products/mockProductRepository'
import type { Product } from '../../../domain/models/Product'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'

/**
 * Componente de Detalle de Producto que muestra información detallada de un producto específico, incluyendo imagen, descripción, precio, opciones de cantidad y botón para agregar al carrito.
 *
 * Responsabilidad:
 * - Cargar y mostrar información detallada del producto basado en el código proporcionado en la URL.
 * - Permitir al usuario seleccionar la cantidad deseada y agregar el producto al carrito.
 * 
 * Contexto de Negocio:
 * - Si el producto tiene un descuento, se muestra el precio original tachado y el precio con descuento destacado.
 * - El usuario puede ajustar la cantidad antes de agregar al carrito, respetando el stock disponible.
 * - Después de agregar al carrito, se muestra una confirmación visual y se deshabilita el botón para evitar múltiples adiciones accidentales.
 * 
 * Dependencias:
 * - useCart: Hook para acceder al estado y acciones del carrito.
 * - getProductByCode: Función para obtener los detalles del producto basado en su código.
 * - formatPrice: Función para formatear el precio de manera legible.
 * - getDiscountedPrice: Función para calcular el precio con descuento aplicado.
 * - Iconos: ArrowLeftIcon, CheckIcon, CartIcon, MinusIcon, PlusIcon, TruckIcon, RefreshIcon, ShieldIcon para mejorar la experiencia visual y de interacción.
 */
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
      const data = await getProductByCode(mockProductRepository, code)
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

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-8">
          <Link
            to="/catalogo"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeftIcon className="mr-2 size-3" />
            Volver a la tienda
          </Link>
        </nav>
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
            <Link
              to="/"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Volver a la tienda
            </Link>
          </div>
        )}

        {product && !loading && (
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary">
              <img
                src={product.image || '/placeholder.svg'}
                alt={product.name}
                className="object-cover"
              />
            </div>

            <div className="flex flex-col">
              <span className="mb-4 w-fit rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                {product.category}
              </span>

              <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
                {product.name}
              </h1>

              <div className="mt-4 flex items-baseline gap-3">
                {product.discount > 0 && (
                  <p className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.price)}
                  </p>
                )}
                <p className="text-3xl font-semibold text-foreground">
                  {formatPrice(getDiscountedPrice(product.price, product.discount))}
                </p>
              </div>

              <p className="mt-6 text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              <div className="my-8 h-px bg-border" />

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
