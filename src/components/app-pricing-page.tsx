'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Check } from 'lucide-react'
import Link from 'next/link'

export function Page() {
  const [isAnnual, setIsAnnual] = useState(true)

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const pricingPlans = [
    {
      name: 'Basic',
      monthlyPrice: 9.99,
      annualPrice: 99.99,
      features: [
        'Up to 100 participants',
        'Basic question types',
        'Limited customization',
        'Basic analytics'
      ]
    },
    {
      name: 'Pro',
      monthlyPrice: 24.99,
      annualPrice: 249.99,
      features: [
        'Up to 1000 participants',
        'Advanced question types',
        'Full customization',
        'Advanced analytics',
        'Team collaboration'
      ]
    },
    {
      name: 'Enterprise',
      monthlyPrice: 49.99,
      annualPrice: 499.99,
      features: [
        'Unlimited participants',
        'All question types',
        'Custom branding',
        'Advanced security features',
        'Dedicated support'
      ]
    }
  ]

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
              <li><Link href="/about"><Button variant="ghost">About</Button></Link></li>
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
          <h2 className="text-4xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-xl mb-8">
            Select the perfect plan for your presentation needs
          </p>
          <div className="flex items-center justify-center space-x-4">
            <span className={isAnnual ? 'text-muted-foreground' : ''}>Monthly</span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <span className={!isAnnual ? 'text-muted-foreground' : ''}>Annual (Save 20%)</span>
          </div>
        </motion.section>

        <motion.section
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          {pricingPlans.map((plan, index) => (
            <Card key={index} className={index === 1 ? 'border-primary' : ''}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold">
                    ${isAnnual ? plan.annualPrice.toFixed(2) : plan.monthlyPrice.toFixed(2)}
                  </span>
                  {isAnnual ? ' / year' : ' / month'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Choose {plan.name}</Button>
              </CardFooter>
            </Card>
          ))}
        </motion.section>

        <motion.section
          className="mt-16 text-center"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h3 className="text-2xl font-bold mb-4">Need a custom solution?</h3>
          <p className="mb-8">
            Contact our sales team for a tailored plan that fits your specific needs.
          </p>
          <Button variant="outline" size="lg">Contact Sales</Button>
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