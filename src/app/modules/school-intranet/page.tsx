"use client"

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { 
  Settings, Upload, Image, FileText, Video, Link as LinkIcon, 
  SunMedium, CloudRain, CloudSnow, Cloud, Twitter, Facebook,
  Palette, Calendar, Clock, AlertCircle, FileSearch, Edit
} from 'lucide-react';
import Link from 'next/link';

interface AnimatedWeatherIconProps {
  type: 'sunny' | 'cloudy' | 'rainy' | 'snowy';
  className?: string;
}

const AnimatedWeatherIcon: React.FC<AnimatedWeatherIconProps> = ({ type, className = '' }) => {
  const variants = {
    sunny: {
      rotate: [0, 45, 0],
      scale: [1, 1.1, 1],
      transition: { 
        rotate: { repeat: Infinity, duration: 5 },
        scale: { repeat: Infinity, duration: 2.5 }
      }
    },
    cloudy: {
      x: [0, 5, 0],
      transition: { repeat: Infinity, duration: 3 }
    },
    rainy: {
      y: [0, 5, 0],
      transition: { repeat: Infinity, duration: 1.5 }
    },
    snowy: {
      rotate: [0, 5, -5, 0],
      y: [0, 3, 0],
      transition: { 
        rotate: { repeat: Infinity, duration: 3 },
        y: { repeat: Infinity, duration: 2 }
      }
    }
  };

  return (
    <motion.div 
      variants={variants} 
      animate={type}
      className={className}
    >
      {type === 'sunny' && <SunMedium className="w-12 h-12 text-yellow-400" />}
      {type === 'cloudy' && <Cloud className="w-12 h-12 text-gray-400" />}
      {type === 'rainy' && <CloudRain className="w-12 h-12 text-blue-400" />}
      {type === 'snowy' && <CloudSnow className="w-12 h-12 text-blue-200" />}
    </motion.div>
  );
};

const weatherForecast = [
  { day: 'Monday', type: 'sunny' as const, temp: 22 },
  { day: 'Tuesday', type: 'cloudy' as const, temp: 18 },
  { day: 'Wednesday', type: 'rainy' as const, temp: 15 },
  { day: 'Thursday', type: 'rainy' as const, temp: 14 },
  { day: 'Friday', type: 'snowy' as const, temp: 1 },
];

