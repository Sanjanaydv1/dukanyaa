"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, Clock, CheckCircle, XCircle, ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Order {
  id: number
  items: Array<{
    productId: number
    name: string
    price: number
    quantity: number
    image: string
    storeName: string
  }>
  total: number
  status: "pending" | "confirmed" | "delivered" | "cancelled"
  createdAt: string
  fullName: string
  phone: string
  address: string
  city: string
  paymentMethod: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [expandedOrders, setExpandedOrders] = useState<Set<number>>(new Set())

  useEffect(() => {
    const savedOrders = localStorage.getItem("orders")
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
  }, [])

  const toggleOrderExpansion = (orderId: number) => {
    setExpandedOrders((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(orderId)) {
        newSet.delete(orderId)
      } else {
        newSet.add(orderId)
      }
      return newSet
    })
  }

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="gap-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        )
      case "confirmed":
        return (
          <Badge className="gap-1 bg-blue-500">
            <Package className="h-3 w-3" />
            Confirmed
          </Badge>
        )
      case "delivered":
        return (
          <Badge className="gap-1 bg-green-500">
            <CheckCircle className="h-3 w-3" />
            Delivered
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="destructive" className="gap-1">
            <XCircle className="h-3 w-3" />
            Cancelled
          </Badge>
        )
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (orders.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="container px-4 py-12">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <Package className="h-16 w-16 text-muted-foreground" />
            <h1 className="text-2xl font-bold">No orders yet</h1>
            <p className="text-muted-foreground">Start shopping to see your orders here</p>
            <Link href="/">
              <Button>Browse Stores</Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container px-4 py-6">
        <h1 className="mb-6 text-3xl font-bold">My Orders</h1>

        <div className="space-y-4">
          {orders.map((order) => {
            const isExpanded = expandedOrders.has(order.id)

            return (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{formatDate(order.createdAt)}</p>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded">
                        <Image
                          src={order.items[0]?.image || "/placeholder.svg"}
                          alt="Order"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">
                          {order.items.length} {order.items.length === 1 ? "item" : "items"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {order.items[0]?.name}
                          {order.items.length > 1 && ` and ${order.items.length - 1} more`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">Rs. {order.total.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {order.paymentMethod.replace("_", " ")}
                      </p>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="space-y-4 pt-2">
                      <div>
                        <h4 className="font-semibold mb-2">Order Items</h4>
                        <div className="space-y-2">
                          {order.items.map((item) => (
                            <div key={item.productId} className="flex gap-3 p-2 rounded-lg bg-muted/50">
                              <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium">{item.name}</p>
                                <p className="text-xs text-muted-foreground">{item.storeName}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium">x{item.quantity}</p>
                                <p className="text-xs text-muted-foreground">Rs. {item.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Delivery Address</h4>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p className="font-medium text-foreground">{order.fullName}</p>
                          <p>{order.phone}</p>
                          <p>{order.address}</p>
                          <p>{order.city}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <Button variant="ghost" className="w-full" onClick={() => toggleOrderExpansion(order.id)}>
                    {isExpanded ? (
                      <>
                        Show Less <ChevronUp className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Show More <ChevronDown className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </main>
  )
}
