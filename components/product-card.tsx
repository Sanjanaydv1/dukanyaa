import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: number
  name: string
  price: number
  unit: string
  image: string
  rating: number
  reviewCount: number
  inStock: boolean
}

export function ProductCard({ product, storeId }: { product: Product; storeId: string }) {
  return (
    <Link href={`/store/${storeId}/product/${product.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <div className="relative h-40">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          {!product.inStock && <Badge className="absolute right-2 top-2 bg-destructive">Out of Stock</Badge>}
        </div>
        <CardContent className="p-4">
          <h3 className="mb-2 font-semibold text-balance">{product.name}</h3>

          <div className="mb-2 flex items-baseline gap-1">
            <span className="text-lg font-bold text-primary">Rs. {product.price}</span>
            <span className="text-sm text-muted-foreground">/ {product.unit}</span>
          </div>

          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
