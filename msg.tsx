"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import { ArrowLeft, Send, ImageIcon, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

interface Message {
  id: number
  text: string
  sender: "user" | "match"
  timestamp: string
}

export default function ChatPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hey there! I noticed we both like hiking. Have you been to any good trails lately?",
      sender: "match",
      timestamp: "11:30 AM",
    },
    {
      id: 2,
      text: "Hi! Yes, I went to Bear Mountain last weekend. The views were amazing!",
      sender: "user",
      timestamp: "11:32 AM",
    },
    {
      id: 3,
      text: "That sounds awesome! I've been wanting to check that one out. Would you recommend it for beginners?",
      sender: "match",
      timestamp: "11:33 AM",
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [scrollToBottom])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        text: newMessage,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Chat header */}
      <header className="border-b bg-background p-4">
        <div className="flex items-center">
          <Link href="/messages">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=400&width=400" alt="Emma" />
          </Avatar>
          <div className="ml-3">
            <h2 className="font-medium">Emma</h2>
            <p className="text-xs text-muted-foreground">Online now</p>
          </div>
        </div>
      </header>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              {message.sender === "match" && (
                <div className="mr-2 flex-shrink-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=400&width=400" alt="Emma" />
                  </Avatar>
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground chat-bubble-right"
                    : "bg-muted chat-bubble-left"
                }`}
              >
                <p>{message.text}</p>
                <p
                  className={`text-right text-xs ${
                    message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}
                >
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message input */}
      <div className="border-t bg-background p-4">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Button type="button" variant="ghost" size="icon">
            <ImageIcon className="h-5 w-5" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="button" variant="ghost" size="icon">
            <Smile className="h-5 w-5" />
          </Button>
          <Button type="submit" size="icon" disabled={!newMessage.trim()}>
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}

