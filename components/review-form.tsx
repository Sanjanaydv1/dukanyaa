"use client"

import type React from "react"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function ReviewForm({ productId }: { productId: string }) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Review submitted:", { productId, rating, comment })
    // Here you would typically send the review to your backend
    alert("Thank you for your review!")
    setRating(0)
    setComment("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-lg border p-6">
        <div className="mb-6">
          <Label className="mb-2 block text-lg font-semibold">Your Rating</Label>
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setRating(i + 1)}
                onMouseEnter={() => setHoveredRating(i + 1)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`h-8 w-8 ${
                    i < (hoveredRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                  }`}
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="mt-2 text-sm text-muted-foreground">You rated this product {rating} out of 5 stars</p>
          )}
        </div>

        <div className="mb-6">
          <Label htmlFor="comment" className="mb-2 block text-lg font-semibold">
            Your Review
          </Label>
          <Textarea
            id="comment"
            placeholder="Share your experience with this product..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={5}
            required
          />
        </div>

        <Button type="submit" size="lg" disabled={rating === 0 || comment.trim() === ""}>
          Submit Review
        </Button>
      </div>
    </form>
  )
}
