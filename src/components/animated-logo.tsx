"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedLogoProps {
  width?: number;
  height?: number;
}

export function AnimatedLogo({ width = 40, height = 40 }: AnimatedLogoProps) {
  return (
    <motion.div
      className="relative"
      style={{ width, height }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute inset-0 rounded-md bg-gradient-to-tr from-blue-500 to-indigo-600"
        initial={{ rotate: -10 }}
        animate={{ rotate: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      />
      <motion.div
        className="absolute inset-0 flex items-center justify-center text-white font-bold"
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <span className="text-sm">S</span>
      </motion.div>
    </motion.div>
  );
}