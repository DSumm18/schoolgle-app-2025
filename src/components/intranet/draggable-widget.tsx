"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { Edit, Upload, Image, FileText, Video, Link as LinkIcon, FileSearch, Twitter, Facebook, Calendar } from "lucide-react";

// Placeholder component until dnd-kit is installed
export function DraggableWidget({ 
  widget, 
  editMode 
}: { 
  widget: any, 
  editMode: boolean,
  onUpdate?: (widget: any) => void,
  schoolId?: string 
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(widget.content || '');

  // Get appropriate icon based on widget type
  const getWidgetIcon = () => {
    switch (widget.type) {
      case 'video':
        return <Video className="h-12 w-12 text-muted-foreground" />;
      case 'image':
        return <Image className="h-12 w-12 text-muted-foreground" />;
      case 'text':
        return <FileText className="h-12 w-12 text-muted-foreground" />;
      case 'calendar':
        return <Calendar className="h-12 w-12 text-muted-foreground" />;
      case 'social':
        return <Twitter className="h-12 w-12 text-muted-foreground" />;
      case 'links':
        return <LinkIcon className="h-12 w-12 text-muted-foreground" />;
      default:
        return <FileText className="h-12 w-12 text-muted-foreground" />;
    }
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{widget.title}</CardTitle>
          {editMode && (
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
        </div>
        <CardDescription>
          {widget.type === 'video' && 'Upload or embed a video'}
          {widget.type === 'image' && 'Upload or select images'}
          {widget.type === 'text' && 'Share important information'}
          {widget.type === 'calendar' && 'Display upcoming events'}
          {widget.type === 'social' && 'Connect social media feeds'}
          {widget.type === 'links' && 'Add quick access links'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {widget.type === 'video' && (
          <div className="aspect-video bg-slate-200 dark:bg-slate-800 rounded-md flex items-center justify-center">
            {editMode ? (
              <Button variant="outline" className="flex gap-2">
                <Upload className="h-4 w-4" />
                Upload Video
              </Button>
            ) : widget.content ? (
              <iframe 
                src={widget.content} 
                className="w-full h-full rounded-md" 
                allowFullScreen
              />
            ) : (
              getWidgetIcon()
            )}
          </div>
        )}
        {widget.type === 'image' && (
          <div className="aspect-video bg-slate-200 dark:bg-slate-800 rounded-md flex items-center justify-center">
            {editMode ? (
              <Button variant="outline" className="flex gap-2">
                <Image className="h-4 w-4" />
                Upload Images
              </Button>
            ) : widget.content ? (
              <img 
                src={widget.content} 
                alt={widget.title} 
                className="w-full h-full object-cover rounded-md" 
              />
            ) : (
              getWidgetIcon()
            )}
          </div>
        )}
        {widget.type === 'text' && (
          <>
            {isEditing ? (
              <div className="space-y-2">
                <Textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsEditing(false)}>
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">{content}</p>
            )}
          </>
        )}
        {widget.type === 'calendar' && (
          <div className="border rounded-md p-2">
            <div className="flex items-center gap-2 text-sm mb-2 font-medium">
              <Calendar className="h-4 w-4" />
              March 2025
            </div>
            <ul className="space-y-2">
              <li className="flex justify-between text-xs">
                <span className="font-semibold">Mar 15</span>
                <span>Parent-Teacher Conference</span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="font-semibold">Mar 22</span>
                <span>School Play: "The Wizard of Oz"</span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="font-semibold">Mar 25</span>
                <span>Spring Break Begins</span>
              </li>
            </ul>
          </div>
        )}
        {widget.type === 'social' && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md">
              <Twitter className="h-4 w-4 text-blue-500" />
              <div className="text-xs">
                <p className="font-semibold">@OurSchool</p>
                <p>Congrats to our science team for winning the regional competition!</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md">
              <Facebook className="h-4 w-4 text-blue-700" />
              <div className="text-xs">
                <p className="font-semibold">Our School</p>
                <p>Check out photos from last week's field trip to the museum!</p>
              </div>
            </div>
          </div>
        )}
        {widget.type === 'links' && (
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                <FileText className="h-4 w-4" />
                Student Handbook
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                <FileSearch className="h-4 w-4" />
                Staff Directory
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                <LinkIcon className="h-4 w-4" />
                Learning Resources
              </Link>
            </li>
          </ul>
        )}
      </CardContent>
      {editMode && !isEditing && (
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full">
            Configure Widget
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}