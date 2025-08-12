"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Clock, Lightbulb } from 'lucide-react'
import { useState, useEffect } from "react"

interface Question {
  id: number
  question: string
  category: string
  timeLimit: number
  tips: string
}

interface InterviewQuestionsProps {
  question: Question
  onNext: () => void
  onPrevious: () => void
  canGoNext: boolean
  canGoPrevious: boolean
  isRecording: boolean
}

export function InterviewQuestions({
  question,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  isRecording
}: InterviewQuestionsProps) {
  const [timeRemaining, setTimeRemaining] = useState(question.timeLimit)
  const [showTips, setShowTips] = useState(false)

  useEffect(() => {
    setTimeRemaining(question.timeLimit)
  }, [question.timeLimit])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRecording && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Auto-advance to next question when time runs out
            if (canGoNext) {
              setTimeout(onNext, 1000)
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isRecording, timeRemaining, canGoNext, onNext])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const timeProgress = ((question.timeLimit - timeRemaining) / question.timeLimit) * 100

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="outline">{question.category}</Badge>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {formatTime(timeRemaining)}
          </div>
        </div>
        <CardTitle className="text-lg">Current Question</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-lg font-medium leading-relaxed">
            {question.question}
          </p>
          
          {/* Time Progress */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Time Progress</span>
              <span>{formatTime(question.timeLimit - timeRemaining)} / {formatTime(question.timeLimit)}</span>
            </div>
            <Progress 
              value={timeProgress} 
              className={`h-2 ${timeRemaining <= 30 ? 'bg-red-100' : ''}`}
            />
          </div>
        </div>

        {/* Tips Section */}
        <div className="space-y-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowTips(!showTips)}
            className="p-0 h-auto font-normal text-muted-foreground hover:text-foreground"
          >
            <Lightbulb className="h-3 w-3 mr-1" />
            {showTips ? 'Hide tips' : 'Show tips'}
          </Button>
          
          {showTips && (
            <div className="bg-muted/50 p-3 rounded-md text-sm">
              <p className="text-muted-foreground">{question.tips}</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onPrevious}
            disabled={!canGoPrevious}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          
          <Button
            size="sm"
            onClick={onNext}
            disabled={!canGoNext}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
