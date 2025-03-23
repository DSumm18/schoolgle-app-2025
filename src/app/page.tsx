"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { motion } from 'framer-motion';
import { CheckCircle2, Book, Calendar, AlertCircle, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const currentDate = formatDate(new Date().toISOString());
  
  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
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
  
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  const scaleInVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            className="text-center lg:text-left"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
              variants={itemVariants}
            >
              Schoolgle 2025
            </motion.h1>
            <motion.p 
              className="text-xl sm:text-2xl max-w-xl lg:max-w-2xl mx-auto lg:mx-0 mb-8"
              variants={itemVariants}
            >
              A modern platform for educational institutions to manage activities, assess risks, and track issues efficiently.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
              variants={itemVariants}
            >
              <Link href="/modules">
                <Button size="lg" className="w-full sm:w-auto bg-white text-blue-700 hover:bg-gray-100">
                  Explore Modules
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <motion.div 
            className="absolute top-10 left-10 w-20 h-20 rounded-full bg-blue-300"
            animate={{ 
              x: [0, 30, 0],
              y: [0, -30, 0]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-purple-300"
            animate={{ 
              x: [0, -40, 0],
              y: [0, 40, 0]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 7,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-indigo-300"
            animate={{ 
              x: [0, 50, 0],
              y: [0, 50, 0]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut"
            }}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUpVariants}
          >
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Designed to streamline operations and improve efficiency in educational institutions.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div variants={scaleInVariants}>
              <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Activity Management</CardTitle>
                  <CardDescription>Streamline school activities and events</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p>
                    Efficiently plan, track, and manage school activities with calendar integration, reminders, and assignment features.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/modules/activity-management" className="text-primary hover:underline flex items-center">
                    Learn more <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
            
            <motion.div variants={scaleInVariants}>
              <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mb-4">
                    <AlertCircle className="w-6 h-6 text-yellow-500" />
                  </div>
                  <CardTitle>Risk Assessment</CardTitle>
                  <CardDescription>Identify and mitigate potential risks</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p>
                    Comprehensive risk assessment tools to identify, evaluate, and manage potential hazards across all school environments.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/modules/risk-assessment" className="text-primary hover:underline flex items-center">
                    Learn more <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
            
            <motion.div variants={scaleInVariants}>
              <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                    <Book className="w-6 h-6 text-red-500" />
                  </div>
                  <CardTitle>Issue Tracker</CardTitle>
                  <CardDescription>Monitor and resolve problems efficiently</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p>
                    Track, prioritize, and resolve issues with a user-friendly system designed for rapid response and collaborative solutions.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/modules/issue-tracker" className="text-primary hover:underline flex items-center">
                    Learn more <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUpVariants}
          >
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear from educational institutions that have transformed their operations with Schoolgle.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {[
              {
                quote: "Schoolgle has revolutionized how we manage activities and assess risks at our school. It's intuitive and streamlines our processes.",
                name: "Jane Smith",
                title: "Principal, Lincoln Academy",
                image: "https://randomuser.me/api/portraits/women/4.jpg"
              },
              {
                quote: "The issue tracking module has helped us resolve problems faster than ever. Our staff loves how easy it is to report and track issues.",
                name: "Michael Johnson",
                title: "IT Director, Westfield High School",
                image: "https://randomuser.me/api/portraits/men/5.jpg"
              }
            ].map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="bg-muted border-none shadow-sm h-full">
                  <CardContent className="pt-6">
                    <div className="flex flex-col">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-primary">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                        </div>
                      </div>
                      <blockquote className="text-foreground italic">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="flex mt-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className="text-yellow-500">★</span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <motion.div 
          className="max-w-6xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl font-bold mb-4"
            variants={itemVariants}
          >
            Ready to Transform Your School's Operations?
          </motion.h2>
          <motion.p 
            className="text-xl max-w-3xl mx-auto mb-8"
            variants={itemVariants}
          >
            Join hundreds of educational institutions using Schoolgle to streamline their operations.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button size="lg" variant="secondary" className="group">
              Get Started Today
              <motion.span 
                className="inline-block ml-2"
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1, repeatType: "loop" }}
              >
                →
              </motion.span>
            </Button>
          </motion.div>
          <motion.p 
            className="mt-4 text-sm opacity-90"
            variants={itemVariants}
          >
            Current date: {currentDate}
          </motion.p>
        </motion.div>
      </section>
    </div>
  );
}