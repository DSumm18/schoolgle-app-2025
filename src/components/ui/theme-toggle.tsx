"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative w-9 h-9 rounded-full"
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={theme === "dark" ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
      >
        {theme === "light" ? (
          <Sun className="h-5 w-5 text-orange-400" />
        ) : (
          <Moon className="h-5 w-5 text-blue-300" />
        )}
      </motion.div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}