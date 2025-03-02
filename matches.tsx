"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

const matches = [
  {
    id: 1,
    name: "Emma",
    age: 28,
    lastActive: "Just now",
    image: "/placeholder.svg?height=400&width=400",
    matched: "Today",
  },
  {
    id: 2,
    name: "Michael",
    age: 30,
    lastActive: "2 hours ago",
    image: "/placeholder.svg?height=400&width=400",
    matched: "Yesterday",
  },
  {
    id: 3,
    name: "Sophia",
    age: 26,
    lastActive: "3 hours ago",
    image: "/placeholder.svg?height=400&width=400",
    matched: "3 days ago",
  },
]

const likes = [
  {
    id: 4,
    name: "James",
    age: 32,
    image: "/placeholder.svg?height=400&width=400",
    blurred: true,
  },
  {
    id: 5,
    name: "Olivia",
    age: 27,
    image: "/placeholder.svg?height=400&width=400",
    blurred: true,
  },
]

export default function MatchesPage() {
  const [activeTab, setActiveTab] = useState("matches")
  const [showMatchAnimation, setShowMatchAnimation] = useState(false)
  const [matchedPerson, setMatchedPerson] = useState<any>(null)

  const handleLike = (person: any) => {
    setMatchedPerson(person)
    setShowMatchAnimation(true)
    setTimeout(() => setShowMatchAnimation(false), 3000)
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Matches</h1>
      </header>

      <Tabs defaultValue="matches" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="matches">Matches</TabsTrigger>
          <TabsTrigger value="likes">Likes</TabsTrigger>
        </TabsList>

        <TabsContent value="matches" className="space-y-4">
          {matches.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No matches yet. Keep swiping!</p>
            </div>
          ) : (
            matches.map((match) => (
              <Card key={match.id} className="flex items-center p-4">
                <div className="relative h-16 w-16 flex-shrink-0">
                  <Image
                    src={match.image || "/placeholder.svg"}
                    alt={match.name}
                    fill
                    className="rounded-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background"></div>
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-medium">
                      {match.name}, {match.age}
                    </h3>
                    <span className="text-xs text-muted-foreground">Matched {match.matched}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{match.lastActive}</p>
                </div>
                <Link href={`/messages/${match.id}`}>
                  <Button size="icon" variant="ghost">
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                </Link>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="likes" className="space-y-4">
          <div className="mb-4 rounded-lg bg-muted p-4">
            <h3 className="font-medium">People who liked you</h3>
            <p className="text-sm text-muted-foreground">Match instantly by liking them back</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {likes.map((like) => (
              <Card key={like.id} className="overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src={like.image || "/placeholder.svg"}
                    alt={like.name}
                    fill
                    className={`object-cover ${like.blurred ? "blur-sm" : ""}`}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/30 p-4">
                    <h3 className="font-medium text-white">
                      {like.name}, {like.age}
                    </h3>
                    <Button size="sm" className="mt-2" onClick={() => handleLike(like)}>
                      Like Back
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Match animation overlay */}
      {showMatchAnimation && matchedPerson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="match-animation text-center p-6 max-w-sm">
            <h2 className="text-3xl font-bold text-primary mb-6">It's a Match!</h2>
            <div className="flex justify-center gap-4 mb-8">
              <div className="relative h-24 w-24">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Your profile"
                  fill
                  className="rounded-full object-cover ring-4 ring-primary"
                />
              </div>
              <div className="relative h-24 w-24">
                <Image
                  src={matchedPerson.image || "/placeholder.svg"}
                  alt={matchedPerson.name}
                  fill
                  className="rounded-full object-cover ring-4 ring-primary"
                />
              </div>
            </div>
            <p className="mb-6 text-lg">You and {matchedPerson.name} liked each other!</p>
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1" onClick={() => setShowMatchAnimation(false)}>
                Keep Swiping
              </Button>
              <Button className="flex-1">Send Message</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

