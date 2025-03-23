"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { WidgetGrid, Widget } from '@/components/intranet/widget-grid';

export default function SchoolIntranetPage() {
  const [editMode, setEditMode] = useState(false);
  const [widgets, setWidgets] = useState<Widget[]>([
    {
      id: 'weather',
      title: 'Weather Forecast',
      width: 'medium',
      content: <WeatherWidget />,
    },
    {
      id: 'welcome',
      title: 'Welcome',
      width: 'small',
      content: <WelcomeWidget />,
    },
    {
      id: 'news',
      title: 'Breaking News',
      width: 'large',
      content: <NewsWidget />,
    },
    {
      id: 'calendar',
      title: 'School Calendar',
      width: 'medium',
      height: 'medium',
      content: <CalendarWidget />,
    },
    {
      id: 'notices',
      title: 'Important Notices',
      width: 'medium',
      content: <NoticesWidget />,
    },
    {
      id: 'lunch',
      title: 'Lunch Menu',
      width: 'small',
      content: <LunchMenuWidget />,
    },
  ]);

  const handleWidgetsChange = (newWidgets: Widget[]) => {
    setWidgets(newWidgets);
    // Here you would typically save this to the database
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">School Intranet</h1>
        <Button
          onClick={() => setEditMode(!editMode)}
          variant={editMode ? "secondary" : "default"}
        >
          {editMode ? "Done Editing" : "Customize Layout"}
        </Button>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <WidgetGrid 
            widgets={widgets} 
            onWidgetsChange={handleWidgetsChange}
            editable={editMode}
          />
        </TabsContent>

        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <p>View and manage school resources here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff">
          <Card>
            <CardHeader>
              <CardTitle>Staff Portal</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Staff-specific information and tools.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Student Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Student-specific information and resources.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Widget Components
function WeatherWidget() {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">21°C</h3>
          <p className="text-sm text-muted-foreground">Partly Cloudy</p>
        </div>
        <div className="text-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17.5 17.5 16 19" />
            <path d="M6.5 17.5 8 19" />
            <path d="M8 10h8" />
            <path d="M12 10v8" />
            <path d="M12 2v4" />
            <path d="m4.9 4.9 2.8 2.8" />
            <path d="m16.3 4.9-2.8 2.8" />
            <path d="M20 12h-4" />
            <path d="M4 12h4" />
          </svg>
        </div>
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <div className="text-center">
          <div>Mon</div>
          <div>19°</div>
        </div>
        <div className="text-center">
          <div>Tue</div>
          <div>22°</div>
        </div>
        <div className="text-center">
          <div>Wed</div>
          <div>25°</div>
        </div>
        <div className="text-center">
          <div>Thu</div>
          <div>20°</div>
        </div>
        <div className="text-center">
          <div>Fri</div>
          <div>18°</div>
        </div>
      </div>
    </div>
  );
}

function WelcomeWidget() {
  // Get time of day for greeting
  const hour = new Date().getHours();
  let greeting = 'Good morning';
  if (hour >= 12 && hour < 18) {
    greeting = 'Good afternoon';
  } else if (hour >= 18) {
    greeting = 'Good evening';
  }

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium">{greeting}</h3>
      <p className="text-sm text-muted-foreground">
        Welcome to your school intranet. Here you'll find the latest updates and resources.
      </p>
    </div>
  );
}

function NewsWidget() {
  return (
    <div className="space-y-3">
      <div className="relative bg-primary/10 p-2 rounded overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          <span className="text-sm font-medium">
            BREAKING NEWS: School sports day scheduled for next Friday • 
            New library resources now available • 
            Parent-teacher conferences next Wednesday •
            School trip forms due by Monday
          </span>
        </div>
      </div>
      <div className="space-y-2">
        {[
          { title: "School Sports Day Announcement", date: "2 hours ago" },
          { title: "New Online Resources Available", date: "Yesterday" },
          { title: "Upcoming School Trip Information", date: "2 days ago" },
          { title: "Changes to School Timetable", date: "1 week ago" },
        ].map((item, i) => (
          <div key={i} className="flex justify-between items-center py-1 border-b last:border-0">
            <h4 className="text-sm font-medium">{item.title}</h4>
            <span className="text-xs text-muted-foreground">{item.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CalendarWidget() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date().getDate();
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  
  // Dummy calendar data - would be replaced with real events
  const events = [
    { day: today, title: 'Staff Meeting', time: '15:00' },
    { day: today + 2, title: 'Assembly', time: '10:00' },
    { day: today + 4, title: 'Sports Day', time: 'All day' },
  ];

  return (
    <div className="space-y-3">
      <div className="text-center">
        <h3 className="font-medium">{currentMonth}</h3>
      </div>
      <div className="grid grid-cols-7 text-center text-xs">
        {days.map(day => (
          <div key={day} className="py-1">{day}</div>
        ))}
        {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
          <div
            key={day}
            className={`p-1 aspect-square flex items-center justify-center ${
              day === today ? 'bg-primary text-primary-foreground rounded-full' : ''
            } ${day > 31 ? 'text-muted-foreground' : ''}`}
          >
            {day <= 31 ? day : ''}
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Upcoming Events</h4>
        {events.map((event, i) => (
          <div key={i} className="flex justify-between text-xs">
            <span>{event.title}</span>
            <span className="text-muted-foreground">{event.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function NoticesWidget() {
  return (
    <div className="space-y-2">
      <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-100 p-3 rounded-md text-sm">
        <p className="font-medium">Important: School Closure</p>
        <p className="text-xs mt-1">
          The school will be closed on Monday, June 5th due to a scheduled maintenance of the heating system.
        </p>
      </div>
      <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-100 p-3 rounded-md text-sm">
        <p className="font-medium">Reminder: Permission Slips</p>
        <p className="text-xs mt-1">
          Please return all field trip permission slips by Wednesday this week.
        </p>
      </div>
    </div>
  );
}

function LunchMenuWidget() {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Today's Lunch Menu</h3>
      <ul className="space-y-1 text-xs">
        <li className="flex justify-between">
          <span>Main Course</span>
          <span className="text-muted-foreground">Pasta Bolognese</span>
        </li>
        <li className="flex justify-between">
          <span>Vegetarian</span>
          <span className="text-muted-foreground">Vegetable Lasagna</span>
        </li>
        <li className="flex justify-between">
          <span>Side</span>
          <span className="text-muted-foreground">Garlic Bread, Salad</span>
        </li>
        <li className="flex justify-between">
          <span>Dessert</span>
          <span className="text-muted-foreground">Apple Crumble</span>
        </li>
      </ul>
    </div>
  );
}