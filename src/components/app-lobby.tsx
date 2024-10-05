'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users, Play, Maximize, Minimize } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const avatarStyles = [
  'adventurer', 'adventurer-neutral', 'avataaars', 'big-ears',
  'big-ears-neutral', 'big-smile', 'bottts', 'croodles', 'croodles-neutral',
  'fun-emoji', 'icons', 'identicon', 'initials', 'lorelei', 'lorelei-neutral',
  'micah', 'miniavs', 'open-peeps', 'personas', 'pixel-art', 'pixel-art-neutral',
  'notionists', 'notionists-neutral', 'thumbs', 'big-smile', 'bottts', 'pixel-art',
  'avataaars', 'open-peeps', 'personas', 'micah', 'adventurer', 'fun-emoji',
  'croodles', 'lorelei', 'notionists', 'identicon', 'initials', 'gridy', 'shapes',
  'human', 'jdenticon', 'male', 'female', 'human', 'identicon', 'initials',
  'bottts', 'avataaars', 'jdenticon', 'gridy', 'micah'
]

const funnyAvatars = [
  'big-smile', 'bottts', 'fun-emoji', 'pixel-art', 'avataaars', 'open-peeps',
  'croodles', 'notionists'
]

const getRandomAvatarStyle = () => avatarStyles[Math.floor(Math.random() * avatarStyles.length)]
const getRandomFunnyAvatar = () => funnyAvatars[Math.floor(Math.random() * funnyAvatars.length)]

const participants = [
  { id: 1, name: 'Alice', avatar: getRandomAvatarStyle() },
  { id: 2, name: 'Bob', avatar: getRandomAvatarStyle() },
  { id: 3, name: 'Charlie', avatar: getRandomFunnyAvatar() },
  { id: 4, name: 'David', avatar: getRandomAvatarStyle() },
  { id: 5, name: 'Eva', avatar: getRandomAvatarStyle() },
  { id: 6, name: 'Frank', avatar: getRandomFunnyAvatar() },
  { id: 7, name: 'Grace', avatar: getRandomAvatarStyle() },
  { id: 8, name: 'Henry', avatar: getRandomAvatarStyle() },
  { id: 9, name: 'Ivy', avatar: getRandomFunnyAvatar() },
  { id: 10, name: 'Jack', avatar: getRandomAvatarStyle() },
  { id: 11, name: 'Karen', avatar: getRandomAvatarStyle() },
  { id: 12, name: 'Liam', avatar: getRandomFunnyAvatar() },
  { id: 13, name: 'Mia', avatar: getRandomAvatarStyle() },
  { id: 14, name: 'Noah', avatar: getRandomAvatarStyle() },
  { id: 15, name: 'Olivia', avatar: getRandomFunnyAvatar() },
  { id: 16, name: 'Peter', avatar: getRandomAvatarStyle() },
  { id: 17, name: 'Quinn', avatar: getRandomAvatarStyle() },
  { id: 18, name: 'Rachel', avatar: getRandomFunnyAvatar() },
  { id: 19, name: 'Sam', avatar: getRandomAvatarStyle() },
  { id: 20, name: 'Tina', avatar: getRandomAvatarStyle() },]

const BUBBLE_SIZE = 80
const BOUNCE_FACTOR = 0.8
const SPEED_FACTOR = 1
const QR_SIZE = 150

