"use client"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from 'lucide-react'
import { InterviewSession } from "@/lib/interview-types"

interface VideoPlayerProps {
  session: InterviewSession
}

export function VideoPlayer({ session }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(session.duration * 60) // Convert minutes to seconds
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const videoRef = useRef<HTMLVideoElement>(null)

  // Mock questions with timestamps
  const questions = [
    { id: 1, question: "Tell me about yourself", timestamp: 0, duration: 120 },
    { id: 2, question: "What interests you about this position?", timestamp: 120, duration: 90 },
    { id: 3, question: "Describe a challenging project", timestamp: 210, duration: 180 },
    { id: 4, question: "Where do you see yourself in 5 years?", timestamp: 390, duration: 120 },
    { id: 5, question: "Do you have any questions for me?", timestamp: 510, duration: 60 }
  ]

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    // In a real implementation, you'd control the actual video element
  }

  const handleSeek = (value: number[]) => {
    const newTime = value[0]
    setCurrentTime(newTime)
    
    // Update current question based on timestamp
    const questionIndex = questions.findIndex(q => 
      newTime >= q.timestamp && newTime < q.timestamp + q.duration
    )
    if (questionIndex !== -1) {
      setCurrentQuestion(questionIndex)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
    setIsMuted(value[0] === 0)
  }

  const jumpToQuestion = (questionIndex: number) => {
    const question = questions[questionIndex]
    setCurrentTime(question.timestamp)
    setCurrentQuestion(questionIndex)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-4">
      {/* Video Player */}
      <Card className="relative overflow-hidden bg-black">
        <CardContent className="p-0">
          <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
            {/* Simulated video placeholder */}
            <div className="text-white text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                {isPlaying ? (
                  <Pause className="h-8 w-8" />
                ) : (
                  <Play className="h-8 w-8 ml-1" />
                )}
              </div>
              <p className="text-sm opacity-75">Interview Recording</p>
              <p className="text-xs opacity-50">{session.title}</p>
            </div>

            {/* Current Question Overlay */}
            <div className="absolute top-4 left-4 right-4">
              <Badge variant="secondary" className="bg-black/50 text-white">
                Question {currentQuestion + 1}: {questions[currentQuestion]?.question}
              </Badge>
            </div>

            {/* Time Display */}
            <div className="absolute bottom-20 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          {/* Video Controls */}
          <div className="bg-black p-4 space-y-3">
            {/* Progress Bar */}
            <div className="space-y-1">
              <Slider
                value={[currentTime]}
                onValueChange={handleSeek}
                max={duration}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-white/70">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => jumpToQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                  className="text-white hover:bg-white/20"
                >
                  <SkipBack className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePlayPause}
                  className="text-white hover:bg-white/20"
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => jumpToQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                  disabled={currentQuestion === questions.length - 1}
                  className="text-white hover:bg-white/20"
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-white hover:bg-white/20"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
                
                <div className="w-20">
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    onValueChange={handleVolumeChange}
                    max={100}
                    step={1}
                  />
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                >
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Question Timeline */}
      <Card>
        <CardContent className="pt-6">
          <h4 className="font-medium mb-4">Question Timeline</h4>
          <div className="space-y-2">
            {questions.map((question, index) => (
              <div
                key={question.id}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                  index === currentQuestion 
                    ? 'bg-primary/10 border border-primary/20' 
                    : 'bg-muted/50 hover:bg-muted'
                }`}
                onClick={() => jumpToQuestion(index)}
              >
                <div className="flex-1">
                  <div className="font-medium text-sm">
                    Question {index + 1}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {question.question}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatTime(question.timestamp)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
