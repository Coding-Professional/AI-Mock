"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InterviewSession } from "@/lib/interview-types"
import { TrendingUp } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

interface InterviewStatsProps {
  sessions: InterviewSession[]
}

export function InterviewStats({ sessions }: InterviewStatsProps) {
  // Prepare data for charts
  const chartData = sessions
    .sort((a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime())
    .map((session, index) => ({
      session: `Session ${index + 1}`,
      score: session.overallScore,
      communication: session.scores.communication,
      technical: session.scores.technical,
      problemSolving: session.scores.problemSolving,
      date: new Date(session.completedAt).toLocaleDateString()
    }))

  const skillsData = [
    {
      skill: 'Communication',
      average: Math.round(sessions.reduce((sum, s) => sum + s.scores.communication, 0) / sessions.length),
      latest: sessions[0]?.scores.communication || 0
    },
    {
      skill: 'Technical',
      average: Math.round(sessions.reduce((sum, s) => sum + s.scores.technical, 0) / sessions.length),
      latest: sessions[0]?.scores.technical || 0
    },
    {
      skill: 'Problem Solving',
      average: Math.round(sessions.reduce((sum, s) => sum + s.scores.problemSolving, 0) / sessions.length),
      latest: sessions[0]?.scores.problemSolving || 0
    }
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Performance Trend
          </CardTitle>
          <CardDescription>
            Your overall interview scores over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="session" />
              <YAxis domain={[0, 100]} />
              <Tooltip 
                formatter={(value, name) => [`${value}%`, name]}
                labelFormatter={(label) => `Session: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skills Breakdown</CardTitle>
          <CardDescription>
            Average vs latest performance by skill area
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="skill" />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Bar dataKey="average" fill="hsl(var(--muted))" name="Average" />
              <Bar dataKey="latest" fill="hsl(var(--primary))" name="Latest" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
