"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, User, Store, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"

export function Navbar() {
  const [userType, setUserType] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const { getItemCount } = useCart()
  const itemCount = getItemCount()

  useEffect(() => {
    setUserType(localStorage.getItem("userType"))
    setUserEmail(localStorage.getItem("userEmail"))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("userType")
    localStorage.removeItem("userEmail")
    window.location.href = "/"
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Store className="h-6 w-6 text-primary" />
            <span className="hidden sm:inline">Kirana Store</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {userType === "customer" && (
              <>
                <Link href="/store">
                  <Button variant="ghost">Stores</Button>
                </Link>
                <Link href="/orders">
                  <Button variant="ghost">My Orders</Button>
                </Link>
                <Link href="/cart">
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {itemCount > 0 && (
                      <Badge className="absolute -right-1 -top-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                        {itemCount}
                      </Badge>
                    )}
                  </Button>
                </Link>
              </>
            )}

            {userType === "shopkeeper" && (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <Link href="/dashboard/products">
                  <Button variant="ghost">Products</Button>
                </Link>
                <Link href="/dashboard/orders">
                  <Button variant="ghost">Orders</Button>
                </Link>
              </>
            )}

            {userEmail ? (
              <div className="flex items-center gap-2">
                <Link
                className="block rounded-full text-sm font-medium text-white bg-primary px-3 py-2"
                href="/profile"
              >
                {userEmail[0].toUpperCase()}
              </Link>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link href="/buy">
                  <Button variant="ghost">Make an Order</Button>
                </Link>
                <Link href="/login">
                  <Button>Login</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col gap-4 mt-6">
                {userType === "customer" && (
                  <>
                    <Link href="/store">
                      <Button variant="ghost" className="w-full justify-start">
                        Stores
                      </Button>
                    </Link>
                    <Link href="/orders">
                      <Button variant="ghost" className="w-full justify-start">
                        My Orders
                      </Button>
                    </Link>
                    <Link href="/cart">
                      <Button variant="ghost" className="w-full justify-start">
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Cart
                        {itemCount > 0 && <Badge className="ml-auto">{itemCount}</Badge>}
                      </Button>
                    </Link>
                  </>
                )}

                {userType === "shopkeeper" && (
                  <>
                    <Link href="/dashboard">
                      <Button variant="ghost" className="w-full justify-start">
                        Dashboard
                      </Button>
                    </Link>
                    <Link href="/dashboard/products">
                      <Button variant="ghost" className="w-full justify-start">
                        Products
                      </Button>
                    </Link>
                    <Link href="/dashboard/orders">
                      <Button variant="ghost" className="w-full justify-start">
                        Orders
                      </Button>
                    </Link>
                  </>
                )}

                {userEmail ? (
                  <div className="flex flex-col gap-2 pt-4 border-t">
                    <Link
                className="block rounded-full text-sm font-medium text-white bg-primary px-3 py-2"
                href="/profile"
              >
                {userEmail[0].toUpperCase()}
              </Link>
                    <Button variant="outline" onClick={handleLogout}>
                      Logout
                    </Button>
                  </div>
                ) : (
                  <>
                    <Link href="/buy">
                      <Button variant="ghost" className="w-full">
                        Make an Order
                      </Button>
                    </Link>
                    <Link href="/login">
                      <Button className="w-full">Login</Button>
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
