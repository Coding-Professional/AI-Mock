import { PublicNavbar } from "@/components/public-navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Users, Target, Zap, ArrowRight, CheckCircle } from 'lucide-react'
import Link from "next/link"

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <PublicNavbar />

            <main className="container mx-auto px-4 py-16">
                {/* Hero Section */}
                <div className="text-center space-y-6 mb-16">
                    <div className="flex justify-center mb-6">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                            <Brain className="h-8 w-8" />
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        Master Your Next
                        <span className="text-primary block">Interview</span>
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Practice with AI-powered mock interviews, get personalized feedback,
                        and land your dream job with confidence.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                        <Button size="lg" asChild>
                            <Link href="/login">
                                Get Started Free
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button variant="outline" size="lg">
                            Watch Demo
                        </Button>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <Card className="text-center">
                        <CardHeader>
                            <div className="flex justify-center mb-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                                    <Brain className="h-6 w-6" />
                                </div>
                            </div>
                            <CardTitle>AI-Powered Interviews</CardTitle>
                            <CardDescription>
                                Practice with advanced AI that adapts to your responses and provides realistic interview scenarios
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className="text-center">
                        <CardHeader>
                            <div className="flex justify-center mb-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600">
                                    <Target className="h-6 w-6" />
                                </div>
                            </div>
                            <CardTitle>Personalized Feedback</CardTitle>
                            <CardDescription>
                                Get detailed analysis of your performance with actionable insights to improve your interview skills
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className="text-center">
                        <CardHeader>
                            <div className="flex justify-center mb-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                                    <Zap className="h-6 w-6" />
                                </div>
                            </div>
                            <CardTitle>Industry-Specific</CardTitle>
                            <CardDescription>
                                Practice with questions tailored to your industry, role, and experience level for maximum relevance
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>

                {/* Stats Section */}
                <div className="bg-primary/5 rounded-2xl p-8 mb-16">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold text-primary">10K+</div>
                            <div className="text-muted-foreground">Interviews Completed</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-primary">95%</div>
                            <div className="text-muted-foreground">Success Rate</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-primary">500+</div>
                            <div className="text-muted-foreground">Companies</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-primary">24/7</div>
                            <div className="text-muted-foreground">Available</div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center space-y-6">
                    <h2 className="text-3xl font-bold">Ready to ace your next interview?</h2>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        Join thousands of professionals who have improved their interview skills with AI Mock
                    </p>
                    <Button size="lg" asChild>
                        <Link href="/login">
                            Start Practicing Now
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </main>
        </div>
    )
}
