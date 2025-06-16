"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface LinkButtonProps {
  href: string
  children: React.ReactNode
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  className?: string
}

export function LinkButton({ href, children, variant = "outline", size = "sm", className = "" }: LinkButtonProps) {
  const handleClick = () => {
    window.open(href, "_blank", "noopener,noreferrer")
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={`inline-flex items-center gap-1 ${className}`}
    >
      {children}
      <ExternalLink className="h-3 w-3" />
    </Button>
  )
}
