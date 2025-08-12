// mene hi*a kr dekha tha automatic loose hone lagta h vo 
"use client"

import { useState, useEffect, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { signIn, getSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Loader2, Mail, Lock } from "lucide-react"
import { ButtonLoader, PageLoader } from "@/components/ui/loader"
import { Brain } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getSession().then(session => {
      if (session) {
        router.replace("/dashboard")
      }
    })
  }, [router])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Backend verification
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: data?.message || "Invalid credentials",
          duration: 3000,
        })
        setLoading(false)
        return
      }
      // NextAuth signIn
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })
      if (result?.error) {
        toast({
          variant: "warning",
          title: "Authentication Error",
          description: result.error,
          duration: 3000,
        })
        setLoading(false)
        return
      }
      router.replace("/dashboard")
    } catch (err: any) {
      toast({
        variant: "info",
        title: "Connection Error",
        description: "Something went wrong. Please try again.",
        duration: 3000,
      })
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <div className="flex justify-center mb-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Brain className="h-6 w-6" />
              </div>
            </div>
            <CardTitle className="text-center">Sign in to your account</CardTitle>
            <CardDescription className="text-center" >Welcome back! Please enter your credentials.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Lock className="mr-2 h-4 w-4" />
                )}
                Sign In
              </Button>
            </form>
            <div className="my-6 flex items-center gap-2">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">OR</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                className="w-full"
                type="button"
                onClick={() => signIn("google")}
                disabled={loading}
              >
                {/* <Google className="mr-2 h-4 w-4" /> */}
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
                Continue with Google
              </Button>
              <Button
                variant="outline"
                className="w-full"
                type="button"
                onClick={() => signIn("azure-ad")}
                disabled={loading}
              >
                <span className="mr-2 h-4 w-4 inline-block align-middle">
                  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                    <rect width="7" height="7" x="0" y="0" fill="#F35325" />
                    <rect width="7" height="7" x="9" y="0" fill="#81BC06" />
                    <rect width="7" height="7" x="0" y="9" fill="#05A6F0" />
                    <rect width="7" height="7" x="9" y="9" fill="#FFBA08" />
                  </svg>
                </span>
                Continue with Microsoft
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className=" bg-transparent p-4">
        <div className="text-center text-xs text-muted-foreground space-x-4">
          <a href="/terms" className="hover:text-foreground hover:underline">
            Terms of use
          </a>
          <span>|</span>
          <a href="/privacy" className="hover:text-foreground hover:underline">
            Privacy policy
          </a>
        </div>
      </footer>

      {/* Loading Overlay */}
      {loading && (
        <PageLoader
          text="Signing you in..."
          variant="brain"
        />
      )}
    </div>

  )
}
