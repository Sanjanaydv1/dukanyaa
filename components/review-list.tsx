import { Star, ThumbsUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface Review {
  id: number
  userName: string
  userAvatar: string
  rating: number
  date: string
  comment: string
  helpfulCount: number
}

const mockReviews: Review[] = [
  {
    id: 1,
    userName: "Ramesh Shrestha",
    userAvatar: "/man-avatar.png",
    rating: 5,
    date: "2 days ago",
    comment: "Excellent quality rice! Very aromatic and cooks perfectly. Will definitely buy again.",
    helpfulCount: 12,
  },
  {
    id: 2,
    userName: "Sita Karki",
    userAvatar: "/diverse-woman-avatar.png",
    rating: 4,
    date: "1 week ago",
    comment: "Good quality but slightly expensive. Overall satisfied with the purchase.",
    helpfulCount: 8,
  },
  {
    id: 3,
    userName: "Bikash Tamang",
    userAvatar: "/man-avatar-2.png",
    rating: 5,
    date: "2 weeks ago",
    comment: "Best basmati rice in this area. The store owner is also very helpful and friendly.",
    helpfulCount: 15,
  },
  {
    id: 4,
    userName: "Anjali Thapa",
    userAvatar: "/woman-avatar-2.png",
    rating: 4,
    date: "3 weeks ago",
    comment: "Great for making biryani. Grains are long and don't stick together.",
    helpfulCount: 6,
  },
]

export function ReviewList({ productId }: { productId: string }) {
  return (
    <div className="space-y-6">
      {mockReviews.map((review) => (
        <div key={review.id} className="rounded-lg border p-4">
          <div className="mb-3 flex items-start gap-3">
            <Avatar>
              <AvatarImage src={review.userAvatar || "/placeholder.svg"} alt={review.userName} />
              <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="mb-1 flex items-center justify-between">
                <h4 className="font-semibold">{review.userName}</h4>
                <span className="text-sm text-muted-foreground">{review.date}</span>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="mb-3 text-muted-foreground">{review.comment}</p>
          <Button variant="ghost" size="sm" className="gap-2">
            <ThumbsUp className="h-4 w-4" />
            Helpful ({review.helpfulCount})
          </Button>
        </div>
      ))}
    </div>
  )
}
