"use client"

import { useState } from "react"
import { ArrowLeft, Star, ShoppingCart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ReviewList } from "@/components/review-list"
import { ReviewForm } from "@/components/review-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductPage({
  params,
}: {
  params: { storeId: string; productId: string }
}) {
  const [quantity, setQuantity] = useState(1)

  const product = {
    id: 1,
    name: "Basmati Rice",
    price: 180,
    unit: "kg",
    image: "/basmati-rice-package.png",
    rating: 4.5,
    reviewCount: 45,
    inStock: true,
    description:
      "Premium quality Basmati rice with long grains and aromatic fragrance. Perfect for biryanis and daily meals.",
    brand: "India Gate",
  }

  const storeName = "Sharma Kirana Store"

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center gap-4 px-4">
          <Link href={`/store/${params.storeId}`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-bold">{product.name}</h1>
        </div>
      </header>

      <div className="container px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-4">
              <h2 className="mb-2 text-3xl font-bold text-balance">{product.name}</h2>
              <p className="text-sm text-muted-foreground">
                by {product.brand} • {storeName}
              </p>
            </div>

            <div className="mb-4 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-medium">{product.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
              {product.inStock ? (
                <Badge className="ml-auto bg-green-600">In Stock</Badge>
              ) : (
                <Badge className="ml-auto bg-destructive">Out of Stock</Badge>
              )}
            </div>

            <div className="mb-6">
              <div className="mb-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">Rs. {product.price}</span>
                <span className="text-muted-foreground">/ {product.unit}</span>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-4 flex items-center gap-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={!product.inStock}
                >
                  -
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={!product.inStock}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button className="w-full" size="lg" disabled={!product.inStock}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart - Rs. {product.price * quantity}
            </Button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-8">
          <Tabs defaultValue="reviews">
            <TabsList>
              <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
              <TabsTrigger value="write">Write a Review</TabsTrigger>
            </TabsList>
            <TabsContent value="reviews" className="mt-6">
              <ReviewList productId={params.productId} />
            </TabsContent>
            <TabsContent value="write" className="mt-6">
              <ReviewForm productId={params.productId} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
