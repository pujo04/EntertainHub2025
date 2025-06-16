"use client"

interface SpotifyEmbedProps {
  trackId: string
  height?: number
}

export function SpotifyEmbed({ trackId, height = 152 }: SpotifyEmbedProps) {
  return (
    <iframe
      src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
      width="100%"
      height={height}
      frameBorder="0"
      allowFullScreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      className="rounded-lg"
    />
  )
}
