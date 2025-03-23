# Schoolgle App 2025

A modern and clean school management application built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## Features

- **Modern UI Components**: Reusable components including Cards, Buttons, Forms, and more
- **Responsive Design**: Works on all devices with mobile-first approach 
- **Dark/Light Mode**: Built-in theme support with persistent preferences
- **Animated Interface**: Smooth page transitions and interactive elements
- **Google-Inspired Design**: Multi-colored, animated logo and vibrant UI elements
- **Dashboard**: Central overview of activities, risk assessments, and issues
- **Module System**:
  - Activity Management
  - Risk Assessment
  - Issue Tracker
- **Authentication**: Simple login/registration flow

## Visual Enhancements

- **Animated Logo**: Colorful, Google-inspired logo with interactive hover effects
- **Smooth Page Transitions**: Professional transitions between pages
- **Theme Toggle**: Animated theme switching between light and dark modes
- **Interactive Buttons**: Custom animated buttons with hover effects
- **Animated Module Cards**: Interactive cards with gradient backgrounds
- **Responsive Navigation**: Smooth animations in desktop and mobile views

## Modules

### Activity Management
Create, track and manage activities in educational institutions. The module includes:
- Activity listing with filtering
- Activity details view
- Risk level indicators
- Participant tracking

### Risk Assessment
Comprehensive risk assessment management for all activities:
- Risk assessment forms
- Risk level classification
- Approval workflow
- Connection to activities

### Issue Tracker
Track and resolve issues across your organization:
- Issue categorization
- Priority-based triage
- Assignment workflow
- Resolution tracking

## Tech Stack

- **Next.js 15**: The React framework for web applications
- **React 19**: Frontend UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **CVA**: Class Variance Authority for component variants
- **Framer Motion**: Animation library for React
- **Next Themes**: Theme management for Next.js

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/DSumm18/schoolgle-app-2025.git
cd schoolgle-app-2025
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Project Structure

```
schoolgle-app-2025/
├── src/                       # Source code
│   ├── app/                   # Next.js app directory
│   │   ├── dashboard/         # Dashboard pages
│   │   ├── modules/           # Module-specific pages
│   │   ├── auth/              # Authentication pages
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # Reusable components
│   │   ├── layout/            # Layout components
│   │   ├── ui/                # UI components
│   │   │   ├── animated-logo.tsx     # Animated Google-style logo
│   │   │   ├── animated-button.tsx   # Interactive button component
│   │   │   ├── module-card.tsx       # Animated module card
│   │   │   ├── page-transition.tsx   # Smooth page transitions
│   │   │   └── theme-toggle.tsx      # Animated theme switcher
│   │   ├── dashboard/         # Dashboard-specific components
│   │   ├── forms/             # Form components
│   │   └── auth/              # Authentication components
│   └── lib/                   # Utility functions
├── public/                    # Public assets
├── next.config.js             # Next.js configuration
├── package.json               # Dependencies and scripts
└── vercel.json                # Vercel deployment configuration
```

## Available Routes

- `/` - Home page
- `/about` - About page
- `/contact` - Contact page
- `/modules` - Modules overview
- `/modules/activity-management` - Activity management module
- `/modules/risk-assessment` - Risk assessment module
- `/modules/issue-tracker` - Issue tracker module
- `/dashboard` - Dashboard overview
- `/auth/login` - Login page

## Deployment

The application is configured for deployment on Vercel with automatic deployments disabled to prevent unnecessary credit usage. To deploy:

1. Import your GitHub repository on Vercel
2. Configure environment variables if needed
3. Deploy the application

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspired by modern educational applications and Google's material design
- Built as a clean alternative to previous versions