export function Page() {
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold">QuizMaster</h1>
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/dashboard"><Button variant="ghost">Dashboard</Button></Link></li>
              <li><Link href="/profile"><Button variant="ghost">Profile</Button></Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Quiz Lobby</span>
              <Badge variant="secondary" className="flex items-center">
                <Users className="mr-1 h-4 w-4" />
                {participants.length} Participants
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Button onClick={toggleFullscreen}>
                {isFullscreen ? <Minimize className="mr-2 h-4 w-4" /> : <Maximize className="mr-2 h-4 w-4" />}
                {isFullscreen ? 'Exit Fullscreen' : 'Go Fullscreen'}
              </Button>
            </div>
            <div ref={containerRef} className="relative h-full w-full bg-primary/5 rounded-lg overflow-hidden border-2 border-primary/20" style={{ height: 'calc(100vh - 100px)' }}>
              {participants.map((participant) => (
                <BouncingBubble
                  key={participant.id}
                  participant={participant}
                  containerSize={containerSize}
                  otherParticipants={participants.filter(p => p.id !== participant.id)}
                />
              ))}
              <QRCode />
              {isFullscreen && (
                <>
                  <Button
                    className="absolute top-4 right-4"
                    onClick={toggleFullscreen}
                  >
                    <Minimize className="mr-2 h-4 w-4" />
                    Exit Fullscreen
                  </Button>
                  <Button
                    size="lg"
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-8"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Start Quiz
                  </Button>
                </>
              )}
            </div>
            {!isFullscreen && (
              <div className="mt-4 flex justify-center">
                <Button size="lg" className="px-8">
                  <Play className="mr-2 h-4 w-4" />
                  Start Quiz
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quiz Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2"><strong>Quiz Name:</strong> General Knowledge Trivia</p>
            <p className="mb-2"><strong>Duration:</strong> 15 minutes</p>
            <p className="mb-2"><strong>Total Questions:</strong> 20</p>
            <p><strong>Difficulty:</strong> Medium</p>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-muted py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 QuizMaster. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

interface BouncingBubbleProps {
  participant: { id: number; name: string; avatar: string }
  containerSize: { width: number; height: number }
  otherParticipants: { id: number; name: string; avatar: string }[]
}

function BouncingBubble({ participant, containerSize, otherParticipants }: BouncingBubbleProps) {
  const controls = useAnimation()
  const [position, setPosition] = useState({
    x: Math.random() * (containerSize.width - BUBBLE_SIZE),
    y: Math.random() * (containerSize.height - BUBBLE_SIZE)
  })
  const [velocity, setVelocity] = useState({
    x: (Math.random() * 2 - 1) * SPEED_FACTOR,
    y: (Math.random() * 2 - 1) * SPEED_FACTOR
  })

  useEffect(() => {
    let animationFrameId: number

    const animate = () => {
      setPosition((prevPos) => {
        let newX = prevPos.x + velocity.x
        let newY = prevPos.y + velocity.y
        let newVelocityX = velocity.x
        let newVelocityY = velocity.y

        // Bounce off walls
        if (newX <= 0 || newX >= containerSize.width - BUBBLE_SIZE) {
          newVelocityX = -velocity.x * BOUNCE_FACTOR
          newX = newX <= 0 ? 0 : containerSize.width - BUBBLE_SIZE
        }

        if (newY <= 0 || newY >= containerSize.height - BUBBLE_SIZE) {
          newVelocityY = -velocity.y * BOUNCE_FACTOR
          newY = newY <= 0 ? 0 : containerSize.height - BUBBLE_SIZE
        }

        // Bounce off QR code
        const qrLeft = (containerSize.width - QR_SIZE) / 2
        const qrRight = qrLeft + QR_SIZE
        const qrTop = (containerSize.height - QR_SIZE) / 2
        const qrBottom = qrTop + QR_SIZE

        if (
          newX + BUBBLE_SIZE > qrLeft &&
          newX < qrRight &&
          newY + BUBBLE_SIZE > qrTop &&
          newY < qrBottom
        ) {
          const overlapLeft = newX + BUBBLE_SIZE - qrLeft
          const overlapRight = qrRight - newX
          const overlapTop = newY + BUBBLE_SIZE - qrTop
          const overlapBottom = qrBottom - newY

          const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom)

          if (minOverlap === overlapLeft || minOverlap === overlapRight) {
            newVelocityX = -velocity.x * BOUNCE_FACTOR
            newX = minOverlap === overlapLeft ? qrLeft - BUBBLE_SIZE : qrRight
          } else {
            newVelocityY = -velocity.y * BOUNCE_FACTOR
            newY = minOverlap === overlapTop ? qrTop - BUBBLE_SIZE : qrBottom
          }
        }

        // Bounce off other participants
        otherParticipants.forEach((otherParticipant) => {
          const dx = newX - otherParticipant.x
          const dy = newY - otherParticipant.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < BUBBLE_SIZE) {
            const angle = Math.atan2(dy, dx)
            const targetX = newX + Math.cos(angle) * BUBBLE_SIZE
            const targetY = newY + Math.sin(angle) * BUBBLE_SIZE
            newX = targetX
            newY = targetY
            newVelocityX = Math.cos(angle) * SPEED_FACTOR
            newVelocityY = Math.sin(angle) * SPEED_FACTOR
          }
        })

        setVelocity({ x: newVelocityX, y: newVelocityY })

        return { x: newX, y: newY }
      })

      controls.set({ x: position.x, y: position.y })
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [controls, velocity, containerSize, position, otherParticipants])

  return (
    <motion.div
      className="absolute"
      animate={controls}
      initial={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 100, damping: 5 }}
    >
      <div className="relative">
        <Avatar className="h-16 w-16 border-4 border-primary shadow-lg">
          <AvatarImage src={`https://api.dicebear.com/6.x/${participant.avatar}/svg?seed=${participant.name}`} />
          <AvatarFallback>{participant.name[0]}</AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
          {participant.name}
        </div>
      </div>
    </motion.div>
  )
}

function QRCode() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <motion.div
        className="w-[150px] h-[150px] bg-white rounded-lg shadow-lg flex items-center justify-center"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 5,
          ease: "easeInOut",
          times: [0, 0.25, 0.75, 1],
          repeat: Infinity,
        }}
      >
        <Image
          src="/placeholder.svg"
          alt="QR Code to join quiz"
          width={150}
          height={150}
        />
      </motion.div>
      <p className="text-center mt-2 font-semibold">Scan to Join</p>
    </div>
  )
}