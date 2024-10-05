'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Users, Settings, Play, Plus, Trophy, BarChart } from 'lucide-react'
import Link from 'next/link'

export function Page() {
  const [activeQuiz, setActiveQuiz] = useState(null)
  const [quizOptions, setQuizOptions] = useState({
    difficulty: 'medium',
    duration: 30,
    shuffle: true,
    teamMode: false,
  })

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const handleQuizOptionChange = (option, value) => {
    setQuizOptions(prev => ({ ...prev, [option]: value }))
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
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold mb-6">Quiz Lobby</h2>
          <Tabs defaultValue="active" className="w-full">
            <TabsList>
              <TabsTrigger value="active">Active Quizzes</TabsTrigger>
              <TabsTrigger value="create">Create Quiz</TabsTrigger>
              <TabsTrigger value="join">Join Quiz</TabsTrigger>
            </TabsList>
            <TabsContent value="active">
              <Card>
                <CardHeader>
                  <CardTitle>Active Quizzes</CardTitle>
                  <CardDescription>Manage your ongoing quizzes</CardDescription>
                </CardHeader>
                <CardContent>
                  {activeQuiz ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold">{activeQuiz.title}</h3>
                        <Badge variant="secondary">{activeQuiz.participants} participants</Badge>
                      </div>
                      <div className="flex space-x-4">
                        <Button size="sm" variant="outline">
                          <Users className="mr-2 h-4 w-4" />
                          Manage Participants
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="mr-2 h-4 w-4" />
                          Quiz Settings
                        </Button>
                        <Button size="sm">
                          <Play className="mr-2 h-4 w-4" />
                          Start Quiz
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p>No active quizzes. Create or join a quiz to get started.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="create">
              <Card>
                <CardHeader>
                  <CardTitle>Create a New Quiz</CardTitle>
                  <CardDescription>Set up your quiz parameters</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="quiz-title" className="block text-sm font-medium mb-1">Quiz Title</label>
                      <Input id="quiz-title" placeholder="Enter quiz title" />
                    </div>
                    <div>
                      <label htmlFor="quiz-difficulty" className="block text-sm font-medium mb-1">Difficulty</label>
                      <Select onValueChange={(value) => handleQuizOptionChange('difficulty', value)}>
                        <SelectTrigger id="quiz-difficulty">
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label htmlFor="quiz-duration" className="block text-sm font-medium mb-1">Duration (minutes)</label>
                      <Slider
                        id="quiz-duration"
                        min={5}
                        max={60}
                        step={5}
                        value={[quizOptions.duration]}
                        onValueChange={(value) => handleQuizOptionChange('duration', value[0])}
                      />
                      <span className="text-sm text-muted-foreground">{quizOptions.duration} minutes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="quiz-shuffle"
                        checked={quizOptions.shuffle}
                        onCheckedChange={(checked) => handleQuizOptionChange('shuffle', checked)}
                      />
                      <label htmlFor="quiz-shuffle" className="text-sm font-medium">Shuffle Questions</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="quiz-team-mode"
                        checked={quizOptions.teamMode}
                        onCheckedChange={(checked) => handleQuizOptionChange('teamMode', checked)}
                      />
                      <label htmlFor="quiz-team-mode" className="text-sm font-medium">Enable Team Mode</label>
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Quiz
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="join">
              <Card>
                <CardHeader>
                  <CardTitle>Join a Quiz</CardTitle>
                  <CardDescription>Enter a quiz code to join</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="quiz-code" className="block text-sm font-medium mb-1">Quiz Code</label>
                      <Input id="quiz-code" placeholder="Enter quiz code" />
                    </div>
                    <div>
                      <label htmlFor="participant-name" className="block text-sm font-medium mb-1">Your Name</label>
                      <Input id="participant-name" placeholder="Enter your name" />
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Join Quiz</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.section>

        <motion.section
          className="mt-12"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h3 className="text-2xl font-bold mb-4">Recent Activity</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="mr-2 h-5 w-5" />
                  Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[...Array(5)].map((_, index) => (
                    <li key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=User${index + 1}`} />
                          <AvatarFallback>U{index + 1}</AvatarFallback>
                        </Avatar>
                        <span>User {index + 1}</span>
                      </div>
                      <Badge variant="secondary">{1000 - index * 100} pts</Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Upcoming Quizzes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[...Array(3)].map((_, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span>Quiz {index + 1}</span>
                      <Badge variant="outline">In {10 + index * 5} minutes</Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart className="mr-2 h-5 w-5" />
                  Quiz Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span>Total Quizzes</span>
                    <Badge>50</Badge>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Avg. Participants</span>
                    <Badge>25</Badge>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Highest Score</span>
                    <Badge>98%</Badge>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </motion.section>
      </main>

      <footer className="bg-muted py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 QuizMaster. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}