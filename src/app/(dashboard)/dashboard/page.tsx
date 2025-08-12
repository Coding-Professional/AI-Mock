import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, FileText, Play, TrendingUp, Clock, CheckCircle, ArrowRight } from 'lucide-react'
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/(auth)/[...nextauth]/route"
const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" }
]

export default async function DashboardPage() {
    const session = await getServerSession(authOptions)

    return (
        <div className="space-y-6">
            <BreadcrumbNav items={breadcrumbItems} />

            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Welcome back, Alex!</h1>
                <p className="text-muted-foreground">
                    Ready to ace your next interview? Let&apos;s continue your preparation journey
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Interviews Completed
                        </CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">
                            +2 from last week
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Average Score
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">85%</div>
                        <p className="text-xs text-muted-foreground">
                            +5% from last week
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Practice Time
                        </CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24h</div>
                        <p className="text-xs text-muted-foreground">
                            This month
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Skill Level
                        </CardTitle>
                        <Brain className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Advanced</div>
                        <p className="text-xs text-muted-foreground">
                            Keep it up!
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Play className="h-5 w-5" />
                            Quick Start
                        </CardTitle>
                        <CardDescription>
                            Jump into a practice session or continue where you left off
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button className="w-full" size="lg">
                            <Play className="mr-2 h-4 w-4" />
                            Start AI Interview
                        </Button>
                        <Button variant="outline" className="w-full">
                            <FileText className="mr-2 h-4 w-4" />
                            Upload Resume
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Progress</CardTitle>
                        <CardDescription>
                            Your improvement over the last few sessions
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span>Communication Skills</span>
                                <span>92%</span>
                            </div>
                            <Progress value={92} className="h-2" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span>Technical Knowledge</span>
                                <span>78%</span>
                            </div>
                            <Progress value={78} className="h-2" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span>Problem Solving</span>
                                <span>85%</span>
                            </div>
                            <Progress value={85} className="h-2" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Sessions */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Interview Sessions</CardTitle>
                    <CardDescription>
                        Review your past performance and identify areas for improvement
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { title: "Software Engineer - Frontend", score: 88, date: "2 days ago", status: "completed" },
                            { title: "Product Manager", score: 92, date: "5 days ago", status: "completed" },
                            { title: "Data Scientist", score: 76, date: "1 week ago", status: "completed" },
                        ].map((session, index) => (
                            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="space-y-1">
                                    <h4 className="font-medium">{session.title}</h4>
                                    <p className="text-sm text-muted-foreground">{session.date}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Badge variant={session.score >= 85 ? "default" : "secondary"}>
                                        {session.score}%
                                    </Badge>
                                    <Button variant="ghost" size="sm">
                                        Review
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
