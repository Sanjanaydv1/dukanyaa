"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Package } from "lucide-react"
import Image from "next/image"

interface Product {
  id: number
  name: string
  price: number
  unit: string
  stock: number
  category: string
  image: string
  inStock: boolean
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Basmati Rice",
      price: 150,
      unit: "kg",
      stock: 50,
      category: "Grains",
      image: "/placeholder.svg",
      inStock: true,
    },
    {
      id: 2,
      name: "Red Lentils (Masoor Dal)",
      price: 180,
      unit: "kg",
      stock: 30,
      category: "Pulses",
      image: "/placeholder.svg",
      inStock: true,
    },
    {
      id: 3,
      name: "Mustard Oil",
      price: 250,
      unit: "liter",
      stock: 0,
      category: "Cooking Oil",
      image: "/placeholder.svg",
      inStock: false,
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    unit: "kg",
    stock: "",
    category: "",
  })

  const handleAddProduct = () => {
    const product: Product = {
      id: Date.now(),
      name: newProduct.name,
      price: Number.parseFloat(newProduct.price),
      unit: newProduct.unit,
      stock: Number.parseInt(newProduct.stock),
      category: newProduct.category,
      image: "/placeholder.svg",
      inStock: Number.parseInt(newProduct.stock) > 0,
    }

    setProducts([...products, product])
    setIsAddDialogOpen(false)
    setNewProduct({ name: "", price: "", unit: "kg", stock: "", category: "" })
  }

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="text-muted-foreground">Manage your store inventory</p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>Add a new product to your store inventory.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="product-name">Product Name</Label>
                  <Input
                    id="product-name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-price">Price (Rs.)</Label>
                    <Input
                      id="product-price"
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="product-unit">Unit</Label>
                    <Input
                      id="product-unit"
                      value={newProduct.unit}
                      onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product-category">Category</Label>
                  <Input
                    id="product-category"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product-stock">Stock Quantity</Label>
                  <Input
                    id="product-stock"
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  />
                </div>

                <Button
                  className="w-full"
                  onClick={handleAddProduct}
                  disabled={!newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.category}
                >
                  Add Product
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Package className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-bold mb-2">No products yet</h2>
            <p className="text-muted-foreground mb-4">Add your first product to get started</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-balance">{product.name}</h3>
                          {!product.inStock && <Badge variant="destructive">Out of Stock</Badge>}
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                        <p className="text-sm font-bold text-primary">
                          Rs. {product.price} / {product.unit}
                        </p>
                        <p className="text-xs text-muted-foreground">Stock: {product.stock}</p>
                      </div>

                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:text-destructive bg-transparent"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
