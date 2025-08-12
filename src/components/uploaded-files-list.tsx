"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { FileText, MoreHorizontal, Download, Trash2, Eye, Brain, Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { UploadedFile, formatFileSize, getFileIcon } from "@/lib/file-utils"
import { format } from "date-fns"

interface UploadedFilesListProps {
  files: UploadedFile[]
  onDeleteFile: (fileId: string) => void
}

export function UploadedFilesList({ files, onDeleteFile }: UploadedFilesListProps) {
  const getStatusIcon = (status: UploadedFile['status']) => {
    switch (status) {
      case 'uploading':
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
      case 'analyzing':
        return <Brain className="h-4 w-4 text-amber-500" />
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusText = (status: UploadedFile['status']) => {
    switch (status) {
      case 'uploading':
        return 'Uploading'
      case 'analyzing':
        return 'Analyzing'
      case 'completed':
        return 'Completed'
      case 'error':
        return 'Error'
      default:
        return 'Pending'
    }
  }

  const getStatusVariant = (status: UploadedFile['status']) => {
    switch (status) {
      case 'completed':
        return 'default' as const
      case 'uploading':
      case 'analyzing':
        return 'secondary' as const
      case 'error':
        return 'destructive' as const
      default:
        return 'outline' as const
    }
  }

  return (
    <div className="space-y-4">
      {files.map((file) => {
        const FileIcon = getFileIcon(file.type)
        
        return (
          <div key={file.id} className="flex items-center gap-4 p-4 border rounded-lg">
            <div className="flex-shrink-0">
              <FileIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-medium truncate">{file.name}</h4>
                <div className="flex items-center gap-2">
                  {getStatusIcon(file.status)}
                  <Badge variant={getStatusVariant(file.status)}>
                    {getStatusText(file.status)}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{formatFileSize(file.size)}</span>
                <span>•</span>
                <span>{format(file.uploadedAt, 'MMM d, yyyy')}</span>
                {file.analysisScore && (
                  <>
                    <span>•</span>
                    <span className="font-medium text-foreground">
                      Score: {file.analysisScore}%
                    </span>
                  </>
                )}
                {file.suggestions && (
                  <>
                    <span>•</span>
                    <span className="font-medium text-foreground">
                      {file.suggestions} suggestions
                    </span>
                  </>
                )}
              </div>
              
              {(file.status === 'uploading' || file.status === 'analyzing') && file.progress !== undefined && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>
                      {file.status === 'uploading' ? 'Uploading...' : 'Analyzing...'}
                    </span>
                    <span>{file.progress}%</span>
                  </div>
                  <Progress value={file.progress} className="h-1" />
                </div>
              )}
            </div>
            
            <div className="flex-shrink-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">File actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem disabled={file.status !== 'completed'}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Analysis
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled={file.status !== 'completed'}>
                    <Brain className="mr-2 h-4 w-4" />
                    Start Interview
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-red-600"
                    onClick={() => onDeleteFile(file.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )
      })}
    </div>
  )
}
