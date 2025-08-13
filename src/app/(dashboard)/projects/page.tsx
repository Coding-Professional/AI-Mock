import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, FolderOpen, Calendar, Users } from 'lucide-react'

const breadcrumbItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Projects" }
]

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      name: "Frontend Developer Interview Prep",
      description: "Comprehensive preparation for React and JavaScript interviews",
      status: "active",
      interviews: 8,
      lastActivity: "2 days ago"
    },
    {
      id: 2,
      name: "Product Manager Role",
      description: "Strategic thinking and product management scenarios",
      status: "completed",
      interviews: 12,
      lastActivity: "1 week ago"
    },
    {
      id: 3,
      name: "Data Science Position",
      description: "Machine learning and statistical analysis questions",
      status: "draft",
      interviews: 3,
      lastActivity: "3 days ago"
    }
  ]

  return (
    <div className="space-y-6">
      <BreadcrumbNav items={breadcrumbItems} />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Organize your interview preparation by role or company
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <FolderOpen className="h-8 w-8 text-muted-foreground" />
                <Badge
                  variant={
                    project.status === 'active' ? 'default' :
                      project.status === 'completed' ? 'secondary' :
                        'outline'
                  }
                >
                  {project.status}
                </Badge>
              </div>
              <CardTitle className="line-clamp-2">{project.name}</CardTitle>
              <CardDescription className="line-clamp-3">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {project.interviews} interviews.
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {project.lastActivity}
                </div>
              </div>
              <Button className="w-full" variant="outline">
                Open Project
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
