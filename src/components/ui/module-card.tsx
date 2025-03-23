"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedButton } from "@/components/ui/animated-button"
import { LucideIcon } from "lucide-react"

interface ModuleCardProps {
  title: string
  description: string
  href: string
  icon: LucideIcon
  color?: string
  gradient?: string
}

export function ModuleCard({
  title,
  description,
  href,
  icon: Icon,
  color = "bg-primary/10 text-primary",
  gradient = "from-primary/10 to-primary/5"
}: ModuleCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full overflow-hidden border hover:shadow-lg transition-shadow">
        <div className={`h-2 w-full bg-gradient-to-r ${gradient}`} />
        <CardHeader className="pb-2">
          <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center mb-4`}>
            <Icon className="w-6 h-6" />
          </div>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3">
            Access and manage all aspects of {title.toLowerCase()} with our comprehensive module designed for educational institutions.
          </p>
        </CardContent>
        <CardFooter>
          <AnimatedButton href={href} variant="outline" className="w-full" withArrow>
            Access Module
          </AnimatedButton>
        </CardFooter>
      </Card>
    </motion.div>
  )
}