"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import { Video, VideoOff, Mic, MicOff, AlertCircle, Settings } from 'lucide-react'

interface VideoRecorderProps {
  isRecording: boolean
  onPermissionChange: (hasPermissions: boolean) => void
}

export function VideoRecorder({ isRecording, onPermissionChange }: VideoRecorderProps) {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<string>("")
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([])

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    initializeMedia()
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  useEffect(() => {
    if (stream && isRecording && !mediaRecorder) {
      startRecording()
    } else if (mediaRecorder && !isRecording) {
      stopRecording()
    }
  }, [isRecording, stream])

  const initializeMedia = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        }
      })

      setStream(mediaStream)
      setError("")
      onPermissionChange(true)

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (err) {
      console.error('Error accessing media devices:', err)
      let errorMessage = "Unable to access camera and microphone. "
      
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          errorMessage += "Please allow camera and microphone permissions and refresh the page."
        } else if (err.name === 'NotFoundError') {
          errorMessage += "No camera or microphone found on this device."
        } else if (err.name === 'NotReadableError') {
          errorMessage += "Camera or microphone is already in use by another application."
        } else {
          errorMessage += "Please check your device settings and try again."
        }
      }
      
      setError(errorMessage)
      onPermissionChange(false)
    }
  }

  const startRecording = () => {
    if (!stream) return

    try {
      const recorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9,opus'
      })

      const chunks: Blob[] = []

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data)
        }
      }

      recorder.onstop = () => {
        setRecordedChunks(chunks)
        // Here you would typically upload the recording to your server
        console.log('Recording stopped, chunks:', chunks)
      }

      recorder.start(1000) // Collect data every second
      setMediaRecorder(recorder)
    } catch (err) {
      console.error('Error starting recording:', err)
      setError("Failed to start recording. Please try again.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop()
      setMediaRecorder(null)
    }
  }

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled
        setIsVideoEnabled(videoTrack.enabled)
      }
    }
  }

  const toggleAudio = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled
        setIsAudioEnabled(audioTrack.enabled)
      }
    }
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <div className="space-y-2">
            <p>{error}</p>
            <Button variant="outline" size="sm" onClick={initializeMedia}>
              Try Again
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-4">
      <Card className="relative overflow-hidden bg-black">
        <CardContent className="p-0">
          <div className="relative aspect-video">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            
            {/* Recording Indicator */}
            {isRecording && (
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                REC
              </div>
            )}

            {/* Video Controls Overlay */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
              <Button
                variant="secondary"
                size="icon"
                onClick={toggleVideo}
                className={`${!isVideoEnabled ? 'bg-red-600 hover:bg-red-700' : ''}`}
              >
                {isVideoEnabled ? (
                  <Video className="h-4 w-4" />
                ) : (
                  <VideoOff className="h-4 w-4" />
                )}
              </Button>
              
              <Button
                variant="secondary"
                size="icon"
                onClick={toggleAudio}
                className={`${!isAudioEnabled ? 'bg-red-600 hover:bg-red-700' : ''}`}
              >
                {isAudioEnabled ? (
                  <Mic className="h-4 w-4" />
                ) : (
                  <MicOff className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Information */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Video className="h-3 w-3" />
            <span>{isVideoEnabled ? 'Video On' : 'Video Off'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Mic className="h-3 w-3" />
            <span>{isAudioEnabled ? 'Audio On' : 'Audio Off'}</span>
          </div>
        </div>
        
        <Button variant="ghost" size="sm" onClick={initializeMedia}>
          <Settings className="h-3 w-3 mr-1" />
          Refresh
        </Button>
      </div>
    </div>
  )
}
