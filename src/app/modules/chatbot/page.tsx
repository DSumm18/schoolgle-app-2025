"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { getGreeting } from '@/lib/utils';

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `${getGreeting()}! I'm Ed, your Schoolgle assistant. How can I help you today?`
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage = { role: 'user', content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I've found some resources on that topic in our school database. Would you like me to share them with you?",
        "Based on the school calendar, there are several upcoming events related to your query. Would you like more details?",
        "I can help you draft that communication. What key points would you like to include?",
        "The school policy on this matter suggests the following approach...",
        "I've analyzed the latest assessment data, and here's what I found about student progress in that area."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prev => [...prev, { role: 'assistant', content: randomResponse }]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">Ed - Schoolgle Assistant</h1>
      <p className="mb-6 text-muted-foreground">Your AI teaching assistant powered by Schoolgle</p>
      
      <Card className="border-0 shadow-md h-[70vh] flex flex-col">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">Conversation</CardTitle>
          <CardDescription>Ask Ed anything about school management, teaching resources, or student data</CardDescription>
        </CardHeader>
        
        <CardContent className="flex-grow overflow-auto pb-0 space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : ''} gap-2 items-start`}>
                <Avatar className={message.role === 'assistant' ? "bg-blue-600" : "bg-gray-500"}>
                  <span>{message.role === 'assistant' ? 'Ed' : 'You'}</span>
                </Avatar>
                <div 
                  className={`rounded-lg px-4 py-2 ${
                    message.role === 'assistant' 
                      ? 'bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-100' 
                      : 'bg-gray-100 dark:bg-gray-800'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-2 items-start">
                <Avatar className="bg-blue-600">
                  <span>Ed</span>
                </Avatar>
                <div className="rounded-lg px-4 py-2 bg-blue-100 dark:bg-blue-950">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="pt-4">
          <div className="flex w-full gap-2">
            <Input 
              placeholder="Type your message..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-grow"
            />
            <Button onClick={handleSendMessage} disabled={isLoading || !inputValue.trim()}>
              Send
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-50 dark:bg-gray-900 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Suggested Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              <li className="text-sm text-blue-600 hover:underline cursor-pointer">Lesson planning for Year 5</li>
              <li className="text-sm text-blue-600 hover:underline cursor-pointer">Behavior management strategies</li>
              <li className="text-sm text-blue-600 hover:underline cursor-pointer">Parent conference tips</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-50 dark:bg-gray-900 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Recently Used</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              <li className="text-sm text-blue-600 hover:underline cursor-pointer">Assessment data analysis</li>
              <li className="text-sm text-blue-600 hover:underline cursor-pointer">SEND resources</li>
              <li className="text-sm text-blue-600 hover:underline cursor-pointer">Trip planning</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-50 dark:bg-gray-900 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              <li className="text-sm text-blue-600 hover:underline cursor-pointer">Create a lesson plan</li>
              <li className="text-sm text-blue-600 hover:underline cursor-pointer">Draft an email</li>
              <li className="text-sm text-blue-600 hover:underline cursor-pointer">Find teaching resources</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}