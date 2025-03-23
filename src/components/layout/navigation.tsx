'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { AnimatedLogo } from '@/components/ui/animated-logo';
import { motion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Animation variants
  const navItemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    hover: { 
      scale: 1.05,
      color: "var(--primary)",
      transition: { duration: 0.2 }
    }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  return (
    <nav className="bg-background border-b dark:border-gray-800 sticky top-0 z-10 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <AnimatedLogo size="md" />
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <motion.div 
                initial="hidden" 
                animate="visible" 
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                className="flex space-x-4"
              >
                {[
                  { href: "/", label: "Home" },
                  { href: "/modules", label: "Modules" },
                  { href: "/about", label: "About" },
                  { href: "/contact", label: "Contact" }
                ].map((item, index) => (
                  <motion.div key={index} variants={navItemVariants} whileHover="hover">
                    <Link 
                      href={item.href} 
                      className="border-transparent text-foreground hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-2">
            <motion.div whileHover={{ scale: 1.05 }}>
              <ThemeToggle />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link href="/dashboard">
                <Button variant="outline" size="sm" className="mr-2">
                  Dashboard
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link href="/auth/login">
                <Button size="sm">
                  Sign In
                </Button>
              </Link>
            </motion.div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none ml-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div 
        className={`sm:hidden overflow-hidden`}
        variants={mobileMenuVariants}
        initial="hidden"
        animate={isMenuOpen ? "visible" : "hidden"}
      >
        <div className="pt-2 pb-3 space-y-1">
          {[
            { href: "/", label: "Home" },
            { href: "/modules", label: "Modules" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
            { href: "/dashboard", label: "Dashboard" }
          ].map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-foreground hover:bg-muted hover:border-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4 px-3">
            <Link href="/auth/login">
              <Button className="w-full">Sign In</Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </nav>
  );
}