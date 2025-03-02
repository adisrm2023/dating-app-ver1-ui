"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Heart, X, Star, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ModeToggle } from "@/components/mode-toggle"

const profiles = [
  {
    id: 1,
    name: "Emma",
    age: 28,
    location: "New York, NY",
    distance: "5 miles away",
    bio: "Coffee enthusiast, dog lover, and avid hiker. Looking for someone to share adventures with!",
    images: ["/placeholder.svg?height=800&width=600", "/placeholder.svg?height=800&width=600"],
  },
  {
    id: 2,
    name: "Michael",
    age: 30,
    location: "Brooklyn, NY",
    distance: "8 miles away",
    bio: "Photographer and foodie. I can show you the best hidden restaurants in the city.",
    images: ["/placeholder.svg?height=800&width=600", "/placeholder.svg?height=800&width=600"],
  },
  {
    id: 3,
    name: "Sophia",
    age: 26,
    location: "Manhattan, NY",
    distance: "3 miles away",
    bio: "Art gallery curator with a passion for travel. Let's explore new places together!",
    images: ["/placeholder.svg?height=800&width=600", "/placeholder.svg?height=800&width=600"],
  },
]

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const currentProfile = profiles[currentIndex]

  const handleSwipe = (direction: string) => {
    setSwipeDirection(direction)

    setTimeout(() => {
      if (currentIndex < profiles.length - 1) {
        setCurrentIndex(currentIndex + 1)
        setCurrentImageIndex(0)
      } else {
        // Reset to first profile when we've gone through all
        setCurrentIndex(0)
        setCurrentImageIndex(0)
      }
      setSwipeDirection(null)
    }, 300)
  }

  const nextImage = () => {
    if (currentImageIndex < currentProfile.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    }
  }

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
    }
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Discover</h1>
        <ModeToggle />
      </header>

      <div className="relative h-[70vh] w-full">
        {currentProfile && (
          <div ref={cardRef} className={`swipe-card ${swipeDirection ? `swiped-${swipeDirection}` : ""}`}>
            <Card className="h-full overflow-hidden">
              <div className="relative h-full w-full">
                {/* Profile images with pagination dots */}
                <div className="relative h-4/5 w-full">
                  <Image
                    src={currentProfile.images[currentImageIndex] || "/placeholder.svg"}
                    alt={currentProfile.name}
                    fill
                    className="object-cover"
                  />

                  {/* Image navigation overlay */}
                  <div className="absolute inset-0 flex" onClick={nextImage}>
                    <div
                      className="w-1/5"
                      onClick={(e) => {
                        e.stopPropagation()
                        prevImage()
                      }}
                    ></div>
                    <div className="w-3/5"></div>
                    <div className="w-1/5"></div>
                  </div>

                  {/* Image pagination dots */}
                  <div className="absolute top-2 left-0 right-0 flex justify-center gap-1">
                    {currentProfile.images.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 rounded-full ${
                          i === currentImageIndex ? "w-6 bg-primary" : "w-2 bg-background/70"
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Profile info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">
                        {currentProfile.name}, {currentProfile.age}
                      </h2>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-1 h-4 w-4" />
                        {currentProfile.distance}
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-sm">{currentProfile.bio}</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="h-14 w-14 rounded-full border-2 border-destructive"
          onClick={() => handleSwipe("left")}
        >
          <X className="h-8 w-8 text-destructive" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="h-14 w-14 rounded-full border-2 border-primary"
          onClick={() => handleSwipe("right")}
        >
          <Heart className="h-8 w-8 text-primary" />
        </Button>

        <Button variant="outline" size="icon" className="h-14 w-14 rounded-full border-2 border-blue-500">
          <Star className="h-8 w-8 text-blue-500" />
        </Button>
      </div>
    </div>
  )
}

