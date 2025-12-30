"use client"
import { useState, useEffect } from "react"
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
    image: "",
  })

  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    unit: "",
    stock: "",
    category: "",
    image: "",
  })

  useEffect(() => {
    if (editingProduct) {
      setEditForm({
        name: editingProduct.name,
        price: editingProduct.price.toString(),
        unit: editingProduct.unit,
        stock: editingProduct.stock.toString(),
        category: editingProduct.category,
        image: editingProduct.image,
      })
    }
  }, [editingProduct])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, isEdit: boolean = false) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string
        if (isEdit) {
          setEditForm({ ...editForm, image: dataUrl })
        } else {
          setNewProduct({ ...newProduct, image: dataUrl })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddProduct = () => {
    const product: Product = {
      id: Date.now(),
      name: newProduct.name,
      price: Number.parseFloat(newProduct.price),
      unit: newProduct.unit,
      stock: Number.parseInt(newProduct.stock),
      category: newProduct.category,
      image: newProduct.image || "/placeholder.svg",
      inStock: Number.parseInt(newProduct.stock) > 0,
    }

    setProducts([...products, product])
    setIsAddDialogOpen(false)
    setNewProduct({ name: "", price: "", unit: "kg", stock: "", category: "", image: "" })
  }

  const handleEditProduct = () => {
    if (!editingProduct) return

    const updatedProduct: Product = {
      ...editingProduct,
      name: editForm.name,
      price: Number.parseFloat(editForm.price),
      unit: editForm.unit,
      stock: Number.parseInt(editForm.stock),
      category: editForm.category,
      image: editForm.image || "/placeholder.svg",
      inStock: Number.parseInt(editForm.stock) > 0,
    }

    setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p))
    setIsEditDialogOpen(false)
    setEditingProduct(null)
    setEditForm({ name: "", price: "", unit: "", stock: "", category: "", image: "" })
  }

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  return (
    <main className="min-h-screen bg-background px-8 py-6">
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
                <div>
                  <Label htmlFor="product-image">Product Image</Label>
                  <Input
                    id="product-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, false)}
                    className="mt-2"
                  />
                  {newProduct.image && (
                    <div className="mt-2">
                      <Image
                        src={newProduct.image}
                        alt="Preview"
                        width={100}
                        height={100}
                        className="object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
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

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogDescription>Update the details of your product.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-product-image">Product Image</Label>
                <Input
                  id="edit-product-image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, true)}
                  className="mt-2"
                />
                {editForm.image && editForm.image !== "/placeholder.svg" && (
                  <div className="mt-2">
                    <Image
                      src={editForm.image}
                      alt="Preview"
                      width={100}
                      height={100}
                      className="object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-product-name">Product Name</Label>
                <Input
                  id="edit-product-name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-product-price">Price (Rs.)</Label>
                  <Input
                    id="edit-product-price"
                    type="number"
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-product-unit">Unit</Label>
                  <Input
                    id="edit-product-unit"
                    value={editForm.unit}
                    onChange={(e) => setEditForm({ ...editForm, unit: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-product-category">Category</Label>
                <Input
                  id="edit-product-category"
                  value={editForm.category}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-product-stock">Stock Quantity</Label>
                <Input
                  id="edit-product-stock"
                  type="number"
                  value={editForm.stock}
                  onChange={(e) => setEditForm({ ...editForm, stock: e.target.value })}
                />
              </div>

              <Button
                className="w-full"
                onClick={handleEditProduct}
                disabled={!editForm.name || !editForm.price || !editForm.stock || !editForm.category}
              >
                Update Product
              </Button>
            </div>
          </DialogContent>
        </Dialog>

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
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent cursor-pointer" onClick={() => { setEditingProduct(product); setIsEditDialogOpen(true); }}>
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:text-destructive bg-transparent cursor-pointer"
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
