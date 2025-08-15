"use client"

import { useState, useRef, useEffect } from "react"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { VideoRecorder } from "@/components/video-recorder"
import { InterviewQuestions } from "@/components/interview-questions"
import { InterviewSettings } from "@/components/interview-settings"
import { Play, Square, Pause, RotateCcw, Clock, Video, CheckCircle, Brain } from "lucide-react"
// Add import at the top
import { PageLoader } from "@/components/ui/loader"

const breadcrumbItems = [{ label: "Dashboard", href: "/" }, { label: "AI Interview Simulation" }]

interface InterviewState {
  status: "setup" | "recording" | "paused" | "completed"
  currentQuestion: number
  timeElapsed: number
  isRecording: boolean
  hasPermissions: boolean
}

interface InterviewSession {
  id: string
  title: string
  interviewType: string
  status: string
  completedAt: string
  duration: number
  overallScore: number
  questionsAnswered: number
  totalQuestions: number
  averageResponseTime: number
  improvementScore: number
  scores: {
    communication: number
    technical: number
    problemSolving: number
  }
}

const mockQuestions = [
  {
    id: 1,
    question: "Tell me about yourself and your background.",
    category: "General",
    timeLimit: 120,
    tips: "Keep it concise, focus on relevant experience, and connect it to the role you're applying for.",
  },
  {
    id: 2,
    question: "What interests you most about this position?",
    category: "Motivation",
    timeLimit: 90,
    tips: "Research the company and role beforehand. Show genuine enthusiasm and align your interests with the job requirements.",
  },
  {
    id: 3,
    question: "Describe a challenging project you worked on and how you overcame obstacles.",
    category: "Behavioral",
    timeLimit: 180,
    tips: "Use the STAR method (Situation, Task, Action, Result) to structure your response clearly.",
  },
  {
    id: 4,
    question: "Where do you see yourself in 5 years?",
    category: "Career Goals",
    timeLimit: 120,
    tips: "Show ambition while demonstrating commitment to the company. Align your goals with potential career paths at the organization.",
  },
  {
    id: 5,
    question: "Do you have any questions for me?",
    category: "Closing",
    timeLimit: 60,
    tips: "Always have thoughtful questions prepared. Ask about company culture, growth opportunities, or specific aspects of the role.",
  },
]

