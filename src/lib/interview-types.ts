export interface InterviewSession {
  id: string
  title: string
  interviewType: string
  status: 'completed' | 'in-progress' | 'cancelled'
  completedAt: string
  duration: number // in minutes
  overallScore: number
  questionsAnswered: number
  totalQuestions: number
  averageResponseTime: number // in seconds
  improvementScore: number
  scores: {
    communication: number
    technical: number
    problemSolving: number
  }
  videoUrl?: string
  audioUrl?: string
  transcript?: string
  feedback?: string[]
  tags?: string[]
}

export interface QuestionResponse {
  questionId: string
  question: string
  userAnswer: string
  aiScore: number
  responseTime: number
  feedback: string
  strengths: string[]
  improvements: string[]
  timestamp: number
}

export interface InterviewAnalytics {
  totalSessions: number
  averageScore: number
  totalPracticeTime: number
  improvementTrend: number
  skillBreakdown: {
    communication: number
    technical: number
    problemSolving: number
  }
  recentSessions: InterviewSession[]
}
