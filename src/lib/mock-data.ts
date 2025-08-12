import { InterviewSession } from "./interview-types"

export const mockInterviewSessions: InterviewSession[] = [
  {
    id: "1",
    title: "Senior Frontend Developer - TechCorp",
    interviewType: "technical",
    status: "completed",
    completedAt: "2024-01-15T10:30:00Z",
    duration: 45,
    overallScore: 88,
    questionsAnswered: 8,
    totalQuestions: 8,
    averageResponseTime: 52,
    improvementScore: 12,
    scores: {
      communication: 92,
      technical: 85,
      problemSolving: 87
    },
    tags: ["React", "JavaScript", "System Design"]
  },
  {
    id: "2",
    title: "Product Manager - StartupXYZ",
    interviewType: "behavioral",
    status: "completed",
    completedAt: "2024-01-12T14:15:00Z",
    duration: 38,
    overallScore: 76,
    questionsAnswered: 6,
    totalQuestions: 6,
    averageResponseTime: 48,
    improvementScore: 8,
    scores: {
      communication: 82,
      technical: 68,
      problemSolving: 78
    },
    tags: ["Leadership", "Strategy", "Analytics"]
  },
  {
    id: "3",
    title: "Data Scientist - BigData Inc",
    interviewType: "technical",
    status: "completed",
    completedAt: "2024-01-10T09:00:00Z",
    duration: 52,
    overallScore: 82,
    questionsAnswered: 7,
    totalQuestions: 7,
    averageResponseTime: 67,
    improvementScore: 15,
    scores: {
      communication: 78,
      technical: 89,
      problemSolving: 79
    },
    tags: ["Python", "Machine Learning", "Statistics"]
  },
  {
    id: "4",
    title: "Full Stack Engineer - WebSolutions",
    interviewType: "general",
    status: "completed",
    completedAt: "2024-01-08T16:45:00Z",
    duration: 35,
    overallScore: 71,
    questionsAnswered: 5,
    totalQuestions: 5,
    averageResponseTime: 43,
    improvementScore: 5,
    scores: {
      communication: 75,
      technical: 69,
      problemSolving: 69
    },
    tags: ["Node.js", "React", "Database Design"]
  },
  {
    id: "5",
    title: "UX Designer - DesignStudio",
    interviewType: "behavioral",
    status: "completed",
    completedAt: "2024-01-05T11:20:00Z",
    duration: 42,
    overallScore: 85,
    questionsAnswered: 6,
    totalQuestions: 6,
    averageResponseTime: 55,
    improvementScore: 18,
    scores: {
      communication: 91,
      technical: 76,
      problemSolving: 88
    },
    tags: ["Design Thinking", "User Research", "Prototyping"]
  },
  {
    id: "6",
    title: "DevOps Engineer - CloudFirst",
    interviewType: "technical",
    status: "completed",
    completedAt: "2024-01-03T13:30:00Z",
    duration: 48,
    overallScore: 79,
    questionsAnswered: 7,
    totalQuestions: 7,
    averageResponseTime: 61,
    improvementScore: 10,
    scores: {
      communication: 74,
      technical: 86,
      problemSolving: 77
    },
    tags: ["AWS", "Docker", "CI/CD", "Kubernetes"]
  }
]