export default function InterviewPage() {
  const [interviewState, setInterviewState] = useState<InterviewState>({
    status: "setup",
    currentQuestion: 0,
    timeElapsed: 0,
    isRecording: false,
    hasPermissions: false,
  })

  const [settings, setSettings] = useState({
    interviewType: "general",
    difficulty: "intermediate",
    duration: 30,
    includeVideo: true,
    includeAudio: true,
  })

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Add state for processing
  const [isProcessing, setIsProcessing] = useState(false)

  // Add this function after the existing state declarations
  const saveInterviewSession = () => {
    const newSession: InterviewSession = {
      id: Date.now().toString(),
      title: `${settings.interviewType.charAt(0).toUpperCase() + settings.interviewType.slice(1)} Interview Session`,
      interviewType: settings.interviewType,
      status: "completed",
      completedAt: new Date().toISOString(),
      duration: Math.floor(interviewState.timeElapsed / 60),
      overallScore: Math.floor(Math.random() * 30) + 70, // Simulated score
      questionsAnswered: interviewState.currentQuestion + 1,
      totalQuestions: mockQuestions.length,
      averageResponseTime: Math.floor(Math.random() * 30) + 40,
      improvementScore: Math.floor(Math.random() * 20) + 5,
      scores: {
        communication: Math.floor(Math.random() * 30) + 70,
        technical: Math.floor(Math.random() * 30) + 70,
        problemSolving: Math.floor(Math.random() * 30) + 70,
      },
    }

    // In a real app, you'd save this to your backend/database
    console.log("Saving interview session:", newSession)

    // Store in localStorage for demo purposes
    const existingSessions = JSON.parse(localStorage.getItem("interviewSessions") || "[]")
    existingSessions.unshift(newSession)
    localStorage.setItem("interviewSessions", JSON.stringify(existingSessions))
  }

  useEffect(() => {
    if (interviewState.isRecording && interviewState.status === "recording") {
      timerRef.current = setInterval(() => {
        setInterviewState((prev) => ({
          ...prev,
          timeElapsed: prev.timeElapsed + 1,
        }))
      }, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [interviewState.isRecording, interviewState.status])

  // Add this useEffect after the existing timer useEffect
  useEffect(() => {
    // Cleanup function when component unmounts
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      // Additional cleanup can be added here if needed
    }
  }, [])

  // Add beforeunload event listener for page refresh/close
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (interviewState.isRecording) {
        e.preventDefault()
        e.returnValue = "You have an active interview session. Are you sure you want to leave?"
        return "You have an active interview session. Are you sure you want to leave?"
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [interviewState.isRecording])

  const handleStartInterview = () => {
    setInterviewState((prev) => ({
      ...prev,
      status: "recording",
      isRecording: true,
      timeElapsed: 0,
    }))
  }

  const handlePauseInterview = () => {
    setInterviewState((prev) => ({
      ...prev,
      status: "paused",
      isRecording: false,
    }))
  }

  const handleResumeInterview = () => {
    setInterviewState((prev) => ({
      ...prev,
      status: "recording",
      isRecording: true,
    }))
  }

  // Update the handleStopInterview function
  const handleStopInterview = () => {
    setIsProcessing(true)

    setInterviewState((prev) => ({
      ...prev,
      status: "completed",
      isRecording: false,
    }))

    // Simulate processing time
    setTimeout(() => {
      saveInterviewSession()
      setIsProcessing(false)
    }, 2000)
  }

  const handleNextQuestion = () => {
    if (interviewState.currentQuestion < mockQuestions.length - 1) {
      setInterviewState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
      }))
    } else {
      handleStopInterview()
    }
  }

  const handlePreviousQuestion = () => {
    if (interviewState.currentQuestion > 0) {
      setInterviewState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1,
      }))
    }
  }

  const handleRestart = () => {
    setInterviewState({
      status: "setup",
      currentQuestion: 0,
      timeElapsed: 0,
      isRecording: false,
      hasPermissions: false,
    })
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const currentQuestion = mockQuestions[interviewState.currentQuestion]
  const progress = ((interviewState.currentQuestion + 1) / mockQuestions.length) * 100

  return (
    <div className="space-y-6">
      <BreadcrumbNav items={breadcrumbItems} />

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">AI Interview Simulation</h1>
        <p className="text-muted-foreground">
          Practice your interview skills with AI-powered questions and real-time feedback
        </p>
      </div>

      {/* Interview Status Bar */}
      {interviewState.status !== "setup" && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Badge
                  variant={
                    interviewState.status === "recording"
                      ? "default"
                      : interviewState.status === "paused"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {interviewState.status === "recording"
                    ? "Recording"
                    : interviewState.status === "paused"
                      ? "Paused"
                      : "Completed"}
                </Badge>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {formatTime(interviewState.timeElapsed)}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Question {interviewState.currentQuestion + 1} of {mockQuestions.length}
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Interview Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Recorder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Video Recording
              </CardTitle>
              <CardDescription>Your interview session will be recorded for analysis and feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <VideoRecorder
                isRecording={interviewState.isRecording}
                onPermissionChange={(hasPermissions) => setInterviewState((prev) => ({ ...prev, hasPermissions }))}
              />
            </CardContent>
          </Card>

          {/* Interview Controls */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-3 justify-center">
                {interviewState.status === "setup" && (
                  <Button size="lg" onClick={handleStartInterview} disabled={!interviewState.hasPermissions}>
                    <Play className="mr-2 h-4 w-4" />
                    Start Interview
                  </Button>
                )}

                {interviewState.status === "recording" && (
                  <>
                    <Button size="lg" variant="secondary" onClick={handlePauseInterview}>
                      <Pause className="mr-2 h-4 w-4" />
                      Pause
                    </Button>
                    <Button size="lg" variant="destructive" onClick={handleStopInterview}>
                      <Square className="mr-2 h-4 w-4" />
                      Stop Interview
                    </Button>
                  </>
                )}

                {interviewState.status === "paused" && (
                  <>
                    <Button size="lg" onClick={handleResumeInterview}>
                      <Play className="mr-2 h-4 w-4" />
                      Resume
                    </Button>
                    <Button size="lg" variant="destructive" onClick={handleStopInterview}>
                      <Square className="mr-2 h-4 w-4" />
                      Stop Interview
                    </Button>
                  </>
                )}

                {interviewState.status === "completed" && (
                  <Button size="lg" onClick={handleRestart}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Start New Interview
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Completion Message */}
          {interviewState.status === "completed" && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <p className="font-medium">Interview completed successfully!</p>
                  <p>
                    Your responses are being analyzed. You'll receive detailed feedback and suggestions for improvement
                    shortly.
                  </p>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Current Question */}
          {interviewState.status !== "setup" && currentQuestion && (
            <InterviewQuestions
              question={currentQuestion}
              onNext={handleNextQuestion}
              onPrevious={handlePreviousQuestion}
              canGoNext={interviewState.currentQuestion < mockQuestions.length - 1}
              canGoPrevious={interviewState.currentQuestion > 0}
              isRecording={interviewState.isRecording}
            />
          )}

          {/* Interview Settings */}
          {interviewState.status === "setup" && (
            <InterviewSettings settings={settings} onSettingsChange={setSettings} />
          )}

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Session Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Duration</span>
                <span className="font-medium">{formatTime(interviewState.timeElapsed)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Questions</span>
                <span className="font-medium">
                  {interviewState.currentQuestion + 1} / {mockQuestions.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant="outline" className="capitalize">
                  {interviewState.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Brain className="h-4 w-4" />
                Interview Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-3 w-3 mt-1 text-green-500 flex-shrink-0" />
                <span>Maintain eye contact with the camera</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-3 w-3 mt-1 text-green-500 flex-shrink-0" />
                <span>Speak clearly and at a moderate pace</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-3 w-3 mt-1 text-green-500 flex-shrink-0" />
                <span>Use specific examples in your answers</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-3 w-3 mt-1 text-green-500 flex-shrink-0" />
                <span>Take a moment to think before answering</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {isProcessing && <PageLoader text="Analyzing your interview performance..." variant="brain" />}
    </div>
  )
}
