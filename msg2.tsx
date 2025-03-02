import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const conversations = [
  {
    id: 1,
    name: "Emma",
    lastMessage: "That sounds great! When are you free?",
    time: "Just now",
    unread: 2,
    image: "/placeholder.svg?height=400&width=400",
    online: true,
  },
  {
    id: 2,
    name: "Michael",
    lastMessage: "I'll send you the details for the restaurant",
    time: "2 hours ago",
    unread: 0,
    image: "/placeholder.svg?height=400&width=400",
    online: false,
  },
  {
    id: 3,
    name: "Sophia",
    lastMessage: "Looking forward to meeting you tomorrow!",
    time: "Yesterday",
    unread: 0,
    image: "/placeholder.svg?height=400&width=400",
    online: true,
  },
]

export default function MessagesPage() {
  return (
    <div className="container max-w-md mx-auto px-4 py-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Messages</h1>
      </header>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search messages" className="pl-10" />
      </div>

      <div className="space-y-4">
        {conversations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No messages yet. Match with someone to start chatting!</p>
          </div>
        ) : (
          conversations.map((conversation) => (
            <Link key={conversation.id} href={`/messages/${conversation.id}`}>
              <Card className="flex items-center p-4 hover:bg-muted/50 transition-colors">
                <div className="relative h-14 w-14 flex-shrink-0">
                  <Image
                    src={conversation.image || "/placeholder.svg"}
                    alt={conversation.name}
                    fill
                    className="rounded-full object-cover"
                  />
                  {conversation.online && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background"></div>
                  )}
                </div>
                <div className="ml-4 flex-1 overflow-hidden">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-medium">{conversation.name}</h3>
                    <span className="text-xs text-muted-foreground">{conversation.time}</span>
                  </div>
                  <p className="truncate text-sm text-muted-foreground">{conversation.lastMessage}</p>
                </div>
                {conversation.unread > 0 && (
                  <div className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {conversation.unread}
                  </div>
                )}
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

