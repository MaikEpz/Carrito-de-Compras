import type { Product } from './types'

// Datos de productos de ejemplo (en producción vendrían de la API REST)
export const mockProducts: Product[] = [
  {
    code: 'SOF-OSL-001',
    name: 'Sofá Moderno Oslo',
    description: 'Sofá de tres plazas con diseño escandinavo minimalista. Tapizado en tela de alta calidad con patas de madera de roble natural. Perfecto para espacios contemporáneos.',
    price: 1299.00,
    image: '/products/sofa.jpg',
    category: 'Muebles',
    stock: 15,
    discount: 10,
  },
  {
    code: 'LAM-ARC-002',
    name: 'Lámpara de Pie Arco',
    description: 'Elegante lámpara de pie con brazo arqueado y base de mármol. Pantalla de lino natural que proporciona una luz cálida y acogedora.',
    price: 349.00,
    image: '/products/lamp.jpg',
    category: 'Iluminación',
    stock: 23,
    discount: 0,
  },
  {
    code: 'MES-NOR-003',
    name: 'Mesa de Centro Nórdica',
    description: 'Mesa de centro redonda con superficie de mármol blanco y patas de metal dorado. Combina elegancia clásica con diseño moderno.',
    price: 589.00,
    image: '/products/table.jpg',
    category: 'Muebles',
    stock: 8,
    discount: 15,
  },
  {
    code: 'SIL-COM-004',
    name: 'Sillón Lectura Comfort',
    description: 'Sillón individual perfecto para rincones de lectura. Respaldo alto ergonómico con tapizado de terciopelo suave en tonos neutros.',
    price: 749.00,
    image: '/products/chair.jpg',
    category: 'Muebles',
    stock: 12,
    discount: 20,
  },
  {
    code: 'JAR-ART-005',
    name: 'Jarrón Cerámico Artesanal',
    description: 'Jarrón hecho a mano por artesanos locales. Acabado mate en tonos tierra con textura única. Cada pieza es ligeramente diferente.',
    price: 89.00,
    image: '/products/vase.jpg',
    category: 'Decoración',
    stock: 45,
    discount: 0,
  },
  {
    code: 'ESP-DOR-006',
    name: 'Espejo Circular Dorado',
    description: 'Espejo decorativo con marco de metal dorado cepillado. Diámetro de 80cm, ideal para ampliar visualmente cualquier espacio.',
    price: 199.00,
    image: '/products/mirror.jpg',
    category: 'Decoración',
    stock: 18,
    discount: 5,
  },
  {
    code: 'COJ-SET-007',
    name: 'Cojines Set de 3',
    description: 'Set de tres cojines decorativos en tonos neutros y texturas variadas. Incluye fundas de lino, terciopelo y algodón orgánico.',
    price: 129.00,
    image: '/products/cushions.jpg',
    category: 'Textiles',
    stock: 32,
    discount: 0,
  },
  {
    code: 'EST-FLO-008',
    name: 'Estantería Flotante',
    description: 'Sistema de estantes flotantes modulares en madera de nogal. Set de 3 estantes de diferentes tamaños con herrajes ocultos.',
    price: 279.00,
    image: '/products/shelves.jpg',
    category: 'Muebles',
    stock: 20,
    discount: 0,
  },
]


// Simula una llamada a la API REST
export async function fetchProducts(): Promise<Product[]> {
  // Simular latencia de red
  await new Promise((resolve) => setTimeout(resolve, 800))
  return mockProducts
}

export async function fetchProductByCode(code: string): Promise<Product | null> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockProducts.find((p) => p.code === code) || null
}

export interface SearchFilters {
  query?: string
  categories?: string[]
  priceRanges?: Array<{ min: number; max: number }>
}

export async function searchProducts(filters: SearchFilters = {}): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  
  let result = [...mockProducts]
  
  // Filtrar por categorías
  if (filters.categories && filters.categories.length > 0) {
    result = result.filter((p) => filters.categories!.includes(p.category))
  }
  
  // Filtrar por rangos de precio
  if (filters.priceRanges && filters.priceRanges.length > 0) {
    result = result.filter((p) =>
      filters.priceRanges!.some(
        (range) => p.price >= range.min && p.price < range.max
      )
    )
  }
  
  // Filtrar por búsqueda de texto
  if (filters.query && filters.query.trim()) {
    const lowerQuery = filters.query.toLowerCase()
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
    )
  }
  
  return result
}
