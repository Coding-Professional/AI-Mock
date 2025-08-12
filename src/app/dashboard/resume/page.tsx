"use client"

import { useState } from "react"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileUploadZone } from "@/components/file-upload-zone"
import { UploadedFilesList } from "@/components/uploaded-files-list"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileText, Upload, CheckCircle, AlertCircle, Brain, Zap } from 'lucide-react'
import { UploadedFile } from "@/lib/file-utils"

const breadcrumbItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Resume Upload" }
]

export default function ResumePage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      id: "1",
      name: "Alex_Johnson_Resume_2024.pdf",
      size: 245760,
      type: "application/pdf",
      status: "completed",
      uploadedAt: new Date("2024-01-15"),
      analysisScore: 85,
      suggestions: 3
    },
    {
      id: "2",
      name: "Resume_Software_Engineer.docx",
      size: 189440,
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      status: "analyzing",
      uploadedAt: new Date("2024-01-14"),
      progress: 65
    }
  ])

  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFilesSelected = async (files: File[]) => {
    setIsUploading(true)
    setUploadProgress(0)

    for (const file of files) {
      // Simulate upload progress
      const newFile: UploadedFile = {
        id: Date.now().toString(),
        name: file.name,
        size: file.size,
        type: file.type,
        status: "uploading",
        uploadedAt: new Date(),
        progress: 0
      }

      setUploadedFiles(prev => [newFile, ...prev])

      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 200))
        setUploadProgress(progress)

        setUploadedFiles(prev =>
          prev.map(f =>
            f.id === newFile.id
              ? { ...f, progress, status: progress === 100 ? "analyzing" : "uploading" }
              : f
          )
        )
      }

      // Simulate analysis
      await new Promise(resolve => setTimeout(resolve, 2000))

      setUploadedFiles(prev =>
        prev.map(f =>
          f.id === newFile.id
            ? {
              ...f,
              status: "completed",
              analysisScore: Math.floor(Math.random() * 30) + 70,
              suggestions: Math.floor(Math.random() * 5) + 1
            }
            : f
        )
      )
    }

    setIsUploading(false)
    setUploadProgress(0)
  }

  const handleDeleteFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const completedFiles = uploadedFiles.filter(f => f.status === "completed")
  const averageScore = completedFiles.length > 0
    ? Math.round(completedFiles.reduce((sum, f) => sum + (f.analysisScore || 0), 0) / completedFiles.length)
    : 0

  return (
    <div className="space-y-6">
      <BreadcrumbNav items={breadcrumbItems} />

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Resume Upload</h1>
        <p className="text-muted-foreground">
          Upload your resume for AI-powered analysis and personalized interview preparation
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Uploaded Resumes
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uploadedFiles.length}</div>
            <p className="text-xs text-muted-foreground">
              {completedFiles.length} analyzed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Score
            </CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore}%</div>
            <p className="text-xs text-muted-foreground">
              AI analysis score
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Improvements
            </CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {completedFiles.reduce((sum, f) => sum + (f.suggestions || 0), 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Suggestions available
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Upload Progress */}
      {isUploading && (
        <Alert>
          <Upload className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Uploading and analyzing resume...</span>
                <span className="text-sm font-medium">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upload Zone */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Resume
            </CardTitle>
            <CardDescription>
              Drag and drop your resume or click to browse. Supports PDF, DOC, and DOCX files.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FileUploadZone
              onFilesSelected={handleFilesSelected}
              disabled={isUploading}
            />

            <div className="mt-4 space-y-2">
              <h4 className="text-sm font-medium">What happens next?</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  AI analyzes your resume content and structure
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  Identifies strengths and improvement areas
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  Generates personalized interview questions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  Provides tailored preparation recommendations
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Get started with your resume analysis and interview preparation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              className="w-full"
              disabled={completedFiles.length === 0}
              size="lg"
            >
              <Brain className="mr-2 h-4 w-4" />
              Start AI Interview
            </Button>

            <Button
              variant="outline"
              className="w-full"
              disabled={completedFiles.length === 0}
            >
              <FileText className="mr-2 h-4 w-4" />
              View Analysis Report
            </Button>

            <div className="pt-2 border-t">
              <h4 className="text-sm font-medium mb-2">Resume Tips</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-3 w-3 mt-0.5 text-amber-500" />
                  <span>Keep your resume to 1-2 pages maximum</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-3 w-3 mt-0.5 text-amber-500" />
                  <span>Use action verbs and quantify achievements</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-3 w-3 mt-0.5 text-amber-500" />
                  <span>Tailor your resume for each job application</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Resumes</CardTitle>
            <CardDescription>
              Manage your uploaded resumes and view analysis results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UploadedFilesList
              files={uploadedFiles}
              onDeleteFile={handleDeleteFile}
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
