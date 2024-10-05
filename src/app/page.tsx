'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, PieChart, LineChart, Users, Zap } from 'lucide-react'

export default function Page() {
  const [activeTab, setActiveTab] = useState('engage')

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold">Mentimeter Clone</h1>
          </motion.div>
          <nav>
            <ul className="flex space-x-4">
              <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost">Features</Button>
              </motion.li>
              <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost">Solutions</Button>
              </motion.li>
              <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost">Pricing</Button>
              </motion.li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold mb-4">Engage your audience in real-time</h2>
            <p className="text-xl mb-8">Create interactive presentations, polls, and quizzes</p>
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              Get started for free
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h3
            className="text-3xl font-bold text-center mb-12"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            Powerful features for every presenter
          </motion.h3>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="engage">Engage</TabsTrigger>
              <TabsTrigger value="analyze">Analyze</TabsTrigger>
              <TabsTrigger value="present">Present</TabsTrigger>
            </TabsList>
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <TabsContent value="engage" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Engage your audience</CardTitle>
                    <CardDescription>Create interactive polls and quizzes</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-around">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                      <p>Live Polling</p>
                    </div>
                    <div className="text-center">
                      <Users className="h-12 w-12 mx-auto mb-2" />
                      <p>Q&A Sessions</p>
                    </div>
                    <div className="text-center">
                      <Zap className="h-12 w-12 mx-auto mb-2" />
                      <p>Word Clouds</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="analyze" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Analyze responses</CardTitle>
                    <CardDescription>Get insights from your audience data</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-around">
                    <div className="text-center">
                      <PieChart className="h-12 w-12 mx-auto mb-2" />
                      <p>Data Visualization</p>
                    </div>
                    <div className="text-center">
                      <LineChart className="h-12 w-12 mx-auto mb-2" />
                      <p>Trend Analysis</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="present" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Present with confidence</CardTitle>
                    <CardDescription>Deliver engaging presentations</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-around">
                    <div className="text-center">
                      <Users className="h-12 w-12 mx-auto mb-2" />
                      <p>Audience Interaction</p>
                    </div>
                    <div className="text-center">
                      <Zap className="h-12 w-12 mx-auto mb-2" />
                      <p>Dynamic Slides</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h3 className="text-3xl font-bold mb-4">Ready to engage your audience?</h3>
            <p className="text-xl mb-8">Join millions of presenters worldwide</p>
            <div className="flex justify-center space-x-4">
              <Input placeholder="Enter your email" className="max-w-xs bg-background text-foreground" />
              <Button variant="default">Sign up free</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Features</a></li>
                <li><a href="#" className="hover:underline">Templates</a></li>
                <li><a href="#" className="hover:underline">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Solutions</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Education</a></li>
                <li><a href="#" className="hover:underline">Business</a></li>
                <li><a href="#" className="hover:underline">Events</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Blog</a></li>
                <li><a href="#" className="hover:underline">Help Center</a></li>
                <li><a href="#" className="hover:underline">Developers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">About Us</a></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
                <li><a href="#" className="hover:underline">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            © 2024 Mentimeter Clone. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}