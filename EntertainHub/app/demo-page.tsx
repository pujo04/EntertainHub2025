"use client"

import { YouTubeEmbed } from "@/components/youtube-embed"
import { SpotifyEmbed } from "@/components/spotify-embed"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="container mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white text-center mb-12">🎬 Demo: Embedded Content</h1>

        {/* YouTube Embed Examples */}
        <Card className="bg-black/40 border-white/20 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-white">📺 YouTube Video Examples</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-white mb-4">Sample Music Video</h3>
              <YouTubeEmbed videoId="dQw4w9WgXcQ" title="Rick Astley - Never Gonna Give You Up" />
            </div>

            <div>
              <h3 className="text-white mb-4">Educational Content</h3>
              <YouTubeEmbed videoId="3QDYbQIS8cQ" title="How YouTube Algorithm Works" />
            </div>
          </CardContent>
        </Card>

        {/* Spotify Embed Examples */}
        <Card className="bg-black/40 border-white/20 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-white">🎵 Spotify Music Examples</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-white mb-4">Popular Track</h3>
              <SpotifyEmbed trackId="4iV5W9uYEdDUVa2Lmhd6bU" />
            </div>

            <div>
              <h3 className="text-white mb-4">Classic Hit</h3>
              <SpotifyEmbed trackId="7qiZfU4dY1lWllzX7mkmht" />
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="bg-black/40 border-white/20 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-white">📋 Cara Menggunakan Konten Real</CardTitle>
          </CardHeader>
          <CardContent className="text-white space-y-4">
            <div>
              <h4 className="font-semibold text-yellow-400">Untuk YouTube:</h4>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>
                  Ambil Video ID dari URL YouTube (contoh: dQw4w9WgXcQ dari https://youtube.com/watch?v=dQw4w9WgXcQ)
                </li>
                <li>Gunakan komponen YouTubeEmbed dengan Video ID tersebut</li>
                <li>Video akan ter-embed langsung tanpa melanggar copyright</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-yellow-400">Untuk Spotify:</h4>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Ambil Track ID dari Spotify URI atau URL</li>
                <li>Gunakan komponen SpotifyEmbed dengan Track ID</li>
                <li>Musik akan ter-embed dengan player resmi Spotify</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-yellow-400">Alternatif Lain:</h4>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Gunakan API resmi YouTube Data API v3 (memerlukan API key)</li>
                <li>Gunakan Spotify Web API (memerlukan client credentials)</li>
                <li>Gunakan layanan seperti SoundCloud, Vimeo untuk variasi konten</li>
                <li>Buat database lokal dengan metadata yang realistis</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
