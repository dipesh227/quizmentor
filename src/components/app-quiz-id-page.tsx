'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle } from 'lucide-react'

export function Page() {
  const params = useParams()
  const quizId = params?.id as string

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [quizEnded, setQuizEnded] = useState(false)

  const questions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: "Paris"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Mars", "Venus", "Jupiter", "Saturn"],
      correctAnswer: "Mars"
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
      correctAnswer: "Leonardo da Vinci"
    }
  ]

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
    setSelectedAnswer('')
    setCurrentQuestion(currentQuestion + 1)
    setTimeLeft(30)
  }

  useEffect(() => {
    if (timeLeft > 0 && !quizEnded) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && currentQuestion < questions.length - 1) {
      handleNextQuestion()
    } else if (timeLeft === 0 && currentQuestion === questions.length - 1) {
      setQuizEnded(true)
    }
  }, [timeLeft, currentQuestion, quizEnded, handleNextQuestion, questions.length])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">QuizMaster</h1>
          <div className="flex items-center space-x-4">
            <Badge variant="outline">Quiz ID: {quizId}</Badge>
            <Avatar>
              <AvatarImage src="https://github.com/shadowbalanced.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!quizEnded ? (
            <motion.div
              key={currentQuestion}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={fadeIn}
              className="w-full max-w-2xl"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Question {currentQuestion + 1} of {questions.length}</span>
                    <Badge variant="secondary">{timeLeft}s</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h2 className="text-xl font-semibold mb-4">{questions[currentQuestion].question}</h2>
                  <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                    {questions[currentQuestion].options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value={option} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleNextQuestion}
                    disabled={!selectedAnswer}
                    className="w-full"
                  >
                    {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                  </Button>
                </CardFooter>
              </Card>
              <Progress value={(currentQuestion + 1) / questions.length * 100} className="mt-4" />
            </motion.div>
          ) : (
            <motion.div
              key="quiz-end"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="w-full max-w-2xl"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Quiz Completed!</CardTitle>
                </CardHeader>
                <CardContent>
                  <h2 className="text-2xl font-bold mb-4">Your Score: {score}/{questions.length}</h2>
                  <div className="space-y-4">
                    {questions.map((q, index) => (
                      <div key={index} className="border-b pb-2">
                        <p className="font-semibold">{q.question}</p>
                        <p className="text-sm text-muted-foreground">Correct Answer: {q.correctAnswer}</p>
                        {score > index ? (
                          <CheckCircle className="text-green-500 inline-block mr-2" />
                        ) : (
                          <XCircle className="text-red-500 inline-block mr-2" />
                        )}
                        <span>{score > index ? 'Correct' : 'Incorrect'}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Back to Lobby</Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-muted py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 QuizMaster. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}