"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type ToastProps = {
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive" | "success" | "warning" | "info"
  duration?: number
  onClose?: () => void
}

const Toast = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & ToastProps
>(({ className, title, description, action, variant = "default", onClose, ...props }, ref) => {
  const variantClasses = {
    default: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700",
    destructive: "bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800",
    success: "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800",
    warning: "bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800",
    info: "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "pointer-events-auto relative rounded-lg border shadow-lg",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      <div className="p-4 flex items-start gap-4">
        <div className="flex-1">
          {title && <div className="font-semibold">{title}</div>}
          {description && <div className="text-sm opacity-90 mt-1">{description}</div>}
        </div>
        {action && <div>{action}</div>}
        {onClose && (
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 rounded-full p-1"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
})
Toast.displayName = "Toast"

export interface ToastProviderProps {
  children: React.ReactNode
}

interface ToastContextValue {
  toast: (props: ToastProps) => void
  dismiss: (id: string) => void
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<(ToastProps & { id: string })[]>([])

  const toast = React.useCallback((props: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { ...props, id }
    setToasts((prev) => [...prev, newToast])

    if (props.duration !== Infinity) {
      setTimeout(() => {
        dismiss(id)
      }, props.duration || 5000)
    }
  }, [])

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <div className="fixed bottom-0 right-0 z-50 p-4 md:bottom-8 md:right-8 md:top-auto flex flex-col gap-2 max-w-md w-full">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            title={toast.title}
            description={toast.description}
            action={toast.action}
            variant={toast.variant}
            onClose={() => dismiss(toast.id)}
            className="animate-slide-in-right"
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export { Toast }