// Simple widget implementation without dnd-kit dependency
const WidgetCard = ({ type, title, content, editMode }: { 
  type: string, 
  title: string, 
  content: string, 
  editMode: boolean 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [widgetContent, setWidgetContent] = useState(content);

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{title}</CardTitle>
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
          {type === 'video' && 'Upload or embed a video'}
          {type === 'image' && 'Upload or select images'}
          {type === 'text' && 'Share important information'}
          {type === 'calendar' && 'Display upcoming events'}
          {type === 'social' && 'Connect social media feeds'}
          {type === 'links' && 'Add quick access links'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {type === 'video' && (
          <div className="aspect-video bg-slate-200 dark:bg-slate-800 rounded-md flex items-center justify-center">
            {editMode ? (
              <Button variant="outline" className="flex gap-2">
                <Upload className="h-4 w-4" />
                Upload Video
              </Button>
            ) : (
              <Video className="h-12 w-12 text-muted-foreground" />
            )}
          </div>
        )}
        {type === 'image' && (
          <div className="aspect-video bg-slate-200 dark:bg-slate-800 rounded-md flex items-center justify-center">
            {editMode ? (
              <Button variant="outline" className="flex gap-2">
                <Image className="h-4 w-4" />
                Upload Images
              </Button>
            ) : (
              <Image className="h-12 w-12 text-muted-foreground" />
            )}
          </div>
        )}
        {type === 'text' && (
          <>
            {isEditing ? (
              <div className="space-y-2">
                <Textarea 
                  value={widgetContent}
                  onChange={(e) => setWidgetContent(e.target.value)}
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
              <p className="text-sm text-muted-foreground">{widgetContent}</p>
            )}
          </>
        )}
        {type === 'calendar' && (
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
        {type === 'social' && (
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
        {type === 'links' && (
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
};

const WidgetGrid = ({ editMode }: { editMode: boolean }) => {
  const widgets = [
    { id: 1, type: 'video', title: 'School Highlights', content: 'https://example.com/school-video.mp4' },
    { id: 2, type: 'image', title: 'School Gallery', content: '' },
    { id: 3, type: 'text', title: 'Principal\'s Message', content: 'Welcome to our school! We are committed to providing an excellent education for all students...' },
    { id: 4, type: 'calendar', title: 'Upcoming Events', content: '' },
    { id: 5, type: 'social', title: 'Social Media', content: '' },
    { id: 6, type: 'links', title: 'Quick Links', content: '' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {widgets.map((widget) => (
        <WidgetCard 
          key={widget.id}
          type={widget.type} 
          title={widget.title} 
          content={widget.content} 
          editMode={editMode} 
        />
      ))}
      {editMode && (
        <div className="flex justify-center mt-6 col-span-full">
          <Button variant="outline" className="w-full max-w-xs mx-auto">
            Add New Widget
          </Button>
        </div>
      )}
    </div>
  );
};

// Color presets for quick selection
const colorPresets = [
  { primary: '#3B82F6', secondary: '#10B981' }, // Blue & Green
  { primary: '#F59E0B', secondary: '#EF4444' }, // Amber & Red
  { primary: '#8B5CF6', secondary: '#EC4899' }, // Purple & Pink
  { primary: '#06B6D4', secondary: '#6366F1' }, // Cyan & Indigo
  { primary: '#047857', secondary: '#4338CA' }, // Emerald & Indigo
  { primary: '#DC2626', secondary: '#2563EB' }, // Red & Blue
];

export default function SchoolIntranetPage() {
  const [activeTab, setActiveTab] = useState('preview');
  const [primaryColor, setPrimaryColor] = useState('#3B82F6');
  const [secondaryColor, setSecondaryColor] = useState('#10B981');
  const [schoolName, setSchoolName] = useState('Your School Name');
  const [editMode, setEditMode] = useState(false);
  
  // Simulate current user
  const currentUser = {
    name: 'David',
    role: 'Administrator'
  };

  // Get current time
  const now = new Date();
  const hours = now.getHours();
  let greeting = "Good morning";
  if (hours >= 12 && hours < 18) {
    greeting = "Good afternoon";
  } else if (hours >= 18) {
    greeting = "Good evening";
  }

  // Breaking news ticker items
  const breakingNews = [
    "Early dismissal on Friday for staff development",
    "Basketball team advances to state finals!",
    "Spring concert tickets now available in the office",
    "New lunch menu starts next week"
  ];

  // Apply color preset
  const applyColorPreset = (preset: { primary: string, secondary: string }) => {
    setPrimaryColor(preset.primary);
    setSecondaryColor(preset.secondary);
  };

  // Handle file uploads (placeholder)
  const handleFileUpload = (name: string) => {
    console.log(`Uploading ${name}...`);
    // This would be replaced with actual upload code
    setTimeout(() => {
      console.log('Upload complete!');
    }, 2000);
  };

  // Display message about developing drag and drop capability
  const showDragAndDropMessage = () => {
    alert("Drag and drop functionality will be implemented once the required packages are installed. This placeholder provides the basic UI structure.");
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">School Intranet Module</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Create a customized intranet homepage for your school with widgets, social feeds, and personalized content.
        </p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="widgets">Widgets</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview" className="border rounded-lg p-6 mt-4">
            <div 
              className="rounded-lg overflow-hidden shadow-xl" 
              style={{ 
                backgroundColor: '#ffffff',
                backgroundImage: `linear-gradient(135deg, ${primaryColor}20 0%, ${secondaryColor}20 100%)` 
              }}
            >
              {/* School Intranet Header */}
              <div 
                className="px-4 py-3 text-white flex items-center justify-between"
                style={{ backgroundColor: primaryColor }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <div className="text-xl font-bold" style={{ color: primaryColor }}>
                      {schoolName.split(' ').map(word => word[0]).join('')}
                    </div>
                  </div>
                  <h2 className="text-xl font-bold">{schoolName}</h2>
                </div>
                
                <div className="flex items-center gap-4">
                  <Clock className="h-5 w-5" />
                  <span>{now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  {editMode && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-white border-white hover:bg-white/20"
                      onClick={() => setEditMode(false)}
                    >
                      Exit Edit Mode
                    </Button>
                  )}
                  {!editMode && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-white border-white hover:bg-white/20"
                      onClick={() => setEditMode(true)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Edit Page
                    </Button>
                  )}
                </div>
              </div>

              {/* User Welcome & Weather */}
              <div className="bg-white dark:bg-slate-900 p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <h2 className="text-2xl font-bold mb-2">
                    {greeting}, {currentUser.name}
                  </h2>
                  <p className="text-muted-foreground">
                    Today is {now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg p-3 shadow-inner">
                  <h3 className="text-sm font-semibold mb-2">5-Day Weather Forecast</h3>
                  <div className="flex justify-between">
                    {weatherForecast.map((day, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <span className="text-xs">{day.day.slice(0, 3)}</span>
                        <AnimatedWeatherIcon type={day.type} />
                        <span className="text-xs font-medium">{day.temp}°C</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Breaking News Ticker */}
              <div 
                className="py-2 px-4 overflow-hidden"
                style={{ backgroundColor: secondaryColor }}
              >
                <div className="flex items-center gap-2 text-white">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <div className="flex overflow-hidden whitespace-nowrap">
                    <motion.div
                      animate={{
                        x: [0, -2000],
                      }}
                      transition={{
                        x: {
                          repeat: Infinity,
                          repeatType: "loop",
                          duration: 20,
                          ease: "linear",
                        },
                      }}
                      className="flex gap-8"
                    >
                      {breakingNews.map((item, i) => (
                        <span key={i} className="font-medium">
                          {item} • 
                        </span>
                      ))}
                      {breakingNews.map((item, i) => (
                        <span key={`repeat-${i}`} className="font-medium">
                          {item} • 
                        </span>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Widget Area */}
              <div className="bg-slate-50 dark:bg-slate-800 p-4">
                <WidgetGrid editMode={editMode} />
              </div>

              {/* Footer */}
              <div 
                className="px-4 py-3 text-white text-sm"
                style={{ backgroundColor: primaryColor }}
              >
                <div className="flex justify-between items-center">
                  <span>© 2025 {schoolName}</span>
                  <div className="flex gap-4">
                    <Link href="#" className="text-white hover:underline">Privacy Policy</Link>
                    <Link href="#" className="text-white hover:underline">Contact</Link>
                    <Link href="#" className="text-white hover:underline">Sitemap</Link>
                  </div>
                </div>
              </div>
            </div>
            
            {editMode && (
              <div className="mt-4 flex justify-end">
                <Button>Save Layout</Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="settings" className="border rounded-lg p-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>School Information</CardTitle>
                  <CardDescription>
                    Add your school's basic information for the intranet
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="schoolName">School Name</Label>
                    <Input 
                      id="schoolName" 
                      value={schoolName} 
                      onChange={(e) => setSchoolName(e.target.value)} 
                      placeholder="Enter your school name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="schoolLogo">School Logo</Label>
                    <div className="mt-1 flex items-center">
                      <Button 
                        variant="outline" 
                        className="flex gap-2"
                        onClick={() => handleFileUpload('logo')}
                      >
                        <Upload className="h-4 w-4" />
                        Upload Logo
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="schoolAddress">School Address</Label>
                    <Textarea 
                      id="schoolAddress" 
                      placeholder="Enter your school address"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Theme Settings</CardTitle>
                  <CardDescription>
                    Customize the appearance of your school intranet
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <div className="flex gap-2">
                        <Input 
                          id="primaryColor" 
                          value={primaryColor} 
                          onChange={(e) => setPrimaryColor(e.target.value)} 
                          className="flex-1"
                        />
                        <div className="relative flex items-center">
                          <Input 
                            type="color" 
                            value={primaryColor}
                            onChange={(e) => setPrimaryColor(e.target.value)}
                            className="w-10 h-10 p-1 cursor-pointer"
                          />
                          <div 
                            className="absolute top-0 right-0 bottom-0 left-0 opacity-0 cursor-pointer"
                            style={{ background: primaryColor }}
                          ></div>
                        </div>
                      </div>
                      <div 
                        className="h-10 rounded-md border" 
                        style={{ backgroundColor: primaryColor }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <div className="flex gap-2">
                        <Input 
                          id="secondaryColor" 
                          value={secondaryColor} 
                          onChange={(e) => setSecondaryColor(e.target.value)} 
                          className="flex-1"
                        />
                        <div className="relative flex items-center">
                          <Input 
                            type="color" 
                            value={secondaryColor}
                            onChange={(e) => setSecondaryColor(e.target.value)}
                            className="w-10 h-10 p-1 cursor-pointer"
                          />
                          <div 
                            className="absolute top-0 right-0 bottom-0 left-0 opacity-0 cursor-pointer"
                            style={{ background: secondaryColor }}
                          ></div>
                        </div>
                      </div>
                      <div 
                        className="h-10 rounded-md border" 
                        style={{ backgroundColor: secondaryColor }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Color Presets</Label>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {colorPresets.map((preset, index) => (
                        <Button 
                          key={index} 
                          variant="outline" 
                          className="h-12 p-1"
                          onClick={() => applyColorPreset(preset)}
                        >
                          <div className="flex-1 h-full rounded overflow-hidden flex">
                            <div className="flex-1" style={{ backgroundColor: preset.primary }}></div>
                            <div className="flex-1" style={{ backgroundColor: preset.secondary }}></div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Social Media Integration</CardTitle>
                  <CardDescription>
                    Connect your school's social media accounts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="twitterLink">Twitter URL</Label>
                      <div className="flex mt-1 gap-2">
                        <Twitter className="h-5 w-5 text-blue-400" />
                        <Input id="twitterLink" placeholder="https://twitter.com/yourschool" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="facebookLink">Facebook URL</Label>
                      <div className="flex mt-1 gap-2">
                        <Facebook className="h-5 w-5 text-blue-600" />
                        <Input id="facebookLink" placeholder="https://facebook.com/yourschool" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Settings</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="widgets" className="border rounded-lg p-6 mt-4">
            <div className="space-y-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200 rounded">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Drag and Drop Coming Soon
                </h3>
                <p className="mt-2">
                  The drag and drop functionality for widgets will be available once the required packages are installed. 
                  This preview shows the basic layout and appearance.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Widgets</CardTitle>
                    <CardDescription>
                      Add widgets to your intranet page
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full flex justify-start gap-2">
                        <Video className="h-4 w-4" />
                        Video Player
                      </Button>
                      <Button variant="outline" className="w-full flex justify-start gap-2">
                        <Image className="h-4 w-4" />
                        Image Gallery
                      </Button>
                      <Button variant="outline" className="w-full flex justify-start gap-2">
                        <FileText className="h-4 w-4" />
                        Text Block
                      </Button>
                      <Button variant="outline" className="w-full flex justify-start gap-2">
                        <Calendar className="h-4 w-4" />
                        Calendar
                      </Button>
                      <Button variant="outline" className="w-full flex justify-start gap-2">
                        <Twitter className="h-4 w-4" />
                        Social Feed
                      </Button>
                      <Button variant="outline" className="w-full flex justify-start gap-2">
                        <LinkIcon className="h-4 w-4" />
                        Quick Links
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Widget Layout</CardTitle>
                    <CardDescription>
                      Customize your widget layout
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <WidgetGrid editMode={true} />
                  </CardContent>
                  <CardFooter>
                    <Button onClick={showDragAndDropMessage}>Save Layout</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}