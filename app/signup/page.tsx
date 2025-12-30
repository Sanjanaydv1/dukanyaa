"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Store, ShoppingBag } from "lucide-react"

export default function SignupPage() {
  const [customerName, setCustomerName] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [customerPassword, setCustomerPassword] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")

  const [shopkeeperName, setShopkeeperName] = useState("")
  const [shopkeeperEmail, setShopkeeperEmail] = useState("")
  const [shopkeeperPassword, setShopkeeperPassword] = useState("")
  const [shopkeeperPhone, setShopkeeperPhone] = useState("")
  const [shopName, setShopName] = useState("")
  const [shopAddress, setShopAddress] = useState("")

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleCustomerSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Mock signup - replace with actual authentication
    setTimeout(() => {
      if (customerName && customerEmail && customerPassword && customerPhone) {
        // Simulate successful signup
        localStorage.setItem("userType", "customer")
        localStorage.setItem("userEmail", customerEmail)
        window.location.href = "/"
      } else {
        setError("Please fill in all fields")
        setLoading(false)
      }
    }, 1000)
  }

  const handleShopkeeperSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Mock signup - replace with actual authentication
    setTimeout(() => {
      if (shopkeeperName && shopkeeperEmail && shopkeeperPassword && shopkeeperPhone && shopName && shopAddress) {
        // Simulate successful signup
        localStorage.setItem("userType", "shopkeeper")
        localStorage.setItem("userEmail", shopkeeperEmail)
        window.location.href = "/dashboard"
      } else {
        setError("Please fill in all fields")
        setLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
          <CardDescription className="text-center">Sign up to get started with Kirana Store</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="customer" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="customer" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                Customer
              </TabsTrigger>
              <TabsTrigger value="shopkeeper" className="flex items-center gap-2">
                <Store className="h-4 w-4" />
                Shopkeeper
              </TabsTrigger>
            </TabsList>

            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <TabsContent value="customer">
              <form onSubmit={handleCustomerSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customer-name">Full Name</Label>
                  <Input
                    id="customer-name"
                    type="text"
                    placeholder="John Doe"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customer-email">Email</Label>
                  <Input
                    id="customer-email"
                    type="email"
                    placeholder="customer@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customer-phone">Phone Number</Label>
                  <Input
                    id="customer-phone"
                    type="tel"
                    placeholder="98XXXXXXXX"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customer-password">Password</Label>
                  <Input
                    id="customer-password"
                    type="password"
                    placeholder="••••••••"
                    value={customerPassword}
                    onChange={(e) => setCustomerPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating account..." : "Sign Up as Customer"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="shopkeeper">
              <form onSubmit={handleShopkeeperSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="shopkeeper-name">Full Name</Label>
                  <Input
                    id="shopkeeper-name"
                    type="text"
                    placeholder="Ram Sharma"
                    value={shopkeeperName}
                    onChange={(e) => setShopkeeperName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shop-name">Shop Name</Label>
                  <Input
                    id="shop-name"
                    type="text"
                    placeholder="Sharma Kirana Store"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shop-address">Shop Address</Label>
                  <Input
                    id="shop-address"
                    type="text"
                    placeholder="Thamel, Kathmandu"
                    value={shopAddress}
                    onChange={(e) => setShopAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shopkeeper-email">Email</Label>
                  <Input
                    id="shopkeeper-email"
                    type="email"
                    placeholder="shopkeeper@example.com"
                    value={shopkeeperEmail}
                    onChange={(e) => setShopkeeperEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shopkeeper-phone">Phone Number</Label>
                  <Input
                    id="shopkeeper-phone"
                    type="tel"
                    placeholder="98XXXXXXXX"
                    value={shopkeeperPhone}
                    onChange={(e) => setShopkeeperPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shopkeeper-password">Password</Label>
                  <Input
                    id="shopkeeper-password"
                    type="password"
                    placeholder="••••••••"
                    value={shopkeeperPassword}
                    onChange={(e) => setShopkeeperPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating account..." : "Sign Up as Shopkeeper"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
