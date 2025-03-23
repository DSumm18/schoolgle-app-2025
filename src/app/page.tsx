"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export default function HomePage() {
  const currentDate = formatDate(new Date().toISOString());
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Schoolgle 2025
            </h1>
            <p className="text-xl sm:text-2xl max-w-xl lg:max-w-2xl mx-auto lg:mx-0 mb-8">
              A modern platform for educational institutions to manage activities, assess risks, and track issues efficiently.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
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
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Designed to streamline operations and improve efficiency in educational institutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>Activity Management</CardTitle>
                <CardDescription>Module for activity management in educational institutions</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p>
                  This module provides features for managing activity management efficiently across the school.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/modules/activity-management" className="text-primary hover:underline">
                  Learn more
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
                <CardDescription>Module for risk assessment in educational institutions</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p>
                  This module provides features for managing risk assessment efficiently across the school.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/modules/risk-assessment" className="text-primary hover:underline">
                  Learn more
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>Issue Tracker</CardTitle>
                <CardDescription>Module for tracking issues in educational institutions</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p>
                  This module provides features for tracking and resolving issues efficiently across the school.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/modules/issue-tracker" className="text-primary hover:underline">
                  Learn more
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear from educational institutions that have transformed their operations with Schoolgle.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
              <Card key={index} className="bg-muted border-none">
                <CardContent className="pt-6">
                  <div className="flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your School's Operations?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Join hundreds of educational institutions using Schoolgle to streamline their operations.
          </p>
          <Button size="lg" variant="secondary">
            Get Started Today
          </Button>
          <p className="mt-4 text-sm opacity-90">
            Current date: {currentDate}
          </p>
        </div>
      </section>
    </div>
  );
}