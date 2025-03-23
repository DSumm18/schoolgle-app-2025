"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormField, FormLabel, FormMessage } from "@/components/ui/form"
import { Loading } from "@/components/ui/loading"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    // Simulate form submission
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsSuccess(true)
    } catch (err) {
      setError("There was an error submitting the form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="rounded-lg bg-green-50 p-6 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-medium text-green-800 dark:text-green-300 mb-2">Message sent successfully!</h3>
        <p className="text-green-700 dark:text-green-400">Thank you for contacting us. We'll get back to you as soon as possible.</p>
        <Button
          onClick={() => setIsSuccess(false)}
          className="mt-4"
          variant="outline"
        >
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <Form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-800">
          <FormMessage>{error}</FormMessage>
        </div>
      )}

      <FormField>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input id="name" name="name" placeholder="Your name" required />
      </FormField>

      <FormField>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="your.email@example.com"
          required
        />
      </FormField>

      <FormField>
        <FormLabel htmlFor="subject">Subject</FormLabel>
        <Input
          id="subject"
          name="subject"
          placeholder="What's this regarding?"
          required
        />
      </FormField>

      <FormField>
        <FormLabel htmlFor="message">Message</FormLabel>
        <Textarea
          id="message"
          name="message"
          placeholder="Your message..."
          rows={5}
          required
        />
      </FormField>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? <Loading size="sm" className="mr-2" /> : null}
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </Form>
  )
}