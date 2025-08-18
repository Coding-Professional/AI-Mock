"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Settings } from 'lucide-react'

interface InterviewSettingsType {
  interviewType: string
  difficulty: string
  duration: number
  includeVideo: boolean
  includeAudio: boolean
}

interface InterviewSettingsProps {
  settings: InterviewSettingsType
  onSettingsChange: (settings: InterviewSettingsType) => void
}

export function InterviewSettings({ settings, onSettingsChange }: InterviewSettingsProps) {
  const updateSetting = (key: keyof InterviewSettingsType, value: string | number | boolean) => {
    onSettingsChange({
      ...settings,
      [key]: value
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Interview Settings
        </CardTitle>
        <CardDescription>
          Customize your interview experience
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Interview Type */}
        <div className="space-y-2">
          <Label>Interview Type</Label>
          <Select
            value={settings.interviewType}
            onValueChange={(value) => updateSetting('interviewType', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">Confidence Check Interview</SelectItem>
              <SelectItem value="technical">Technical Interview</SelectItem>
              <SelectItem value="behavioral">Behavioral Interview</SelectItem>
              <SelectItem value="leadership">Leadership Interview</SelectItem>
              <SelectItem value="sales">Sales Interview</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Difficulty Level */}
        <div className="space-y-2">
          <Label>Difficulty Level</Label>
          <Select
            value={settings.difficulty}
            onValueChange={(value) => updateSetting('difficulty', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Duration */}
        <div className="space-y-3">
          <Label>Duration: {settings.duration} minutes</Label>
          <Slider
            value={[settings.duration]}
            onValueChange={(value) => updateSetting('duration', value[0])}
            max={60}
            min={10}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>10 min</span>
            <span>60 min</span>
          </div>
        </div>

        {/* Recording Options */}
        <div className="space-y-4">
          <Label>Recording Options</Label>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-normal">Include Video</Label>
              <p className="text-xs text-muted-foreground">
                Record video for body language analysis
              </p>
            </div>
            <Switch
              checked={settings.includeVideo}
              onCheckedChange={(checked) => updateSetting('includeVideo', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-normal">Include Audio</Label>
              <p className="text-xs text-muted-foreground">
                Record audio for speech analysis
              </p>
            </div>
            <Switch
              checked={settings.includeAudio}
              onCheckedChange={(checked) => updateSetting('includeAudio', checked)}
            />
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-muted/50 p-3 rounded-md">
          <h4 className="text-sm font-medium mb-2">Quick Tips</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Ensure good lighting for video recording</li>
            <li>• Use a quiet environment for clear audio</li>
            <li>• Test your camera and microphone first</li>
            <li>• Sit up straight and maintain eye contact</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
