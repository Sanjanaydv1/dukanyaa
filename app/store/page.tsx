import { StoreCard } from "@/components/store-card"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

// Mock data for stores
const stores = [
  {
    id: 1,
    name: "Sharma Kirana Store",
    address: "Thamel, Kathmandu",
    distance: 0.5,
    rating: 4.5,
    reviewCount: 128,
    image: "/modern-kirana-store-front.jpg",
    isOpen: true,
    openTime: "6:00 AM - 10:00 PM",
  },
  {
    id: 2,
    name: "Poudel General Store",
    address: "Baneshwor, Kathmandu",
    distance: 1.2,
    rating: 4.2,
    reviewCount: 89,
    image: "/local-grocery-shop-nepal.jpg",
    isOpen: true,
    openTime: "7:00 AM - 9:00 PM",
  },
  {
    id: 3,
    name: "Thapa Departmental Store",
    address: "Koteshwor, Kathmandu",
    distance: 2.1,
    rating: 4.8,
    reviewCount: 256,
    image: "/neighborhood-store-interior.jpg",
    isOpen: false,
    openTime: "6:30 AM - 9:30 PM",
  },
  {
    id: 4,
    name: "Gurung Mart",
    address: "Chabahil, Kathmandu",
    distance: 1.8,
    rating: 4.6,
    reviewCount: 167,
    image: "/small-convenience-store.jpg",
    isOpen: true,
    openTime: "6:00 AM - 10:30 PM",
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container px-4 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search for stores or products..." className="pl-10" />
          </div>
        </div>

        {/* Stores Section */}
        <div className="mb-6">
          <h2 className="mb-4 text-2xl font-bold text-balance">Nearby Stores</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stores.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
