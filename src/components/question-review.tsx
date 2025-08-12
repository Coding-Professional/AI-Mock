"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { InterviewSession } from "@/lib/interview-types"
import { Clock, ThumbsUp, ThumbsDown, Play, MessageSquare } from 'lucide-react'

interface QuestionReviewProps {
  session: InterviewSession
}

export function QuestionReview({ session }: QuestionReviewProps) {
  // Mock detailed question data
  const questions = [
    {
      id: 1,
      question: "Tell me about yourself and your background.",
      category: "General",
      userAnswer: "I'm a software engineer with 5 years of experience in full-stack development. I've worked primarily with React and Node.js, building scalable web applications for e-commerce and fintech companies. I'm passionate about creating user-friendly interfaces and optimizing application performance.",
      aiScore: 85,
      responseTime: 45,
      feedback: "Great structure and relevant details. Consider adding more specific achievements or metrics to strengthen your response.",
      strengths: ["Clear communication", "Relevant experience", "Good pacing"],
      improvements: ["Add specific metrics", "Mention key achievements", "Connect to role requirements"]
    },
    {
      id: 2,
      question: "What interests you most about this position?",
      category: "Motivation",
      userAnswer: "I'm excited about the opportunity to work with cutting-edge technologies and contribute to innovative projects. The company's focus on user experience aligns with my passion for creating intuitive applications.",
      aiScore: 72,
      responseTime: 38,
      feedback: "Good enthusiasm shown. Try to be more specific about the role and company research to demonstrate genuine interest.",
      strengths: ["Shows enthusiasm", "Mentions company values", "Connects personal interests"],
      improvements: ["More specific research", "Mention specific projects", "Ask follow-up questions"]
    },
    {
      id: 3,
      question: "Describe a challenging project you worked on and how you overcame obstacles.",
      category: "Behavioral",
      userAnswer: "I led the development of a real-time analytics dashboard that needed to handle millions of data points. The main challenge was performance optimization. I implemented data virtualization and caching strategies, which reduced load times by 70%.",
      aiScore: 92,
      responseTime: 67,
      feedback: "Excellent use of STAR method with specific metrics. This demonstrates both technical skills and problem-solving ability.",
      strengths: ["Specific example", "Quantified results", "Technical depth", "Leadership shown"],
      improvements: ["Mention team collaboration", "Discuss lessons learned"]
    }
  ]

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
    <div className="space-y-6">
      {questions.map((question, index) => (
        <Card key={question.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{question.category}</Badge>
                  <Badge variant={getScoreVariant(question.aiScore)}>
                    {question.aiScore}%
                  </Badge>
                </div>
                <CardTitle className="text-lg">
                  Question {index + 1}
                </CardTitle>
                <CardDescription className="text-base font-medium">
                  {question.question}
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                <Play className="h-4 w-4 mr-2" />
                Play Response
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Response Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className={`text-2xl font-bold ${getScoreColor(question.aiScore)}`}>
                  {question.aiScore}%
                </div>
                <div className="text-xs text-muted-foreground">AI Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{question.responseTime}s</div>
                <div className="text-xs text-muted-foreground">Response Time</div>
              </div>
              <div className="text-center md:col-span-1 col-span-2">
                <Progress value={question.aiScore} className="h-2 mt-2" />
                <div className="text-xs text-muted-foreground mt-1">Performance</div>
              </div>
            </div>

            {/* User Answer */}
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Your Response
              </h4>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm leading-relaxed">{question.userAnswer}</p>
              </div>
            </div>

            {/* AI Feedback */}
            <div className="space-y-4">
              <h4 className="font-medium">AI Feedback</h4>
              <p className="text-sm text-muted-foreground">{question.feedback}</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-green-600 flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3" />
                    Strengths
                  </h5>
                  <ul className="space-y-1">
                    {question.strengths.map((strength, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                        <div className="w-1 h-1 bg-green-500 rounded-full" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-amber-600 flex items-center gap-1">
                    <ThumbsDown className="h-3 w-3" />
                    Areas for Improvement
                  </h5>
                  <ul className="space-y-1">
                    {question.improvements.map((improvement, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                        <div className="w-1 h-1 bg-amber-500 rounded-full" />
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
