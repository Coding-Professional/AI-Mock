"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Play, MoreHorizontal, Eye, Download, Trash2, RotateCcw, Calendar, Clock, Target, TrendingUp } from 'lucide-react'
import { InterviewSession } from "@/lib/interview-types"
import { format } from "date-fns"
import Link from "next/link"

interface InterviewSessionCardProps {
  session: InterviewSession
  onDelete: (id: string) => void
}

export function InterviewSessionCard({ session, onDelete }: InterviewSessionCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreVariant = (score: number) => {
    if (score >= 80) return "default"
    if (score >= 60) return "secondary"
    return "destructive"
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">{session.title}</CardTitle>
              <Badge variant="outline">{session.interviewType}</Badge>
            </div>
            <CardDescription className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {format(new Date(session.completedAt), 'MMM d, yyyy')}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {session.duration} min
              </div>
            </CardDescription>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/history/${session.id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Export Session
              </DropdownMenuItem>
              <DropdownMenuItem>
                <RotateCcw className="mr-2 h-4 w-4" />
                Retake Interview
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-red-600"
                onClick={() => onDelete(session.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Performance Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className={`text-2xl font-bold ${getScoreColor(session.overallScore)}`}>
              {session.overallScore}%
            </div>
            <div className="text-xs text-muted-foreground">Overall Score</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold">{session.questionsAnswered}</div>
            <div className="text-xs text-muted-foreground">Questions</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold">{session.averageResponseTime}s</div>
            <div className="text-xs text-muted-foreground">Avg Response</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">+{session.improvementScore}%</div>
            <div className="text-xs text-muted-foreground">Improvement</div>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Communication</span>
            <span>{session.scores.communication}%</span>
          </div>
          <Progress value={session.scores.communication} className="h-1" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Technical Knowledge</span>
            <span>{session.scores.technical}%</span>
          </div>
          <Progress value={session.scores.technical} className="h-1" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Problem Solving</span>
            <span>{session.scores.problemSolving}%</span>
          </div>
          <Progress value={session.scores.problemSolving} className="h-1" />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button asChild className="flex-1">
            <Link href={`/history/${session.id}`}>
              <Eye className="mr-2 h-4 w-4" />
              Review Session
            </Link>
          </Button>
          <Button variant="outline" className="flex-1">
            <Play className="mr-2 h-4 w-4" />
            Watch Recording
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
