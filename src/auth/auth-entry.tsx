import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import SignInForm from "@/components/customer/register-form";

export default function AuthEntry() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();
  const [signupOpen, setSignupOpen] = useState(false);
  const [signinOpen, setSigninOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-sm border-border shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold text-foreground">
            Welcome
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Get started with our platform
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <Popover open={signupOpen} onOpenChange={setSignupOpen}>
            <PopoverTrigger asChild>
              <Button
                onClick={() => setSignupOpen(true)}
                className="w-full bg-brand-green hover:bg-brand-green/90 text-white cursor-pointer font-medium transition-colors py-6 text-base"
              >
                Create New Account
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0">
              <SignInForm initialTab="signup" />
            </PopoverContent>
          </Popover>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>

          <Popover open={signinOpen} onOpenChange={setSigninOpen}>
            <PopoverTrigger asChild>
              <Button
                onClick={() => setSigninOpen(true)}
                variant="outline"
                className="w-full border-border hover:bg-muted cursor-pointer font-medium transition-colors py-6 text-base"
              >
                Sign In
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0">
              <SignInForm initialTab="signin" />
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>
    </div>
  );
}
