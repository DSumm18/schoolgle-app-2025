"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Cloud,
  CloudRain,
  CloudSnow,
  CloudSun,
  Cloudy,
  Home,
  MessageSquare,
  Moon,
  SunMedium,
  Trash,
  ChevronRight,
  Bell,
  Settings,
  Edit,
  Search,
  Plus,
  MonitorSmartphone,
  AlertTriangle,
  CloudLightning
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

// Placeholder component for color picker until we install a proper color picker
function ColorPicker({ value, onChange }) {
  // Preset colors
  const presetColors = [
    "#3B82F6", // Blue
    "#10B981", // Emerald
    "#6366F1", // Indigo
    "#8B5CF6", // Violet
    "#EC4899", // Pink
    "#EF4444", // Red
    "#F59E0B", // Amber
    "#84CC16", // Lime
  ];

  return (
    <div className="space-y-2">
      <div className="flex gap-2 flex-wrap">
        {presetColors.map(color => (
          <button
            key={color}
            type="button"
            className={`w-6 h-6 rounded-full ${value === color ? 'ring-2 ring-offset-2' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => onChange(color)}
          />
        ))}
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 p-0 border-0 rounded-md"
        />
        <span className="text-xs text-muted-foreground">{value}</span>
      </div>
    </div>
  );
}

// Placeholder simple widget card for now
function WidgetCard({ widget, editMode = false, onEdit, onDelete }) {
  return (
    <Card className="relative">
      {editMode && (
        <div className="absolute top-2 right-2 flex gap-1 z-10">
          {onEdit && (
            <Button variant="ghost" size="icon" onClick={onEdit}>
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
          )}
          {onDelete && (
            <Button variant="ghost" size="icon" className="text-red-500" onClick={onDelete}>
              <Trash className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          )}
        </div>
      )}
      
      <CardHeader>
        <CardTitle>{widget.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {widget.type === 'text' && (
          <div className="prose prose-sm dark:prose-invert">
            <p>{widget.content}</p>
          </div>
        )}
        {widget.type === 'image' && (
          <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
            <MonitorSmartphone className="h-10 w-10 text-muted-foreground" />
            <span className="sr-only">Image placeholder</span>
          </div>
        )}
        {widget.type === 'video' && (
          <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
            <MonitorSmartphone className="h-10 w-10 text-muted-foreground" />
            <span className="sr-only">Video placeholder</span>
          </div>
        )}
        {widget.type === 'calendar' && (
          <div className="p-4 border rounded-md">
            <p className="text-center text-muted-foreground">Calendar view coming soon</p>
          </div>
        )}
        {widget.type === 'social' && (
          <div className="flex flex-col gap-2">
            <div className="p-2 border rounded-md flex items-center gap-2">
              <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <span>Social feed placeholder</span>
            </div>
          </div>
        )}
        {widget.type === 'links' && (
          <div className="flex flex-col gap-2">
            <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">School Website</a>
            <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Parent Portal</a>
            <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Calendar</a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Simple widget grid component
function WidgetGrid({ widgets = [], editMode = false }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {widgets.map((widget) => (
        <WidgetCard 
          key={widget.id} 
          widget={widget} 
          editMode={editMode}
          onEdit={() => alert(`Edit widget: ${widget.title}`)}
          onDelete={() => alert(`Delete widget: ${widget.title}`)}
        />
      ))}
      
      {editMode && (
        <Card className="border-dashed flex flex-col items-center justify-center p-6 h-full">
          <Plus className="h-8 w-8 mb-2 text-muted-foreground" />
          <p className="text-muted-foreground">Add New Widget</p>
        </Card>
      )}
    </div>
  );
}

// Weather icons
const weatherIcons = {
  sunny: SunMedium,
  cloudy: Cloudy,
  partlyCloudy: CloudSun,
  rainy: CloudRain,
  stormy: CloudLightning,
  snowy: CloudSnow,
  default: Cloud
};

export default function SchoolIntranetPage() {
  const [time, setTime] = useState(new Date());
  const [editMode, setEditMode] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [primaryColor, setPrimaryColor] = useState("#3B82F6");
  const [secondaryColor, setSecondaryColor] = useState("#10B981");
  const [logoUrl, setLogoUrl] = useState("");
  const [weather, setWeather] = useState({
    temperature: 18,
    condition: 'partlyCloudy',
    location: 'London, UK'
  });
  
  // Demo widgets
  const widgets = [
    { id: "widget-1", type: 'text', title: 'Principal\'s Message', content: 'Welcome to our school! We are committed to providing an excellent education for all students. Remember that parent-teacher conferences are scheduled for next week.' },
    { id: "widget-2", type: 'calendar', title: 'Upcoming Events', content: '' },
    { id: "widget-3", type: 'image', title: 'School Gallery', content: '' },
    { id: "widget-4", type: 'video', title: 'School Highlights', content: '' },
    { id: "widget-5", type: 'links', title: 'Quick Links', content: '' },
    { id: "widget-6", type: 'social', title: 'Social Feed', content: '' },
  ];
  
  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = time.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };
  
  // Get weather icon component
  const WeatherIcon = weatherIcons[weather.condition] || weatherIcons.default;
  
  // Determine if it's day or night
  const isDaytime = () => {
    const hour = time.getHours();
    return hour >= 6 && hour < 20;
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link href="/modules" className="hover:text-primary">Modules</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-foreground">School Intranet</span>
      </div>
      
      {/* Notification banner */}
      <div className="mb-6 p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 text-sm rounded-lg flex items-center gap-2">
        <AlertTriangle className="h-4 w-4" />
        <span>This is a preview version. Drag-and-drop widget functionality coming soon!</span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Header with weather and time */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{getGreeting()}</h1>
              <p className="text-muted-foreground">
                {time.toLocaleDateString('en-GB', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              {/* Weather widget */}
              <div className="hidden sm:flex items-center gap-2">
                <div className="h-10 w-10 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      y: [0, -2, 0, 2, 0],
                      rotate: weather.condition === 'stormy' ? [-5, 5, -5] : 0
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: weather.condition === 'stormy' ? 1.5 : 3,
                      ease: "easeInOut"
                    }}
                  >
                    <WeatherIcon className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                  </motion.div>
                </div>
                <div>
                  <div className="font-medium">{weather.temperature}°C</div>
                  <div className="text-xs text-muted-foreground">{weather.location}</div>
                </div>
              </div>
              
              {/* Time-appropriate icon */}
              <div className="h-10 w-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                {isDaytime() ? (
                  <SunMedium className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                ) : (
                  <Moon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                )}
              </div>
            </div>
          </div>
          
          {/* Breaking news ticker */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-red-600">BREAKING</Badge>
                <CardTitle className="text-base">Important Announcements</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden whitespace-nowrap">
                <motion.div
                  animate={{ x: ["100%", "-100%"] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 15,
                    ease: "linear"
                  }}
                  className="text-sm"
                >
                  School closed this Friday for staff training day • Year 9 trip to Science Museum next Tuesday • Uniform donations needed for the second-hand sale • Congratulations to the U16 football team on their regional championship win
                </motion.div>
              </div>
            </CardContent>
          </Card>
          
          {/* Tabs */}
          <Tabs defaultValue="home">
            <TabsList>
              <TabsTrigger value="home">Home</TabsTrigger>
              <TabsTrigger value="announcements">Announcements</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
            </TabsList>
            <TabsContent value="home" className="space-y-6 pt-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">My School Dashboard</h2>
                <Button 
                  variant={editMode ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setEditMode(!editMode)}
                >
                  {editMode ? "Save Layout" : "Customize Dashboard"}
                </Button>
              </div>
              
              <WidgetGrid widgets={widgets} editMode={editMode} />
            </TabsContent>
            
            <TabsContent value="announcements">
              <div className="pt-4 text-center text-muted-foreground">
                Announcements will be displayed here.
              </div>
            </TabsContent>
            
            <TabsContent value="calendar">
              <div className="pt-4 text-center text-muted-foreground">
                School calendar will be displayed here.
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          {/* School info card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>My School</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="w-20 h-20 mx-auto bg-muted rounded-md flex items-center justify-center">
                {logoUrl ? (
                  <img 
                    src={logoUrl} 
                    alt="School logo" 
                    className="max-w-full max-h-full object-contain" 
                  />
                ) : (
                  <Home className="h-10 w-10 text-muted-foreground" />
                )}
              </div>
              
              <div className="text-center">
                <h3 className="font-medium">Schoolgle Academy</h3>
                <p className="text-sm text-muted-foreground">Excellence in Education</p>
              </div>
              
              <div className="flex justify-between items-center">
                <Button variant="outline" size="sm" className="w-full">
                  School Website
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Setting card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Intranet Settings
              </CardTitle>
              <CardDescription>
                Customize your school intranet
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Logo upload */}
              <div className="space-y-2">
                <Label htmlFor="logo-upload">School Logo</Label>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="w-full">
                    Upload Logo
                  </Button>
                </div>
              </div>
              
              {/* Primary color */}
              <div className="space-y-2">
                <Label>Primary Color</Label>
                <ColorPicker 
                  value={primaryColor}
                  onChange={setPrimaryColor}
                />
              </div>
              
              {/* Secondary color */}
              <div className="space-y-2">
                <Label>Secondary Color</Label>
                <ColorPicker 
                  value={secondaryColor}
                  onChange={setSecondaryColor}
                />
              </div>
              
              <Button className="w-full mt-2">
                Save Settings
              </Button>
            </CardContent>
          </Card>
          
          {/* Notifications */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notifications
                </CardTitle>
                {notificationCount > 0 && (
                  <Badge>{notificationCount}</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {notificationCount === 0 ? (
                <div className="text-center text-muted-foreground py-4">
                  <Bell className="h-10 w-10 mx-auto mb-2 opacity-20" />
                  <p>No new notifications</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="font-medium">Staff Meeting</div>
                    <div className="text-sm text-muted-foreground">Tomorrow at 3:30 PM in the Main Hall</div>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="font-medium">New Resource Available</div>
                    <div className="text-sm text-muted-foreground">Teaching guide for the new curriculum</div>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="font-medium">Fire Drill</div>
                    <div className="text-sm text-muted-foreground">Scheduled for Friday at 11:15 AM</div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full text-xs">
                View All Notifications
              </Button>
            </CardFooter>
          </Card>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search school resources..." 
              className="pl-9"
            />
          </div>
        </div>
      </div>
    </div>
  );
}