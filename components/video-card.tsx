"use client"

import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LinkButton } from "./link-button"

interface VideoCardProps {
  video: {
    title: string
    thumbnail: string
    duration: string
    category: string
    views: string
    channel: string
    uploadDate: string
    youtubeLink: string
    description: string
  }
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Card className="bg-black/40 border-white/20 backdrop-blur-md hover:bg-black/60 transition-all duration-300 transform hover:scale-105 hover:rotate-1">
      <CardContent className="p-4">
        <div className="relative mb-3 group">
          <img
            src={video.thumbnail || "/placeholder.svg"}
            alt={video.title}
            className="w-full h-40 object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
            <Play className="h-12 w-12 text-white" />
          </div>
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </div>
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">{video.category}</div>
        </div>

        <h4 className="text-white font-semibold mb-1 line-clamp-2">{video.title}</h4>
        <p className="text-white/60 text-sm">{video.channel}</p>
        <p className="text-white/60 text-xs mb-2">
          {video.views} views • {video.uploadDate}
        </p>
        <p className="text-white/50 text-xs mb-3 line-clamp-2">{video.description}</p>

        <div className="space-y-2">
          <Button
            size="sm"
            className="w-full bg-red-600 hover:bg-red-700 transform hover:scale-105 transition-all duration-300"
          >
            <Play className="mr-2 h-4 w-4" />
            Tonton Sekarang
          </Button>

          <LinkButton
            href={video.youtubeLink}
            className="w-full text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
          >
            🔗 Buka di YouTube
          </LinkButton>
        </div>
      </CardContent>
    </Card>
  )
}
