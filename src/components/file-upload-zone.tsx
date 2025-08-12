"use client"

import { useCallback, useState } from "react"
import { useDropzone, FileRejection } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Upload, FileText, AlertCircle } from 'lucide-react'
import { validateFile } from "@/lib/file-utils"

interface FileUploadZoneProps {
  onFilesSelected: (files: File[]) => void
  disabled?: boolean
  maxFiles?: number
  maxSize?: number
}

export function FileUploadZone({
  onFilesSelected,
  disabled = false,
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024 // 10MB
}: FileUploadZoneProps) {
  const [errors, setErrors] = useState<string[]>([])

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    setErrors([])

    const newErrors: string[] = []

    // Validate accepted files
    const validFiles: File[] = []
    acceptedFiles.forEach(file => {
      const validation = validateFile(file, maxSize)
      if (validation.isValid) {
        validFiles.push(file)
      } else {
        newErrors.push(`${file.name}: ${validation.error}`)
      }
    })

    // Handle rejected files
    rejectedFiles.forEach(({ file, errors }) => {
      errors.forEach((error) => {
        switch (error.code) {
          case 'file-too-large':
            newErrors.push(`${file.name}: File is too large (max ${maxSize / 1024 / 1024}MB)`)
            break
          case 'file-invalid-type':
            newErrors.push(`${file.name}: Invalid file type. Please upload PDF, DOC, or DOCX files.`)
            break
          case 'too-many-files':
            newErrors.push(`Too many files. Maximum ${maxFiles} files allowed.`)
            break
          default:
            newErrors.push(`${file.name}: Upload failed`)
        }
      })
    })

    if (newErrors.length > 0) {
      setErrors(newErrors)
    }

    if (validFiles.length > 0) {
      onFilesSelected(validFiles)
    }
  }, [onFilesSelected, maxSize, maxFiles])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles,
    maxSize,
    disabled
  })

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          "hover:border-primary/50 hover:bg-primary/5",
          isDragActive && "border-primary bg-primary/10",
          isDragAccept && "border-green-500 bg-green-50",
          isDragReject && "border-red-500 bg-red-50",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center gap-4">
          <div className={cn(
            "p-4 rounded-full",
            isDragActive ? "bg-primary/20" : "bg-muted"
          )}>
            <Upload className={cn(
              "h-8 w-8",
              isDragActive ? "text-primary" : "text-muted-foreground"
            )} />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">
              {isDragActive ? "Drop your resume here" : "Upload your resume"}
            </h3>
            <p className="text-sm text-muted-foreground">
              Drag and drop your file here, or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Supports PDF, DOC, DOCX • Max {maxSize / 1024 / 1024}MB • Up to {maxFiles} files
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            className="pointer-events-none"
          >
            <FileText className="mr-2 h-4 w-4" />
            Choose File
          </Button>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="space-y-2">
          {errors.map((error, index) => (
            <div key={index} className="flex items-start gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
