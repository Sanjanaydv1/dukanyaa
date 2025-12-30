import Link from "next/link"
import Image from "next/image"
import { MapPin, Star, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Store {
  id: number
  name: string
  address: string
  distance: number
  rating: number
  reviewCount: number
  image: string
  isOpen: boolean
  openTime: string
}

export function StoreCard({ store }: { store: Store }) {
  return (
    <Link href={`/store/${store.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <div className="relative h-40">
          <Image src={store.image || "/placeholder.svg"} alt={store.name} fill className="object-cover" />
          {store.isOpen ? (
            <Badge className="absolute right-2 top-2 bg-green-600">Open</Badge>
          ) : (
            <Badge className="absolute right-2 top-2 bg-destructive">Closed</Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="mb-2 font-semibold text-balance">{store.name}</h3>

          <div className="mb-2 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{store.address}</span>
            <span className="ml-auto font-medium text-foreground">{store.distance} km</span>
          </div>

          <div className="mb-2 flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{store.openTime}</span>
          </div>

          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{store.rating}</span>
            <span className="text-sm text-muted-foreground">({store.reviewCount} reviews)</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
