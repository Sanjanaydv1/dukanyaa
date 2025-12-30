"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, MapPin, Star, Clock, ShoppingBag, Truck, Shield, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StoreCard } from "@/components/store-card"
import { ProductCard } from "@/components/product-card"
import TestimonialsPage from "./testimonials/page"

// Mock data - replace with actual API calls
const categories = [
  { id: 1, name: "Groceries", icon: "🛒", image: "/wheat-flour-package.png" },
  { id: 2, name: "Vegetables", icon: "🥕", image: "/placeholder.svg" },
  { id: 3, name: "Fruits", icon: "🍎", image: "/placeholder.svg" },
  { id: 4, name: "Dairy", icon: "🥛", image: "/vintage-milk-bottle.png" },
  { id: 5, name: "Snacks", icon: "🍿", image: "/instant-noodles-packet.jpg" },
  { id: 6, name: "Beverages", icon: "🥤", image: "/cooking-oil-bottle.png" },
]

const featuredStores = [
  {
    id: 1,
    name: "Ram's Kirana Store",
    address: "MG Road, Bangalore",
    distance: 1.2,
    rating: 4.5,
    reviewCount: 128,
    image: "/modern-kirana-store-front.jpg",
    isOpen: true,
    openTime: "6:00 AM - 10:00 PM"
  },
  {
    id: 2,
    name: "Sharma General Store",
    address: "Brigade Road, Bangalore",
    distance: 2.1,
    rating: 4.3,
    reviewCount: 95,
    image: "/small-convenience-store.jpg",
    isOpen: true,
    openTime: "7:00 AM - 9:00 PM"
  },
  {
    id: 3,
    name: "Patel's Grocery",
    address: "Commercial Street, Bangalore",
    distance: 3.5,
    rating: 4.7,
    reviewCount: 203,
    image: "/neighborhood-store-interior.jpg",
    isOpen: false,
    openTime: "8:00 AM - 8:00 PM"
  }
]

const featuredProducts = [
  {
    id: 1,
    name: "Premium Basmati Rice",
    price: 450,
    unit: "5kg",
    image: "/basmati-rice-package.png",
    rating: 4.8,
    reviewCount: 45,
    inStock: true
  },
  {
    id: 2,
    name: "Pure Cooking Oil",
    price: 180,
    unit: "1L",
    image: "/cooking-oil-bottle.png",
    rating: 4.6,
    reviewCount: 32,
    inStock: true
  },
  {
    id: 3,
    name: "White Sugar",
    price: 95,
    unit: "2kg",
    image: "/white-sugar-bag.jpg",
    rating: 4.4,
    reviewCount: 28,
    inStock: true
  },
  {
    id: 4,
    name: "Wheat Flour",
    price: 120,
    unit: "5kg",
    image: "/wheat-flour-package.png",
    rating: 4.7,
    reviewCount: 67,
    inStock: false
  }
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("Bangalore")

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/local-grocery-shop-nepal.jpg"
            alt="Kirana Store"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 flex h-full items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl text-white">
              <h1 className="mb-4 text-4xl font-bold leading-tight md:text-6xl">
                Fresh Groceries
                <span className="block text-primary">Delivered Fast</span>
              </h1>
              <p className="mb-8 text-lg md:text-xl text-gray-200">
                Order from your favorite local Kirana stores and get fresh groceries delivered to your doorstep.
              </p>

              {/* Search Bar */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search for products, stores..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 text-black"
                  />
                </div>
                <Button size="lg" className="h-12 px-8">
                  Search
                </Button>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>Delivering to {location}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 rounded-full bg-primary/10 p-3">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">Get your orders delivered within 30 minutes</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 rounded-full bg-primary/10 p-3">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Quality Assured</h3>
              <p className="text-sm text-muted-foreground">Fresh products from trusted local stores</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 rounded-full bg-primary/10 p-3">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Local Support</h3>
              <p className="text-sm text-muted-foreground">Supporting neighborhood Kirana stores</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 rounded-full bg-primary/10 p-3">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Wide Variety</h3>
              <p className="text-sm text-muted-foreground">Everything you need in one place</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-3xl font-bold">Shop by Category</h2>
            <p className="text-muted-foreground">Find everything you need from our curated categories</p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/category/${category.id}`}>
                <Card className="overflow-hidden transition-all hover:shadow-lg hover:scale-105">
                  <div className="relative h-24">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl">{category.icon}</span>
                    </div>
                  </div>
                  <CardContent className="p-3 text-center">
                    <h3 className="font-semibold text-sm">{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stores Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold">Nearby Stores</h2>
              <p className="text-muted-foreground">Discover trusted Kirana stores in your area</p>
            </div>
            <Link href="/stores">
              <Button variant="outline">View All Stores</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredStores.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold">Featured Products</h2>
              <p className="text-muted-foreground">Popular items from our partner stores</p>
            </div>
            <Link href="/products">
              <Button variant="outline">View All Products</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} storeId="1" />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Shop?</h2>
          <p className="mb-6 text-lg text-muted-foreground">
            Explore thousands of products from your favorite local Kirana stores.
          </p>
          <Link href="/stores">
            <Button size="lg">Start Shopping</Button>
          </Link>
        </div>
      </section>

      {/*Testimonials Section */}
      <TestimonialsPage />
    </div>
  )
}
