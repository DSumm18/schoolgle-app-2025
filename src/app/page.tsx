import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col p-8">
      <main className="flex-1">
        <div className="max-w-6xl mx-auto py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Schoolgle 2025</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              A clean version of the Schoolgle application
            </p>
            <div className="mt-8 flex gap-4 justify-center">
              <Button>Get Started</Button>
              <Button variant="outline">Learn More</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {["Activity Management", "Risk Assessment", "Issue Tracker"].map((module, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{module}</CardTitle>
                  <CardDescription>
                    Module for {module.toLowerCase()} in educational institutions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    This module provides features for managing {module.toLowerCase()} 
                    efficiently across the school.
                  </p>
                  <Link 
                    href="#" 
                    className="inline-block mt-4 text-blue-600 hover:underline"
                  >
                    Learn more
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <footer className="border-t py-6 text-center text-sm text-gray-500">
        © 2025 Schoolgle. All rights reserved.
      </footer>
    </div>
  );
}