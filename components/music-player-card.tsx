"use client"

import { Music } from "lucide-react"
import { LinkButton } from "./link-button"

interface Song {
  title: string
  artist: string
  duration: string
  genre: string
  color: string
  album: string
  year: string
  youtubeLink: string
  spotifyLink: string
}

interface MusicPlayerCardProps {
  song: Song
  index: number
  currentSong: number
  isPlaying: boolean
  onSongSelect: (index: number) => void
}

export function MusicPlayerCard({ song, index, currentSong, isPlaying, onSongSelect }: MusicPlayerCardProps) {
  const isCurrentSong = currentSong === index

  return (
    <div
      onClick={() => onSongSelect(index)}
      className={`p-3 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${
        isCurrentSong
          ? `bg-gradient-to-r ${song.color} bg-opacity-30 border border-green-400 shadow-lg`
          : "bg-white/10 hover:bg-white/20"
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${song.color} flex items-center justify-center`}>
            <Music className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-white font-medium">{song.title}</p>
            <p className="text-white/70 text-sm">
              {song.artist} • {song.album} ({song.year})
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-white/70 text-sm">{song.duration}</span>
          {isCurrentSong && isPlaying && (
            <div className="flex gap-1 mt-1">
              <div className="w-1 h-3 bg-green-400 animate-pulse"></div>
              <div className="w-1 h-4 bg-green-400 animate-pulse delay-100"></div>
              <div className="w-1 h-2 bg-green-400 animate-pulse delay-200"></div>
              <div className="w-1 h-4 bg-green-400 animate-pulse delay-300"></div>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <LinkButton
          href={song.youtubeLink}
          className="flex-1 text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
        >
          🎵 YouTube
        </LinkButton>
        <LinkButton
          href={song.spotifyLink}
          className="flex-1 text-green-400 border-green-400 hover:bg-green-400 hover:text-white"
        >
          🎧 Spotify
        </LinkButton>
      </div>
    </div>
  )
}
