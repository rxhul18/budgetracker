"use client"

import { useEffect, useState } from "react"
import { DollarSign } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function Loading() {
  const [progress, setProgress] = useState(0)

  // Simulate progress loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 2))
    }, 50)

    return () => clearTimeout(timer)
  }, [progress])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm space-y-6 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative h-12 w-12 rounded-full bg-muted/30 flex items-center justify-center">
            <DollarSign className="h-6 w-6 text-primary" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin"></div>
          </div>

          <h2 className="text-xl font-medium">Loading your budget data</h2>
          <p className="text-sm text-muted-foreground">Please wait while we fetch your latest information</p>
        </div>

        <div className="w-full space-y-2">
          <Progress value={progress} className="h-1.5" />
          <p className="text-xs text-muted-foreground text-right">{progress}%</p>
        </div>
      </div>
    </div>
  )
}
