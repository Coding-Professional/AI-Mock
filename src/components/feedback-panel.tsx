"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { InterviewSession } from "@/lib/interview-types"
import { Brain, TrendingUp, AlertCircle, CheckCircle, Target, Lightbulb } from 'lucide-react'

interface FeedbackPanelProps {
  session: InterviewSession
  detailed?: boolean
}

export function FeedbackPanel({ session, detailed = false }: FeedbackPanelProps) {
  const overallFeedback = {
    summary: "Strong technical knowledge and communication skills demonstrated. Focus on providing more specific examples and quantifying achievements to enhance responses.",
    keyStrengths: [
      "Clear and articulate communication",
      "Strong technical foundation",
      "Good problem-solving approach",
      "Professional demeanor throughout"
    ],
    areasForImprovement: [
      "Provide more specific metrics and achievements",
      "Prepare more detailed STAR method examples",
      "Research company-specific information",
      "Practice concise responses to common questions"
    ],
    recommendations: [
      {
        title: "Practice STAR Method",
        description: "Structure behavioral responses using Situation, Task, Action, Result framework",
        priority: "high"
      },
      {
        title: "Quantify Achievements",
        description: "Include specific numbers, percentages, and measurable outcomes in your examples",
        priority: "high"
      },
      {
        title: "Company Research",
        description: "Demonstrate deeper knowledge of the company's products, culture, and recent developments",
        priority: "medium"
      },
      {
        title: "Technical Deep Dives",
        description: "Prepare to discuss technical decisions and trade-offs in more detail",
        priority: "medium"
      }
    ]
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive'
      case 'medium': return 'secondary'
      case 'low': return 'outline'
      default: return 'outline'
    }
  }

  return (
    <div className="space-y-6">
      {/* Overall Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Overall Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {overallFeedback.summary}
          </p>
        </CardContent>
      </Card>

      {/* Score Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Performance Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Communication Skills</span>
              <span className="text-sm font-bold">{session.scores.communication}%</span>
            </div>
            <Progress value={session.scores.communication} className="h-2" />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Technical Knowledge</span>
              <span className="text-sm font-bold">{session.scores.technical}%</span>
            </div>
            <Progress value={session.scores.technical} className="h-2" />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Problem Solving</span>
              <span className="text-sm font-bold">{session.scores.problemSolving}%</span>
            </div>
            <Progress value={session.scores.problemSolving} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Strengths and Improvements */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              Key Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {overallFeedback.keyStrengths.map((strength, index) => (
                <li key={index} className="text-sm flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  {strength}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-600">
              <AlertCircle className="h-5 w-5" />
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {overallFeedback.areasForImprovement.map((area, index) => (
                <li key={index} className="text-sm flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                  {area}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Recommendations */}
      {detailed && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Personalized Recommendations
            </CardTitle>
            <CardDescription>
              Actionable steps to improve your interview performance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {overallFeedback.recommendations.map((rec, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{rec.title}</h4>
                  <Badge variant={getPriorityColor(rec.priority)}>
                    {rec.priority} priority
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{rec.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Improvement Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Progress Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-green-600">+{session.improvementScore}%</div>
            <p className="text-sm text-muted-foreground">
              Improvement since your last interview session
            </p>
            <div className="text-xs text-muted-foreground">
              Keep practicing to maintain this positive trend!
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
