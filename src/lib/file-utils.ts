import { FileText, File, FileImage } from 'lucide-react'

export interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  status: 'uploading' | 'analyzing' | 'completed' | 'error'
  uploadedAt: Date
  progress?: number
  analysisScore?: number
  suggestions?: number
  errorMessage?: string
}

export interface FileValidation {
  isValid: boolean
  error?: string
}

export function validateFile(file: File, maxSize: number = 10 * 1024 * 1024): FileValidation {
  // Check file size
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: `File size exceeds ${formatFileSize(maxSize)} limit`
    }
  }

  // Check file type
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Invalid file type. Please upload PDF, DOC, or DOCX files.'
    }
  }

  // Check file name
  if (file.name.length > 255) {
    return {
      isValid: false,
      error: 'File name is too long'
    }
  }

  return { isValid: true }
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function getFileIcon(mimeType: string) {
  switch (mimeType) {
    case 'application/pdf':
      return FileText
    case 'application/msword':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return File
    default:
      return FileImage
  }
}

export function getFileExtension(filename: string): string {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2)
}

export function isValidResumeFile(file: File): boolean {
  const validation = validateFile(file)
  return validation.isValid
}

// Simulate file upload progress
export function simulateUpload(
  onProgress: (progress: number) => void,
  duration: number = 3000
): Promise<void> {
  return new Promise((resolve) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        onProgress(progress)
        resolve()
      } else {
        onProgress(Math.floor(progress))
      }
    }, duration / 20)
  })
}

// Extract text content from file (placeholder for actual implementation)
export async function extractTextFromFile(file: File): Promise<string> {
  // This would typically use a library like pdf-parse for PDFs
  // or mammoth for Word documents
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Extracted text content from ${file.name}`)
    }, 1000)
  })
}
