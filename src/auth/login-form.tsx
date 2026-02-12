import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function LoginForm() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-sm border-border shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-foreground">Login</CardTitle>
          <p className="text-sm text-muted-foreground">Enter your credentials to access your Dashboard</p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="Enter your email"
              className="border-input focus:ring-[--brand-green]"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="border-input focus:ring-[--brand-green]"
            />
            <div className="text-right">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-[--brand-green] hover:underline transition-colors"
              >
                Forgot password?
              </a>
            </div>
          </div>

          {/* Login Button */}
          <Button 
            className="w-full bg-brand-green hover:bg-brand-green/90 text-white cursor-pointer font-medium transition-colors"
          >
            Login
          </Button>

          
        </CardContent>
      </Card>
    </div>
  )
}