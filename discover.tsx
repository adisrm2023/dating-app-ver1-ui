"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Filter, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const profiles = [
  {
    id: 1,
    name: "Emma",
    age: 28,
    location: "New York, NY",
    distance: "5 miles away",
    bio: "Coffee enthusiast, dog lover, and avid hiker.",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 2,
    name: "Michael",
    age: 30,
    location: "Brooklyn, NY",
    distance: "8 miles away",
    bio: "Photographer and foodie. I can show you the best hidden restaurants.",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 3,
    name: "Sophia",
    age: 26,
    location: "Manhattan, NY",
    distance: "3 miles away",
    bio: "Art gallery curator with a passion for travel.",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 4,
    name: "James",
    age: 32,
    location: "Queens, NY",
    distance: "10 miles away",
    bio: "Software engineer by day, musician by night.",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 5,
    name: "Olivia",
    age: 27,
    location: "Jersey City, NJ",
    distance: "12 miles away",
    bio: "Yoga instructor and plant mom. Looking for someone to explore with.",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 6,
    name: "Daniel",
    age: 29,
    location: "Hoboken, NJ",
    distance: "15 miles away",
    bio: "Chef who loves outdoor adventures and trying new cuisines.",
    image: "/placeholder.svg?height=400&width=300",
  },
]

export default function DiscoverPage() {
  const [showFilters, setShowFilters] = useState(false)
  const [ageRange, setAgeRange] = useState([18, 40])
  const [distance, setDistance] = useState([25])
  const [lookingFor, setLookingFor] = useState("everyone")

  return (
    <div className="container max-w-md mx-auto px-4 py-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Discover</h1>
        <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="h-5 w-5" />
        </Button>
      </header>

      {showFilters && (
        <Card className="mb-6 p-4">
          <h2 className="font-medium mb-4">Filters</h2>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium">I am interested in</label>
              <Tabs defaultValue="everyone" value={lookingFor} onValueChange={setLookingFor} className="w-full mt-2">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="men">Men</TabsTrigger>
                  <TabsTrigger value="women">Women</TabsTrigger>
                  <TabsTrigger value="everyone">Everyone</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Age Range</label>
                <span className="text-sm text-muted-foreground">
                  {ageRange[0]} - {ageRange[1]}
                </span>
              </div>
              <Slider
                defaultValue={[18, 40]}
                min={18}
                max={80}
                step={1}
                value={ageRange}
                onValueChange={setAgeRange}
                className="my-4"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Maximum Distance</label>
                <span className="text-sm text-muted-foreground">{distance[0]} miles</span>
              </div>
              <Slider
                defaultValue={[25]}
                min={1}
                max={100}
                step={1}
                value={distance}
                onValueChange={setDistance}
                className="my-4"
              />
            </div>

            <Button className="w-full">Apply Filters</Button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-2 gap-4">
        {profiles.map((profile) => (
          <Link key={profile.id} href={`/home?profile=${profile.id}`}>
            <Card className="overflow-hidden h-full flex flex-col">
              <div className="relative aspect-[3/4]">
                <Image src={profile.image || "/placeholder.svg"} alt={profile.name} fill className="object-cover" />
              </div>
              <div className="p-3 flex-1 flex flex-col">
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-medium truncate">
                    {profile.name}, {profile.age}
                  </h3>
                </div>
                <div className="flex items-center text-xs text-muted-foreground mb-2">
                  <MapPin className="mr-1 h-3 w-3" />
                  <span className="truncate">{profile.distance}</span>
                </div>
                <p className="text-xs line-clamp-2 text-muted-foreground">{profile.bio}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

