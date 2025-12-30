"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/contexts/cart-context"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCart()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "Kathmandu",
    notes: "",
    paymentMethod: "cod",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Mock order submission
    setTimeout(() => {
      // Create order in localStorage for demo
      const order = {
        id: Date.now(),
        items,
        total: getTotalPrice() + 50,
        status: "pending",
        createdAt: new Date().toISOString(),
        ...formData,
      }

      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]")
      localStorage.setItem("orders", JSON.stringify([order, ...existingOrders]))

      clearCart()
      router.push("/orders")
    }, 2000)
  }

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container px-4 py-6">
        <h1 className="mb-6 text-3xl font-bold">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      placeholder="98XXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Delivery Address</Label>
                    <Textarea
                      id="address"
                      required
                      placeholder="House no, Street, Area"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Delivery Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any special instructions"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                  >
                    <div className="flex items-center space-x-2 rounded-lg border p-4">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex-1 cursor-pointer">
                        <div className="font-medium">Cash on Delivery</div>
                        <div className="text-sm text-muted-foreground">Pay when you receive</div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 rounded-lg border p-4 opacity-50">
                      <RadioGroupItem value="esewa" id="esewa" disabled />
                      <Label htmlFor="esewa" className="flex-1">
                        <div className="font-medium">eSewa (Coming Soon)</div>
                        <div className="text-sm text-muted-foreground">Digital wallet payment</div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 rounded-lg border p-4 opacity-50">
                      <RadioGroupItem value="khalti" id="khalti" disabled />
                      <Label htmlFor="khalti" className="flex-1">
                        <div className="font-medium">Khalti (Coming Soon)</div>
                        <div className="text-sm text-muted-foreground">Digital wallet payment</div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 border-b pb-4">
                    {items.map((item) => (
                      <div key={item.productId} className="flex gap-3">
                        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.quantity} x Rs. {item.price}
                          </p>
                        </div>
                        <p className="text-sm font-medium">Rs. {(item.quantity * item.price).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 border-b pb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>Rs. {getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span>Rs. 50.00</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">Rs. {(getTotalPrice() + 50).toFixed(2)}</span>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? "Placing Order..." : "Place Order"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}
