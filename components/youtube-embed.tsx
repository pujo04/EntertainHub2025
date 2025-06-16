"use client"

interface YouTubeEmbedProps {
  videoId: string
  title: string
  width?: number
  height?: number
}

export function YouTubeEmbed({ videoId, title, width = 560, height = 315 }: YouTubeEmbedProps) {
  return (
    <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-lg"
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
