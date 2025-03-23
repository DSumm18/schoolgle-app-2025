"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormField, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loading } from "@/components/ui/loading"
import Link from "next/link"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    // Simulate authentication delay
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In a real app, this would be replaced with actual authentication
      // For now, just redirect to the dashboard
      window.location.href = "/dashboard"
    } catch (err) {
      setError("Authentication failed. Please check your credentials and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
        <CardDescription>
          Enter your email and password to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-800 mb-4">
              <FormMessage>{error}</FormMessage>
            </div>
          )}

          <div className="space-y-4">
            <FormField>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                required 
              />
            </FormField>
            <FormField>
              <div className="flex items-center justify-between">
                <FormLabel htmlFor="password">Password</FormLabel>
                <Link 
                  href="/auth/forgot-password" 
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                required 
              />
            </FormField>
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="remember" 
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
              />
              <label htmlFor="remember" className="text-sm text-gray-600 dark:text-gray-400">
                Remember me
              </label>
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full mt-6" 
            disabled={isLoading}
          >
            {isLoading ? <Loading size="sm" className="mr-2" /> : null}
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center space-y-2">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-500">
          By signing in, you agree to our Terms and Privacy Policy.
        </div>
      </CardFooter>
    </Card>
  )
}