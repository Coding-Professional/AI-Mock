"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoPlayer } from "@/components/video-player"
import { QuestionReview } from "@/components/question-review"
import { FeedbackPanel } from "@/components/feedback-panel"
import { PerformanceMetrics } from "@/components/performance-metrics"
import { Play, Download, Share, RotateCcw, Calendar, Clock, Target, TrendingUp, Brain, FileText } from 'lucide-react'
import { mockInterviewSessions } from "@/lib/mock-data"
import { format } from "date-fns"

const breadcrumbItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Interview History", href: "/dashboard/history" },
  { label: "Session Review" }
]

export default function SessionReviewPage() {
  const params = useParams()
  const sessionId = params.sessionId as string

  // In a real app, you'd fetch this data based on the sessionId
  const session = mockInterviewSessions.find(s => s.id === sessionId) || mockInterviewSessions[0]

  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Session Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{session.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {format(new Date(session.completedAt), 'MMM d, yyyy')}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {session.duration} minutes
            </div>
            <Badge variant={session.status === 'completed' ? 'default' : 'secondary'}>
              {session.status}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            Retake Interview
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{session.overallScore}%</div>
            <Progress value={session.overallScore} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Questions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{session.questionsAnswered}</div>
            <p className="text-xs text-muted-foreground">
              of {session.totalQuestions} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{session.averageResponseTime}s</div>
            <p className="text-xs text-muted-foreground">
              Per question
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Improvement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{session.improvementScore}%</div>
            <p className="text-xs text-muted-foreground">
              vs last session
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="video">Video Review</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="feedback">AI Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <PerformanceMetrics session={session} />
            <FeedbackPanel session={session} />
          </div>
        </TabsContent>

        <TabsContent value="video" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Interview Recording
              </CardTitle>
              <CardDescription>
                Review your interview performance with synchronized questions and responses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <VideoPlayer session={session} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questions" className="space-y-6">
          <QuestionReview session={session} />
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI Analysis & Recommendations
                </CardTitle>
                <CardDescription>
                  Detailed feedback and personalized suggestions for improvement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FeedbackPanel session={session} detailed={true} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
