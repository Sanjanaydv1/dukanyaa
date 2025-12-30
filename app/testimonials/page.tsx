"use client"

import { Star, Quote } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ReviewForm } from "@/components/review-form"

interface Testimonial {
  id: number
  userName: string
  userAvatar: string
  rating: number
  date: string
  comment: string
  location: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    userName: "Ramesh Shrestha",
    userAvatar: "/man-avatar.png",
    rating: 5,
    date: "2 weeks ago",
    location: "Thamel, Kathmandu",
    comment: "Amazing service! The store has everything I need for my daily groceries. The staff is always helpful and the prices are reasonable. I love how they deliver fresh vegetables every morning.",
  },
  {
    id: 2,
    userName: "Sita Karki",
    userAvatar: "/diverse-woman-avatar.png",
    rating: 5,
    date: "1 month ago",
    location: "Baneshwor, Kathmandu",
    comment: "Best kirana store in the area! They have authentic spices and the quality is unmatched. The owner personally checks each item before delivery. Highly recommended!",
  },
  {
    id: 3,
    userName: "Bikash Tamang",
    userAvatar: "/man-avatar-2.png",
    rating: 4,
    date: "3 weeks ago",
    location: "Koteshwor, Kathmandu",
    comment: "Great variety of products and excellent customer service. The app makes ordering so convenient. Sometimes delivery takes a bit longer during peak hours, but that's understandable.",
  },
  {
    id: 4,
    userName: "Anjali Thapa",
    userAvatar: "/woman-avatar-2.png",
    rating: 5,
    date: "1 week ago",
    location: "Chabahil, Kathmandu",
    comment: "I switched to this store 6 months ago and never looked back. Fresh produce, genuine products, and the best part is they remember my regular orders. The loyalty program is fantastic!",
  },
  {
    id: 5,
    userName: "Prakash Gurung",
    userAvatar: "/man-avatar-3.png",
    rating: 5,
    date: "2 days ago",
    location: "Jorpati, Kathmandu",
    comment: "The store's commitment to quality is evident in every product. From premium basmati rice to organic vegetables, everything is top-notch. The packaging is excellent too!",
  },
  {
    id: 6,
    userName: "Maya Sharma",
    userAvatar: "/woman-avatar.png",
    rating: 4,
    date: "4 weeks ago",
    location: "Bouddha, Kathmandu",
    comment: "Very reliable service. I can always count on them for my monthly grocery needs. The staff goes out of their way to help, especially with special dietary requirements.",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
          }`}
        />
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Quote className="h-8 w-8 text-muted-foreground flex-shrink-0 mt-1" />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={testimonial.userAvatar} alt={testimonial.userName} />
                <AvatarFallback>{testimonial.userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">{testimonial.userName}</h4>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
              </div>
            </div>
            <StarRating rating={testimonial.rating} />
            <p className="mt-3 text-muted-foreground leading-relaxed">
              "{testimonial.comment}"
            </p>
            <p className="mt-3 text-xs text-muted-foreground">{testimonial.date}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">What Our Customers Say</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our valued customers have to say about their experience with Kirana Store.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-muted/50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Share Your Experience</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Have you shopped with us? We'd love to hear your feedback and share your story with other customers.
          </p>
          <Button size="lg" className="mb-4">
            Write a Testimonial
          </Button>
          <p className="text-sm text-muted-foreground">
            Your testimonial will be reviewed before being published.
          </p>
        </div>
      </div>
    </div>
  )
}
