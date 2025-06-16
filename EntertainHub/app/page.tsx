"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, Music, Film, Gamepad2, Star, Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

export default function EntertainmentApp() {
  const [currentSection, setCurrentSection] = useState("home")
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [audioVolume, setAudioVolume] = useState([50])
  const [videoVolume, setVideoVolume] = useState([50])
  const [currentSong, setCurrentSong] = useState(0)
  const [gameScore, setGameScore] = useState(0)
  const [clickedButtons, setClickedButtons] = useState<number[]>([])
  const [currentGame, setCurrentGame] = useState("click")
  const [memoryCards, setMemoryCards] = useState<number[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedCards, setMatchedCards] = useState<number[]>([])
  // Ganti semua whack-a-mole states dengan simon says states
  const [simonSequence, setSimonSequence] = useState<number[]>([])
  const [playerSequence, setPlayerSequence] = useState<number[]>([])
  const [simonScore, setSimonScore] = useState(0)
  const [simonGameRunning, setSimonGameRunning] = useState(false)
  const [simonGameOver, setSimonGameOver] = useState(false)
  const [simonLevel, setSimonLevel] = useState(1)
  const [simonShowingSequence, setSimonShowingSequence] = useState(false)
  const [simonActiveButton, setSimonActiveButton] = useState<number | null>(null)
  const [simonMessage, setSimonMessage] = useState("Tekan Mulai untuk bermain!")

  // Remove all whack-a-mole states
  // Remove: molePositions, moleScore, moleGameRunning, etc.

  // Ganti semua bubble shooter states dengan tetris states
  const bubbleColors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-orange-500",
  ]
  const [tetrisBoard, setTetrisBoard] = useState<number[][]>(
    Array(20)
      .fill(null)
      .map(() => Array(10).fill(0)),
  )
  const [currentPiece, setCurrentPiece] = useState<{ shape: number[][]; x: number; y: number; type: number }>({
    shape: [[1, 1, 1, 1]],
    x: 3,
    y: 0,
    type: 0,
  })
  const [tetrisScore, setTetrisScore] = useState(0)
  const [tetrisLevel, setTetrisLevel] = useState(1)
  const [tetrisLines, setTetrisLines] = useState(0)
  const [tetrisGameRunning, setTetrisGameRunning] = useState(false)
  const [tetrisGameOver, setTetrisGameOver] = useState(false)
  const [nextPiece, setNextPiece] = useState<{ shape: number[][]; type: number }>({ shape: [[1, 1, 1, 1]], type: 0 })
  const gameIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const [videoCategory, setVideoCategory] = useState("All")
  const [musicGenre, setMusicGenre] = useState("All")

  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const songs = [
    {
      title: "Blinding Lights",
      artist: "The Weeknd",
      duration: "3:20",
      genre: "Pop",
      color: "from-red-500 to-pink-500",
      album: "After Hours",
      year: "2019",
      youtubeLink: "https://www.youtube.com/watch?v=4NRXx6U8ABQ",
      spotifyLink: "https://open.spotify.com/track/0VjIjW4GlULA4LGoDOLVKN",
    },
    {
      title: "Shape of You",
      artist: "Ed Sheeran",
      duration: "3:53",
      genre: "Pop",
      color: "from-blue-500 to-cyan-500",
      album: "÷ (Divide)",
      year: "2017",
      youtubeLink: "https://www.youtube.com/watch?v=JGwWNGJdvx8",
      spotifyLink: "https://open.spotify.com/track/7qiZfU4dY1lWllzX7mkmht",
    },
    {
      title: "Bohemian Rhapsody",
      artist: "Queen",
      duration: "5:55",
      genre: "Rock",
      color: "from-yellow-500 to-red-500",
      album: "A Night at the Opera",
      year: "1975",
      youtubeLink: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ",
      spotifyLink: "https://open.spotify.com/track/4u7EnebtmKWzUH433cf5Qv",
    },
    {
      title: "Billie Jean",
      artist: "Michael Jackson",
      duration: "4:54",
      genre: "Pop",
      color: "from-purple-500 to-pink-500",
      album: "Thriller",
      year: "1982",
      youtubeLink: "https://www.youtube.com/watch?v=Zi_XLOBDo_Y",
      spotifyLink: "https://open.spotify.com/track/5ChkMS8OtdzJeqyybCc9R5",
    },
    {
      title: "Someone Like You",
      artist: "Adele",
      duration: "4:45",
      genre: "Pop",
      color: "from-green-500 to-blue-500",
      album: "21",
      year: "2011",
      youtubeLink: "https://www.youtube.com/watch?v=hLQl3WQQoQ0",
      spotifyLink: "https://open.spotify.com/track/1zwMYTA5nlNjZxYrvBB2pV",
    },
    {
      title: "Thunderstruck",
      artist: "AC/DC",
      duration: "4:52",
      genre: "Rock",
      color: "from-gray-500 to-black",
      album: "The Razors Edge",
      year: "1990",
      youtubeLink: "https://www.youtube.com/watch?v=v2AC41dglnM",
      spotifyLink: "https://open.spotify.com/track/57bgtoPSgt236HzfBOd8kj",
    },
    {
      title: "Take Five",
      artist: "Dave Brubeck",
      duration: "5:24",
      genre: "Jazz",
      color: "from-orange-500 to-yellow-500",
      album: "Time Out",
      year: "1959",
      youtubeLink: "https://www.youtube.com/watch?v=vmDDOFXSgAs",
      spotifyLink: "https://open.spotify.com/track/1YQWosTIljIvxAgHWTp7KP",
    },
    {
      title: "Lose Yourself",
      artist: "Eminem",
      duration: "5:26",
      genre: "Hip Hop",
      color: "from-red-500 to-orange-500",
      album: "8 Mile Soundtrack",
      year: "2002",
      youtubeLink: "https://www.youtube.com/watch?v=_Yhyp-_hX2s",
      spotifyLink: "https://open.spotify.com/track/1v1oIWf2Xgh54kIWuKsDf1",
    },
    {
      title: "Claire de Lune",
      artist: "Claude Debussy",
      duration: "4:38",
      genre: "Classical",
      color: "from-indigo-500 to-purple-500",
      album: "Suite Bergamasque",
      year: "1905",
      youtubeLink: "https://www.youtube.com/watch?v=CvFH_6DNRCY",
      spotifyLink: "https://open.spotify.com/track/2HbKqm4o0w5wEeEFXm2sD4",
    },
    {
      title: "Weightless",
      artist: "Marconi Union",
      duration: "8:08",
      genre: "Ambient",
      color: "from-blue-500 to-indigo-500",
      album: "Weightless",
      year: "2011",
      youtubeLink: "https://www.youtube.com/watch?v=UfcAVejslrU",
      spotifyLink: "https://open.spotify.com/playlist/0vvXsWCC9xrXsKd4FyS8kM",
    },
    {
      title: "Friends in Low Places",
      artist: "Garth Brooks",
      duration: "4:27",
      genre: "Country",
      color: "from-yellow-500 to-orange-500",
      album: "No Fences",
      year: "1990",
      youtubeLink: "https://www.youtube.com/watch?v=mvCgSqPZ4EM",
      spotifyLink: "https://open.spotify.com/track/0e9Ynh3VCEhHKtS3DAG0oQ",
    },
    {
      title: "Lofi Hip Hop Study Mix",
      artist: "ChilledCow",
      duration: "1:30:00",
      genre: "Lo-Fi",
      color: "from-purple-500 to-blue-500",
      album: "Study Beats",
      year: "2020",
      youtubeLink: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
      spotifyLink: "https://open.spotify.com/playlist/0vvXsWCC9xrXsKd4FyS8kM",
    },
  ]

  const videos = [
    {
      title: "Amazing Nature Documentary - Wildlife Safari",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "15:30",
      category: "Documentary",
      views: "2.3M",
      channel: "Nature Explorer",
      uploadDate: "2 days ago",
      youtubeLink: "https://www.youtube.com/watch?v=NU5PyD_nGWs",
      description: "Jelajahi keindahan alam liar Afrika dengan dokumenter menakjubkan ini",
    },
    {
      title: "Funny Cat Compilation 2024 - Try Not to Laugh",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "8:45",
      category: "Comedy",
      views: "1.8M",
      channel: "Comedy Central",
      uploadDate: "1 week ago",
      youtubeLink: "https://www.youtube.com/watch?v=hFZFjoX2cGg",
      description: "Kompilasi video kucing lucu yang akan membuat Anda tertawa",
    },
    {
      title: "Top 40 Pop Hits 2024 - Music Video Mix",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "2:15:30",
      category: "Music",
      views: "5.2M",
      channel: "Pop Music Official",
      uploadDate: "3 days ago",
      youtubeLink: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
      description: "Kumpulan lagu pop terpopuler tahun 2024 dalam satu video",
    },
    {
      title: "Marvel Phase 5 - All Movie Trailers Compilation",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "12:22",
      category: "Entertainment",
      views: "8.1M",
      channel: "Marvel Entertainment",
      uploadDate: "5 days ago",
      youtubeLink: "https://www.youtube.com/watch?v=6ZfuNTqbHE8",
      description: "Semua trailer film Marvel Phase 5 dalam satu kompilasi epic",
    },
    {
      title: "Minecraft Speedrun World Record Attempt",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "23:33",
      category: "Gaming",
      views: "4.7M",
      channel: "SpeedRunner Pro",
      uploadDate: "1 day ago",
      youtubeLink: "https://www.youtube.com/watch?v=ylkHE_SwkVY",
      description: "Percobaan memecahkan rekor dunia Minecraft speedrun any%",
    },
    {
      title: "Japan Travel Guide - Tokyo Street Food Tour",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "18:45",
      category: "Travel",
      views: "1.9M",
      channel: "Travel Vlogger",
      uploadDate: "4 days ago",
      youtubeLink: "https://www.youtube.com/watch?v=s-QAvPjyi5o",
      description: "Tur kuliner street food terbaik di Tokyo, Jepang",
    },
    {
      title: "Gordon Ramsay's Perfect Pasta Recipe",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "15:12",
      category: "Lifestyle",
      views: "2.8M",
      channel: "Gordon Ramsay",
      uploadDate: "6 days ago",
      youtubeLink: "https://www.youtube.com/watch?v=1ha1YazI1zs",
      description: "Chef Gordon Ramsay mengajarkan resep pasta sempurna",
    },
    {
      title: "iPhone 16 vs Samsung Galaxy S24 - Full Review",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "13:28",
      category: "Technology",
      views: "3.5M",
      channel: "Tech Reviewer",
      uploadDate: "2 weeks ago",
      youtubeLink: "https://www.youtube.com/watch?v=8Xjr2hnOHiM",
      description: "Perbandingan lengkap iPhone 16 vs Samsung Galaxy S24",
    },
    {
      title: "Champions League Final Highlights 2024",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "9:15",
      category: "Sports",
      views: "6.1M",
      channel: "UEFA Official",
      uploadDate: "3 weeks ago",
      youtubeLink: "https://www.youtube.com/watch?v=QcIy9NiNbmo",
      description: "Highlight pertandingan final Liga Champions 2024",
    },
    {
      title: "Digital Art Tutorial - Photoshop Character Design",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "45:50",
      category: "Art",
      views: "1.4M",
      channel: "Art Academy",
      uploadDate: "1 week ago",
      youtubeLink: "https://www.youtube.com/watch?v=7ZK5MKzp_-w",
      description: "Tutorial lengkap mendesain karakter digital dengan Photoshop",
    },
    {
      title: "Physics Explained - Quantum Mechanics for Beginners",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "16:33",
      category: "Education",
      views: "2.6M",
      channel: "Science Simplified",
      uploadDate: "5 days ago",
      youtubeLink: "https://www.youtube.com/watch?v=JhHMJCUmq28",
      description: "Penjelasan sederhana tentang mekanika kuantum untuk pemula",
    },
    {
      title: "K-Pop Dance Cover - NewJeans 'Get Up' Choreography",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "7:42",
      category: "Dance",
      views: "4.3M",
      channel: "Dance Studio",
      uploadDate: "2 days ago",
      youtubeLink: "https://www.youtube.com/watch?v=ArmDp-zijuc",
      description: "Cover dance koreografi 'Get Up' dari NewJeans",
    },
  ]

  const tetrisPieces = [
    { shape: [[1, 1, 1, 1]], color: "bg-cyan-400" }, // I
    {
      shape: [
        [1, 1],
        [1, 1],
      ],
      color: "bg-yellow-400",
    }, // O
    {
      shape: [
        [0, 1, 0],
        [1, 1, 1],
      ],
      color: "bg-purple-400",
    }, // T
    {
      shape: [
        [0, 1, 1],
        [1, 1, 0],
      ],
      color: "bg-green-400",
    }, // S
    {
      shape: [
        [1, 1, 0],
        [0, 1, 1],
      ],
      color: "bg-red-400",
    }, // Z
    {
      shape: [
        [1, 0, 0],
        [1, 1, 1],
      ],
      color: "bg-blue-400",
    }, // J
    {
      shape: [
        [0, 0, 1],
        [1, 1, 1],
      ],
      color: "bg-orange-400",
    }, // L
  ]

  const generateRandomPiece = () => {
    const randomIndex = Math.floor(Math.random() * tetrisPieces.length)
    return {
      shape: tetrisPieces[randomIndex].shape,
      type: randomIndex,
      x: 3,
      y: 0,
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = audioVolume[0] / 100
    }
  }, [audioVolume])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = videoVolume[0] / 100
    }
  }, [videoVolume])

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsAudioPlaying(!isAudioPlaying)
    }
  }

  const handleGameClick = (buttonId: number) => {
    if (!clickedButtons.includes(buttonId)) {
      setClickedButtons([...clickedButtons, buttonId])
      setGameScore(gameScore + 10)
    }
  }

  const resetGame = () => {
    setClickedButtons([])
    setGameScore(0)
  }

  const initializeMemoryGame = () => {
    const cards = [...Array(8)].flatMap((_, i) => [i, i]).sort(() => Math.random() - 0.5)
    setMemoryCards(cards)
    setFlippedCards([])
    setMatchedCards([])
  }

  const handleMemoryCardClick = (index: number) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedCards.includes(index)) return

    const newFlipped = [...flippedCards, index]
    setFlippedCards(newFlipped)

    if (newFlipped.length === 2) {
      if (memoryCards[newFlipped[0]] === memoryCards[newFlipped[1]]) {
        setMatchedCards([...matchedCards, ...newFlipped])
        setFlippedCards([])
      } else {
        setTimeout(() => setFlippedCards([]), 1000)
      }
    }
  }

  const resetMemoryGame = () => {
    initializeMemoryGame()
  }

  // Add simon says functions
  const simonColors = [
    { bg: "bg-red-500", active: "bg-red-300", sound: "🔴" },
    { bg: "bg-blue-500", active: "bg-blue-300", sound: "🔵" },
    { bg: "bg-green-500", active: "bg-green-300", sound: "🟢" },
    { bg: "bg-yellow-500", active: "bg-yellow-300", sound: "🟡" },
  ]

  const startSimonGame = () => {
    setSimonGameRunning(true)
    setSimonGameOver(false)
    setSimonScore(0)
    setSimonLevel(1)
    setSimonSequence([])
    setPlayerSequence([])
    setSimonMessage("Perhatikan urutan warna...")

    // Start first round
    setTimeout(() => {
      addToSequence()
    }, 1000)
  }

  const addToSequence = () => {
    const newNumber = Math.floor(Math.random() * 4)
    const newSequence = [...simonSequence, newNumber]
    setSimonSequence(newSequence)
    setPlayerSequence([])
    showSequence(newSequence)
  }

  const showSequence = (sequence: number[]) => {
    setSimonShowingSequence(true)
    setSimonMessage("Perhatikan urutan...")

    sequence.forEach((colorIndex, index) => {
      setTimeout(() => {
        setSimonActiveButton(colorIndex)
        setTimeout(() => {
          setSimonActiveButton(null)
          if (index === sequence.length - 1) {
            setSimonShowingSequence(false)
            setSimonMessage("Ulangi urutan yang sama!")
          }
        }, 600)
      }, index * 1000)
    })
  }

  const handleSimonButtonClick = (buttonIndex: number) => {
    if (simonShowingSequence || !simonGameRunning) return

    const newPlayerSequence = [...playerSequence, buttonIndex]
    setPlayerSequence(newPlayerSequence)

    // Flash button
    setSimonActiveButton(buttonIndex)
    setTimeout(() => setSimonActiveButton(null), 200)

    // Check if correct
    if (buttonIndex !== simonSequence[newPlayerSequence.length - 1]) {
      // Wrong button - game over
      setSimonGameOver(true)
      setSimonGameRunning(false)
      setSimonMessage("Salah! Game Over!")
      return
    }

    // Check if sequence complete
    if (newPlayerSequence.length === simonSequence.length) {
      // Sequence complete - next level
      setSimonScore((prev) => prev + simonLevel * 100)
      setSimonLevel((prev) => prev + 1)
      setSimonMessage("Benar! Level selanjutnya...")

      setTimeout(() => {
        addToSequence()
      }, 1500)
    }
  }

  const resetSimonGame = () => {
    setSimonSequence([])
    setPlayerSequence([])
    setSimonScore(0)
    setSimonGameRunning(false)
    setSimonGameOver(false)
    setSimonLevel(1)
    setSimonShowingSequence(false)
    setSimonActiveButton(null)
    setSimonMessage("Tekan Mulai untuk bermain!")
  }

  const resetMoleGame = () => {
    if (gameIntervalRef.current) {
      clearInterval(gameIntervalRef.current)
    }
  }

  // Remove keyboard event listener
  // useEffect(() => {
  //   window.addEventListener("keydown", handleKeyPress)
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyPress)
  //     if (gameIntervalRef.current) {
  //       clearInterval(gameIntervalRef.current)
  //     }
  //   }
  // }, [bubbleGameRunning])

  const handleKeyPress = (e: KeyboardEvent) => {
    if (!tetrisGameRunning) return

    switch (e.key.toLowerCase()) {
      case "a":
        // Move left
        setCurrentPiece((prev) => ({ ...prev, x: Math.max(0, prev.x - 1) }))
        break
      case "d":
        // Move right
        setCurrentPiece((prev) => ({ ...prev, x: Math.min(7, prev.x + 1) }))
        break
      case "s":
        // Soft drop
        setCurrentPiece((prev) => ({ ...prev, y: prev.y + 1 }))
        break
      case "w":
        // Rotate piece
        rotatePiece()
        break
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress)
    return () => {
      window.removeEventListener("keydown", handleKeyPress)
      if (gameIntervalRef.current) {
        clearInterval(gameIntervalRef.current)
      }
    }
  }, [tetrisGameRunning])

  useEffect(() => {
    initializeMemoryGame()
  }, [])

  useEffect(() => {
    return () => {
      if (gameIntervalRef.current) {
        clearInterval(gameIntervalRef.current)
      }
    }
  }, [])

  const categories = [
    "All",
    "Documentary",
    "Comedy",
    "Music",
    "Entertainment",
    "Gaming",
    "Travel",
    "Lifestyle",
    "Technology",
    "Sports",
    "Art",
    "Education",
    "Dance",
  ]
  const genres = [
    "All",
    "Soundtrack",
    "Lo-Fi",
    "Electronic",
    "Jazz",
    "Rock",
    "Pop",
    "Classical",
    "Hip Hop",
    "Ambient",
    "Country",
  ]

  const filteredVideos = videoCategory === "All" ? videos : videos.filter((video) => video.category === videoCategory)
  const filteredSongs = musicGenre === "All" ? songs : songs.filter((song) => song.genre === musicGenre)

  const startTetrisGame = () => {
    setTetrisGameRunning(true)
    setTetrisGameOver(false)
    // Game loop logic here
  }

  const resetTetrisGame = () => {
    setTetrisBoard(
      Array(20)
        .fill(null)
        .map(() => Array(10).fill(0)),
    )
    setTetrisScore(0)
    setTetrisLevel(1)
    setTetrisLines(0)
    setTetrisGameRunning(false)
    setTetrisGameOver(false)
    setCurrentPiece(generateRandomPiece())
    setNextPiece(generateRandomPiece())
  }

  const rotatePiece = () => {
    // Rotation logic
    setCurrentPiece((prev) => {
      const rotated = prev.shape[0].map((_, i) => prev.shape.map((row) => row[i]).reverse())
      return { ...prev, shape: rotated }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-md z-50 border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-white flex items-center gap-2">
              <Star className="h-8 w-8 text-yellow-400 animate-pulse" />
              EntertainHub
            </div>
            <div className="flex gap-6">
              {["home", "videos", "music", "games"].map((section) => (
                <button
                  key={section}
                  onClick={() => setCurrentSection(section)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 capitalize ${
                    currentSection === section ? "bg-white text-purple-900 shadow-lg" : "text-white hover:bg-white/20"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Home Section */}
      {currentSection === "home" && (
        <section className="pt-20 min-h-screen flex items-center justify-center">
          <div className="text-center space-y-8 px-4">
            <div className="animate-bounce">
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Selamat Datang di
              </h1>
              <h2 className="text-4xl md:text-6xl font-bold text-yellow-400 animate-pulse">EntertainHub</h2>
            </div>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Your ultimate destination for multimedia entertainment. Discover amazing videos, listen to great music,
              and play interactive games!
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Button
                onClick={() => setCurrentSection("videos")}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg rounded-full transform hover:scale-105 transition-all duration-300"
              >
                <Film className="mr-2 h-5 w-5" />
                Tonton Video
              </Button>
              <Button
                onClick={() => setCurrentSection("music")}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-full transform hover:scale-105 transition-all duration-300"
              >
                <Music className="mr-2 h-5 w-5" />
                Dengar Musik
              </Button>
              <Button
                onClick={() => setCurrentSection("games")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full transform hover:scale-105 transition-all duration-300"
              >
                <Gamepad2 className="mr-2 h-5 w-5" />
                Main Game
              </Button>
            </div>

            {/* Floating Animation Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-pink-400 rounded-full animate-ping"></div>
              <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-blue-400 rounded-full animate-bounce delay-300"></div>
              <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-500"></div>
              <div className="absolute bottom-1/3 right-1/3 w-5 h-5 bg-purple-400 rounded-full animate-ping delay-700"></div>
            </div>
          </div>
        </section>
      )}

      {/* Videos Section */}
      {currentSection === "videos" && (
        <section className="pt-24 pb-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">🎬 Koleksi Video</h2>

            {/* Main Video Player */}
            <div className="max-w-4xl mx-auto mb-12">
              <Card className="bg-black/40 border-white/20 backdrop-blur-md">
                <CardContent className="p-6">
                  <div className="relative rounded-lg overflow-hidden mb-4">
                    <video
                      ref={videoRef}
                      className="w-full h-64 md:h-96 object-cover"
                      poster="/placeholder.svg?height=400&width=800"
                    >
                      <source
                        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Button
                        onClick={toggleVideo}
                        size="lg"
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-md border-white/30 text-white rounded-full w-16 h-16"
                      >
                        {isVideoPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-white">
                    <h3 className="text-xl font-semibold">Big Buck Bunny - Sample Video</h3>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Volume2 className="h-4 w-4" />
                        <Slider
                          value={videoVolume}
                          onValueChange={setVideoVolume}
                          max={100}
                          step={1}
                          className="w-20"
                        />
                      </div>
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Video Categories */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setVideoCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                    videoCategory === category
                      ? "bg-red-600 text-white shadow-lg"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVideos.map((video, index) => (
                <Card
                  key={index}
                  className="bg-black/40 border-white/20 backdrop-blur-md hover:bg-black/60 transition-all duration-300 transform hover:scale-105 hover:rotate-1"
                >
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
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                        {video.category}
                      </div>
                    </div>
                    <h4 className="text-white font-semibold mb-1 line-clamp-2">{video.title}</h4>
                    <p className="text-white/60 text-sm">{video.channel}</p>
                    <p className="text-white/60 text-xs mb-3">
                      {video.views} views • {video.uploadDate}
                    </p>
                    <Button
                      size="sm"
                      className="w-full bg-red-600 hover:bg-red-700 transform hover:scale-105 transition-all duration-300"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Watch Now
                    </Button>
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-xs"
                        onClick={() => window.open(video.youtubeLink, "_blank")}
                      >
                        🔗 YouTube
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Music Section */}
      {currentSection === "music" && (
        <section className="pt-24 pb-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">🎵 Pemutar Musik</h2>

            <div className="max-w-2xl mx-auto">
              <Card className="bg-black/40 border-white/20 backdrop-blur-md">
                <CardContent className="p-8">
                  {/* Genre Filter */}
                  <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {genres.map((genre) => (
                      <button
                        key={genre}
                        onClick={() => setMusicGenre(genre)}
                        className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                          musicGenre === genre
                            ? "bg-green-600 text-white shadow-lg"
                            : "bg-white/20 text-white hover:bg-white/30"
                        }`}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>

                  {/* Album Art */}
                  <div className="relative mb-6">
                    <div
                      className={`w-64 h-64 mx-auto bg-gradient-to-br ${filteredSongs[currentSong]?.color || "from-pink-500 to-purple-600"} rounded-full flex items-center justify-center ${isAudioPlaying ? "animate-spin-slow" : ""} shadow-2xl`}
                    >
                      <div className="w-56 h-56 bg-black rounded-full flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                        <Music className="h-16 w-16 text-white z-10" />
                        <div className="absolute inset-4 border border-white/20 rounded-full"></div>
                        <div className="absolute inset-8 border border-white/10 rounded-full"></div>
                      </div>
                    </div>
                    {/* Floating music notes animation */}
                    {isAudioPlaying && (
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/4 left-1/4 text-2xl animate-bounce delay-100">🎵</div>
                        <div className="absolute top-1/3 right-1/4 text-xl animate-bounce delay-300">🎶</div>
                        <div className="absolute bottom-1/4 left-1/3 text-lg animate-bounce delay-500">🎵</div>
                        <div className="absolute bottom-1/3 right-1/3 text-xl animate-bounce delay-700">🎶</div>
                      </div>
                    )}
                  </div>

                  {/* Song Info */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{filteredSongs[currentSong]?.title}</h3>
                    <p className="text-white/70 mb-1">{filteredSongs[currentSong]?.artist}</p>
                    <span className="inline-block bg-white/20 text-white/80 px-3 py-1 rounded-full text-sm">
                      {filteredSongs[currentSong]?.genre}
                    </span>
                  </div>

                  {/* Audio Element */}
                  <audio ref={audioRef} loop>
                    <source src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" type="audio/wav" />
                    Your browser does not support the audio element.
                  </audio>

                  {/* Controls */}
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <Button
                      onClick={() => setCurrentSong(Math.max(0, currentSong - 1))}
                      size="lg"
                      variant="ghost"
                      className="text-white hover:bg-white/20 rounded-full"
                    >
                      ⏮️
                    </Button>
                    <Button
                      onClick={toggleAudio}
                      size="lg"
                      className="bg-green-600 hover:bg-green-700 rounded-full w-16 h-16"
                    >
                      {isAudioPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                    </Button>
                    <Button
                      onClick={() => setCurrentSong(Math.min(songs.length - 1, currentSong + 1))}
                      size="lg"
                      variant="ghost"
                      className="text-white hover:bg-white/20 rounded-full"
                    >
                      ⏭️
                    </Button>
                  </div>

                  {/* Volume Control */}
                  <div className="flex items-center gap-4 mb-6">
                    <Volume2 className="h-5 w-5 text-white" />
                    <Slider value={audioVolume} onValueChange={setAudioVolume} max={100} step={1} className="flex-1" />
                    <span className="text-white text-sm w-12">{audioVolume[0]}%</span>
                  </div>

                  {/* Enhanced Playlist */}
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Music className="h-5 w-5" />
                      Playlist ({filteredSongs.length} songs)
                    </h4>
                    {filteredSongs.map((song, index) => (
                      <div
                        key={index}
                        onClick={() => setCurrentSong(index)}
                        className={`p-3 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                          currentSong === index
                            ? `bg-gradient-to-r ${song.color} bg-opacity-30 border border-green-400 shadow-lg`
                            : "bg-white/10 hover:bg-white/20"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-full bg-gradient-to-br ${song.color} flex items-center justify-center`}
                            >
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
                            {currentSong === index && isAudioPlaying && (
                              <div className="flex gap-1 mt-1">
                                <div className="w-1 h-3 bg-green-400 animate-pulse"></div>
                                <div className="w-1 h-4 bg-green-400 animate-pulse delay-100"></div>
                                <div className="w-1 h-2 bg-green-400 animate-pulse delay-200"></div>
                                <div className="w-1 h-4 bg-green-400 animate-pulse delay-300"></div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs px-2 py-1"
                            onClick={() => window.open(song.youtubeLink, "_blank")}
                          >
                            🎵 YouTube
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs px-2 py-1"
                            onClick={() => window.open(song.spotifyLink, "_blank")}
                          >
                            🎧 Spotify
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Games Section */}
      {currentSection === "games" && (
        <section className="pt-24 pb-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">🎮 Game Interaktif</h2>

            {/* Game Selection */}
            <div className="flex justify-center gap-4 mb-8">
              {[
                { id: "click", name: "Game Klik", icon: "🎯" },
                { id: "memory", name: "Game Ingatan", icon: "🧠" },
                { id: "simon", name: "Simon Says", icon: "🎵" },
              ].map((game) => (
                <button
                  key={game.id}
                  onClick={() => setCurrentGame(game.id)}
                  className={`px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
                    currentGame === game.id
                      ? "bg-purple-600 text-white shadow-lg"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  <span className="mr-2">{game.icon}</span>
                  {game.name}
                </button>
              ))}
            </div>

            <div className="max-w-4xl mx-auto">
              {/* Click Game */}
              {currentGame === "click" && (
                <Card className="bg-black/40 border-white/20 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-white text-center text-2xl">🎯 Click the Glowing Buttons!</CardTitle>
                    <CardDescription className="text-white/70 text-center">
                      Click on the animated buttons to score points. Each button can only be clicked once!
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <div className="text-4xl font-bold text-yellow-400 mb-2 animate-pulse">Score: {gameScore}</div>
                      <Button
                        onClick={resetGame}
                        className="bg-purple-600 hover:bg-purple-700 transform hover:scale-105 transition-all duration-300"
                      >
                        🔄 Reset Game
                      </Button>
                    </div>

                    <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
                      {Array.from({ length: 16 }, (_, i) => (
                        <button
                          key={i}
                          onClick={() => handleGameClick(i)}
                          disabled={clickedButtons.includes(i)}
                          className={`w-16 h-16 rounded-lg transition-all duration-300 transform text-2xl ${
                            clickedButtons.includes(i)
                              ? "bg-gray-600 scale-95 text-green-400"
                              : "bg-gradient-to-br from-pink-500 to-purple-600 hover:scale-110 animate-pulse hover:animate-bounce"
                          }`}
                          style={{
                            animationDelay: `${i * 0.1}s`,
                          }}
                        >
                          {clickedButtons.includes(i) ? "✅" : "🎯"}
                        </button>
                      ))}
                    </div>

                    <div className="mt-8 text-center">
                      <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
                        <div className="bg-white/10 rounded-lg p-3 transform hover:scale-105 transition-all duration-300">
                          <div className="text-white/70 text-sm">Clicked</div>
                          <div className="text-white text-xl font-bold">{clickedButtons.length}</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 transform hover:scale-105 transition-all duration-300">
                          <div className="text-white/70 text-sm">Remaining</div>
                          <div className="text-white text-xl font-bold">{16 - clickedButtons.length}</div>
                        </div>
                      </div>
                    </div>

                    {clickedButtons.length === 16 && (
                      <div className="mt-6 text-center">
                        <div className="text-2xl text-yellow-400 font-bold animate-bounce">
                          🎉 Perfect Score! All buttons clicked! 🎉
                        </div>
                        <div className="mt-4 text-lg text-white">
                          Final Score: <span className="text-yellow-400 font-bold">{gameScore}</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Memory Game */}
              {currentGame === "memory" && (
                <Card className="bg-black/40 border-white/20 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-white text-center text-2xl">🧠 Memory Match Game</CardTitle>
                    <CardDescription className="text-white/70 text-center">
                      Find matching pairs by flipping cards. Remember their positions!
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <div className="text-2xl font-bold text-blue-400 mb-2">
                        Matches: {matchedCards.length / 2} / 8
                      </div>
                      <Button
                        onClick={resetMemoryGame}
                        className="bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
                      >
                        🔄 New Game
                      </Button>
                    </div>

                    <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
                      {memoryCards.map((card, index) => (
                        <button
                          key={index}
                          onClick={() => handleMemoryCardClick(index)}
                          className={`w-16 h-16 rounded-lg transition-all duration-500 transform text-2xl font-bold ${
                            flippedCards.includes(index) || matchedCards.includes(index)
                              ? "bg-gradient-to-br from-green-400 to-blue-500 text-white scale-105"
                              : "bg-gradient-to-br from-gray-600 to-gray-800 hover:scale-110 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500"
                          }`}
                          disabled={flippedCards.length === 2 && !flippedCards.includes(index)}
                        >
                          {flippedCards.includes(index) || matchedCards.includes(index)
                            ? ["🎮", "🎵", "🎬", "⭐", "🎯", "🎨", "🎪", "🎭"][card]
                            : "❓"}
                        </button>
                      ))}
                    </div>

                    {matchedCards.length === 16 && (
                      <div className="mt-6 text-center">
                        <div className="text-2xl text-green-400 font-bold animate-bounce">
                          🎉 Congratulations! All pairs found! 🎉
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Simon Says */}
              {currentGame === "simon" && (
                <Card className="bg-black/40 border-white/20 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-white text-center text-2xl">🎵 Simon Says</CardTitle>
                    <CardDescription className="text-white/70 text-center">
                      Perhatikan urutan warna yang menyala, lalu ulangi urutan yang sama!
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="flex justify-center gap-8">
                      {/* Game Board */}
                      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg border-4 border-purple-400 p-6 relative">
                        <div className="grid grid-cols-2 gap-4 w-80 h-80">
                          {simonColors.map((color, index) => (
                            <button
                              key={index}
                              onClick={() => handleSimonButtonClick(index)}
                              disabled={simonShowingSequence || !simonGameRunning}
                              className={`w-36 h-36 rounded-lg border-4 border-white/30 transition-all duration-200 transform ${
                                simonActiveButton === index
                                  ? `${color.active} scale-95 shadow-2xl border-white`
                                  : `${color.bg} hover:scale-105 shadow-lg`
                              } ${simonGameRunning && !simonShowingSequence ? "cursor-pointer" : "cursor-not-allowed"}`}
                              style={{
                                boxShadow:
                                  simonActiveButton === index
                                    ? "0 0 30px rgba(255, 255, 255, 0.8)"
                                    : "0 4px 15px rgba(0,0,0,0.3)",
                              }}
                            >
                              <div className="text-6xl">{color.sound}</div>
                            </button>
                          ))}
                        </div>

                        {/* Game Over Overlay */}
                        {simonGameOver && (
                          <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg">
                            <div className="text-center text-white">
                              <div className="text-4xl mb-4">🎮 Game Over!</div>
                              <div className="text-2xl mb-2">Level Tercapai: {simonLevel - 1}</div>
                              <div className="text-xl mb-2">Skor Akhir: {simonScore}</div>
                              <div className="text-lg mb-4">Urutan: {simonSequence.length} langkah</div>
                              <Button onClick={resetSimonGame} className="bg-purple-600 hover:bg-purple-700">
                                🔄 Main Lagi
                              </Button>
                            </div>
                          </div>
                        )}

                        {/* Start Game Overlay */}
                        {!simonGameRunning && !simonGameOver && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
                            <div className="text-center text-white">
                              <div className="text-6xl mb-4">🎵</div>
                              <div className="text-3xl mb-2">Simon Says</div>
                              <div className="text-lg mb-4">Ikuti urutan warna yang menyala!</div>
                              <Button
                                onClick={startSimonGame}
                                className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-3"
                              >
                                🎮 Mulai Permainan
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Game Info */}
                      <div className="space-y-4">
                        <div className="bg-white/10 rounded-lg p-4 text-white">
                          <h3 className="font-bold text-xl mb-3">📊 Statistik</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span>Skor:</span>
                              <span className="font-bold text-2xl text-yellow-400">{simonScore}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Level:</span>
                              <span className="font-bold text-xl text-purple-400">{simonLevel}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Urutan:</span>
                              <span className="font-bold text-green-400">{simonSequence.length} langkah</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Progress:</span>
                              <span className="font-bold text-blue-400">
                                {playerSequence.length}/{simonSequence.length}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white/10 rounded-lg p-4 text-white">
                          <h4 className="font-semibold mb-3">💬 Status:</h4>
                          <div className="text-center p-3 bg-purple-500/20 rounded-lg border border-purple-400/30">
                            <div className="text-lg font-medium">{simonMessage}</div>
                          </div>
                        </div>

                        <div className="bg-white/10 rounded-lg p-4 text-white text-sm">
                          <h4 className="font-semibold mb-3">🎮 Cara Bermain:</h4>
                          <div className="space-y-2">
                            <div>• Perhatikan urutan warna yang menyala</div>
                            <div>• Klik tombol sesuai urutan yang sama</div>
                            <div>• Setiap level menambah 1 langkah</div>
                            <div>• Jangan salah urutan!</div>
                            <div>• Semakin tinggi level, semakin sulit</div>
                          </div>
                        </div>

                        <div className="bg-white/10 rounded-lg p-4 text-white text-sm">
                          <h4 className="font-semibold mb-3">🏆 Sistem Poin:</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Per Level:</span>
                              <span className="text-green-400">Level × 100</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Level 1:</span>
                              <span className="text-yellow-400">100 poin</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Level 5:</span>
                              <span className="text-yellow-400">500 poin</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Level 10:</span>
                              <span className="text-yellow-400">1000 poin</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white/10 rounded-lg p-4 text-white text-sm">
                          <h4 className="font-semibold mb-3">🎨 Kode Warna:</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {simonColors.map((color, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <div className={`w-6 h-6 rounded ${color.bg} border border-white/50`} />
                                <span className="text-xs">
                                  {color.sound} Tombol {index + 1}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {simonGameRunning && !simonShowingSequence && (
                          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-400/30">
                            <div className="text-white text-center">
                              <div className="text-2xl mb-2">🎯</div>
                              <div className="text-lg font-bold">Giliran Anda!</div>
                              <div className="text-sm text-white/70">Klik sesuai urutan</div>
                            </div>
                          </div>
                        )}

                        {simonShowingSequence && (
                          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-4 border border-blue-400/30 animate-pulse">
                            <div className="text-white text-center">
                              <div className="text-2xl mb-2">👀</div>
                              <div className="text-lg font-bold">Perhatikan!</div>
                              <div className="text-sm text-white/70">Ingat urutannya</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
