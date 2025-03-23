"use client";

import React from "react";
import { motion, HTMLMotionProps, Variants } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import { AnimatedLogo } from "@/components/animated-logo";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Book, Calendar, AlertCircle, ArrowRight } from 'lucide-react';

export default function HomePage() {
  // Animation variants
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };
  
  const fadeInUpVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  const scaleInVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  const bgCircle1Props: HTMLMotionProps<"div"> = {
    className: "absolute top-10 left-10 w-20 h-20 rounded-full bg-blue-300",
    animate: { 
      x: [0, 30, 0],
      y: [0, -30, 0]
    },
    transition: { 
      repeat: Infinity,
      duration: 5,
      ease: "easeInOut"
    }
  };

  const bgCircle2Props: HTMLMotionProps<"div"> = {
    className: "absolute bottom-20 right-20 w-32 h-32 rounded-full bg-purple-300",
    animate: { 
      x: [0, -40, 0],
      y: [0, 40, 0]
    },
    transition: { 
      repeat: Infinity,
      duration: 7,
      ease: "easeInOut"
    }
  };

  const bgCircle3Props: HTMLMotionProps<"div"> = {
    className: "absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-indigo-300",
    animate: { 
      x: [0, 50, 0],
      y: [0, 50, 0]
    },
    transition: { 
      repeat: Infinity,
      duration: 6,
      ease: "easeInOut"
    }
  };
  
  const heroContainerProps: HTMLMotionProps<"div"> = {
    className: "text-center lg:text-left",
    initial: "hidden",
    animate: "visible",
    variants: containerVariants
  };

  const featuresSectionProps: HTMLMotionProps<"div"> = {
    className: "text-center mb-12",
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, margin: "-100px" },
    variants: fadeInUpVariants
  };

  const featuresGridProps: HTMLMotionProps<"div"> = {
    className: "grid grid-cols-1 md:grid-cols-3 gap-8",
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, margin: "-100px" },
    variants: containerVariants
  };

  const testimonialsSectionProps: HTMLMotionProps<"div"> = {
    className: "text-center mb-12",
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, margin: "-100px" },
    variants: fadeInUpVariants
  };

  const testimonialsGridProps: HTMLMotionProps<"div"> = {
    className: "grid grid-cols-1 md:grid-cols-2 gap-8",
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, margin: "-100px" },
    variants: containerVariants
  };

  const ctaSectionProps: HTMLMotionProps<"div"> = {
    className: "max-w-6xl mx-auto text-center",
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true },
    variants: containerVariants
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center p-6 md:p-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="flex justify-center mb-6">
            <AnimatedLogo width={80} height={80} />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Schoolgle
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            Your complete school management solution
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center bg-card rounded-lg p-6 shadow-sm"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-blue-500"
                >
                  <rect width="7" height="9" x="3" y="3" rx="1" />
                  <rect width="7" height="5" x="14" y="3" rx="1" />
                  <rect width="7" height="9" x="14" y="12" rx="1" />
                  <rect width="7" height="5" x="3" y="16" rx="1" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">Dashboard</h2>
              <p className="text-muted-foreground text-center mb-4">
                Access your school management dashboard with all available modules.
              </p>
              <Link href="/dashboard" className="mt-auto">
                <Button size="lg" className="w-full">
                  Go to Dashboard
                </Button>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center bg-card rounded-lg p-6 shadow-sm"
            >
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-green-500"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">Public Site</h2>
              <p className="text-muted-foreground text-center mb-4">
                Visit our public site to learn more about Schoolgle features and services.
              </p>
              <Link href="/marketing" className="mt-auto">
                <Button size="lg" variant="outline" className="w-full">
                  Visit Public Site
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 max-w-lg mx-auto text-center"
        >
          <p className="text-sm text-muted-foreground">
            Schoolgle 2024 - Version 0.1.0
            <br />
            A comprehensive school management system
          </p>
        </motion.div>
      </main>
    </div>
  );
}