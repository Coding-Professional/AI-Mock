"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { UserDropdown } from "@/components/user-dropdown"
import { Button } from "@/components/ui/button"
import { Bell, Loader2, Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { signOut } from "next-auth/react"

export function Navbar() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSignOut = async () => {
    setLoading(true)
    await signOut({ redirect: false })
    router.replace("/login")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-6 gap-4">
        <SidebarTrigger className="md:hidden" />
        
        <div className="flex-1 flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 max-w-sm w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search interviews, projects..." 
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
              2
            </span>
            <span className="sr-only">Notifications</span>
          </Button>
          
          <UserDropdown />
        </div>
               <div className="flex justify-between items-center">
          <Button variant="outline" onClick={handleSignOut} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign Out"}
          </Button>
        </div>
      </div>
      
    </header>
  )
}
