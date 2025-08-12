"use client"

import { cn } from "@/lib/utils"
import { Brain, Loader2 } from 'lucide-react'

interface LoaderProps {
  variant?: 'default' | 'dots' | 'pulse' | 'brain' | 'minimal' | 'gradient'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  text?: string
  className?: string
}

export function Loader({
  variant = 'default',
  size = 'md',
  text,
  className
}: LoaderProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  }

  if (variant === 'dots') {
    return (
      <div className={cn("flex flex-col items-center gap-3", className)}>
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                "bg-primary rounded-full animate-pulse",
                size === 'sm' ? 'w-2 h-2' :
                  size === 'md' ? 'w-3 h-3' :
                    size === 'lg' ? 'w-4 h-4' : 'w-5 h-5'
              )}
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1.4s'
              }}
            />
          ))}
        </div>
        {text && (
          <p className={cn("text-muted-foreground font-medium", textSizeClasses[size])}>
            {text}
          </p>
        )}
      </div>
    )
  }

  if (variant === 'pulse') {
    return (
      <div className={cn("flex flex-col items-center gap-3", className)}>
        <div className="relative">
          <div className={cn(
            "rounded-full bg-primary/20 animate-ping",
            sizeClasses[size]
          )} />
          <div className={cn(
            "absolute inset-0 rounded-full bg-primary animate-pulse",
            sizeClasses[size]
          )} />
        </div>
        {text && (
          <p className={cn("text-muted-foreground font-medium", textSizeClasses[size])}>
            {text}
          </p>
        )}
      </div>
    )
  }

  if (variant === 'brain') {
    return (
      <div className={cn("flex flex-col items-center gap-3", className)}>
        <div className="relative">
          <div className={cn(
            "rounded-full bg-primary/10 animate-ping",
            size === 'sm' ? 'w-8 h-8' :
              size === 'md' ? 'w-12 h-12' :
                size === 'lg' ? 'w-16 h-16' : 'w-20 h-20'
          )} />
          <div className={cn(
            "absolute inset-0 flex items-center justify-center",
            size === 'sm' ? 'w-8 h-8' :
              size === 'md' ? 'w-12 h-12' :
                size === 'lg' ? 'w-16 h-16' : 'w-20 h-20'
          )}>
            <Brain className={cn(
              "text-primary animate-pulse",
              size === 'sm' ? 'w-4 h-4' :
                size === 'md' ? 'w-6 h-6' :
                  size === 'lg' ? 'w-8 h-8' : 'w-10 h-10'
            )} />
          </div>
        </div>
        {text && (
          <p className={cn("text-muted-foreground font-medium", textSizeClasses[size])}>
            {text}
          </p>
        )}
      </div>
    )
  }

  if (variant === 'minimal') {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
        {text && (
          <p className={cn("text-muted-foreground font-medium", textSizeClasses[size])}>
            {text}
          </p>
        )}
      </div>
    )
  }

  if (variant === 'gradient') {
    return (
      <div className={cn("flex flex-col items-center gap-3", className)}>
        <div className="relative">
          <div className={cn(
            "rounded-full animate-spin",
            sizeClasses[size]
          )} style={{
            background: 'conic-gradient(from 0deg, transparent, hsl(var(--primary)), transparent)',
            mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))',
            WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))'
          }} />
        </div>
        {text && (
          <p className={cn("text-muted-foreground font-medium", textSizeClasses[size])}>
            {text}
          </p>
        )}
      </div>
    )
  }

  // Default variant
  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className="relative">
        <div className={cn(
          "rounded-full border-2 border-muted animate-spin",
          sizeClasses[size]
        )} style={{
          borderTopColor: 'hsl(var(--primary))',
          animationDuration: '1s'
        }} />
      </div>
      {text && (
        <p className={cn("text-muted-foreground font-medium", textSizeClasses[size])}>
          {text}
        </p>
      )}
    </div>
  )
}

// Full page loader overlay
export function PageLoader({
  text = "Loading...",
  variant = 'brain',
  className
}: Omit<LoaderProps, 'size'> & { text?: string }) {
  return (
    <div className={cn(
      "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
      className
    )}>
      <div className="flex flex-col items-center gap-4 p-8 rounded-lg bg-background border shadow-lg">
        <Loader variant={variant} size="lg" />
        <p className="text-muted-foreground font-medium">{text}</p>
      </div>
    </div>
  )
}

// Inline loader for buttons
export function ButtonLoader({
  size = 'sm',
  className
}: Pick<LoaderProps, 'size' | 'className'>) {
  return (
    <Loader2 className={cn(
      "animate-spin",
      size === 'sm' ? 'w-3 h-3' :
        size === 'md' ? 'w-4 h-4' :
          size === 'lg' ? 'w-5 h-5' : 'w-6 h-6',
      className
    )} />
  )
}

// Card skeleton loader
export function CardLoader({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse", className)}>
      <div className="rounded-lg border bg-card p-6 space-y-4">
        <div className="flex items-center space-x-4">
          <div className="rounded-full bg-muted h-10 w-10" />
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-3 bg-muted rounded w-1/2" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-muted rounded" />
          <div className="h-3 bg-muted rounded w-5/6" />
          <div className="h-3 bg-muted rounded w-4/6" />
        </div>
        <div className="flex space-x-2">
          <div className="h-8 bg-muted rounded w-20" />
          <div className="h-8 bg-muted rounded w-24" />
        </div>
      </div>
    </div>
  )
}
