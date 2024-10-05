'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Lightbulb, Target, Globe } from 'lucide-react'
import Link from 'next/link'

export function Page() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold">Mentimeter Clone</h1>
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/"><Button variant="ghost">Home</Button></Link></li>
              <li><Link href="/pricing"><Button variant="ghost">Pricing</Button></Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.section
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h2 className="text-4xl font-bold mb-4">About Mentimeter Clone</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We're on a mission to transform ordinary presentations into extraordinary experiences.
            Our platform empowers presenters to engage their audience like never before.
          </p>
        </motion.section>

        <motion.section
          className="grid md:grid-cols-2 gap-8 mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2" /> Our Story
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Founded in 2024, Mentimeter Clone grew from a simple idea: make presentations 
                interactive and fun. Today, we serve millions of users worldwide, from educators 
                to Fortune 500 companies.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="mr-2" /> Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We believe in the power of collective intelligence. Our mission is to create a 
                platform where every voice can be heard, turning audiences into active participants.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Our Values</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2" /> Innovation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  We constantly push the boundaries of what's possible in audience engagement, 
                  always seeking new ways to make presentations more interactive and insightful.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="mr-2" /> Inclusivity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  We design our platform to be accessible and user-friendly for everyone, 
                  regardless of technical skill or background. Every voice matters.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        <motion.section
          className="text-center"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h3 className="text-2xl font-bold mb-4">Join Our Journey</h3>
          <p className="mb-8">
            We're always looking for passionate individuals to join our team. 
            Check out our open positions and help us shape the future of presentations.
          </p>
          <Button size="lg">View Career Opportunities</Button>
        </motion.section>
      </main>

      <footer className="bg-muted py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Mentimeter Clone. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}