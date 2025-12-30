"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, Clock, CheckCircle, XCircle } from "lucide-react"

interface Order {
  id: number
  customer: string
  phone: string
  address: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  total: number
  status: "pending" | "confirmed" | "delivered" | "cancelled"
  createdAt: string
  paymentMethod: string
}

export default function ShopkeeperOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1001,
      customer: "Ram Sharma",
      phone: "9841234567",
      address: "Thamel, Kathmandu",
      items: [
        { name: "Basmati Rice", quantity: 2, price: 150 },
        { name: "Red Lentils", quantity: 1, price: 180 },
      ],
      total: 530,
      status: "pending",
      createdAt: "2024-01-15T10:30:00",
      paymentMethod: "cod",
    },
    {
      id: 1002,
      customer: "Sita Poudel",
      phone: "9843456789",
      address: "Baneshwor, Kathmandu",
      items: [
        { name: "Mustard Oil", quantity: 1, price: 250 },
        { name: "Sugar", quantity: 2, price: 80 },
      ],
      total: 460,
      status: "confirmed",
      createdAt: "2024-01-15T09:15:00",
      paymentMethod: "cod",
    },
    {
      id: 1003,
      customer: "Hari Thapa",
      phone: "9845678901",
      address: "Koteshwor, Kathmandu",
      items: [{ name: "Tea Powder", quantity: 3, price: 120 }],
      total: 410,
      status: "delivered",
      createdAt: "2024-01-14T16:45:00",
      paymentMethod: "cod",
    },
  ])

  const handleStatusChange = (orderId: number, newStatus: Order["status"]) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
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

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-muted-foreground">Manage customer orders and fulfillment</p>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
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
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold mb-2">Customer Details</h4>
                    <div className="text-sm space-y-1">
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-muted-foreground">{order.phone}</p>
                      <p className="text-muted-foreground">{order.address}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Order Items</h4>
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {item.name} x{item.quantity}
                          </span>
                          <span className="font-medium">Rs. {item.price * item.quantity}</span>
                        </div>
                      ))}
                      <div className="flex justify-between text-sm pt-2 border-t font-bold">
                        <span>Total</span>
                        <span className="text-primary">Rs. {order.total}</span>
                      </div>
                      <p className="text-xs text-muted-foreground capitalize">Payment: {order.paymentMethod}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t">
                  <Label className="text-sm font-medium">Update Status:</Label>
                  <Select
                    value={order.status}
                    onValueChange={(value: Order["status"]) => handleStatusChange(order.id, value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
