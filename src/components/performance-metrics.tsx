"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { InterviewSession } from "@/lib/interview-types"
import { Target, Clock, MessageSquare, TrendingUp } from 'lucide-react'

interface PerformanceMetricsProps {
  session: InterviewSession
}

export function PerformanceMetrics({ session }: PerformanceMetricsProps) {
  const metrics = [
    {
      label: "Overall Performance",
      value: session.overallScore,
      icon: Target,
      description: "Combined score across all evaluation criteria"
    },
    {
      label: "Response Quality",
      value: 88,
      icon: MessageSquare,
      description: "Clarity, structure, and relevance of responses"
    },
    {
      label: "Time Management",
      value: 76,
      icon: Clock,
      description: "Efficiency in answering within time limits"
    },
    {
      label: "Confidence Level",
      value: 82,
      icon: TrendingUp,
      description: "Demonstrated confidence and composure"
    }
  ]

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
        <CardDescription>
          Detailed breakdown of your interview performance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-sm">{metric.label}</span>
                </div>
                <span className={`font-bold ${getScoreColor(metric.value)}`}>
                  {metric.value}%
                </span>
              </div>
              <Progress value={metric.value} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {metric.description}
              </p>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
