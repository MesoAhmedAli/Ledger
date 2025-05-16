
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const signupSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const { signup, loading, error: authError } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  React.useEffect(() => {
    if (authError) {
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: authError.message || "An unexpected error occurred.",
      });
    }
  }, [authError, toast]);

  async function onSubmit(data: SignupFormValues) {
    setIsSubmitting(true);
    const user = await signup(data.email, data.password);
    if (user) {
      toast({
        title: "Signup Successful",
        description: "Welcome! Your account has been created.",
      });
      router.push("/"); // Redirect to dashboard
    }
    // Error is handled by the useEffect hook listening to authError
    setIsSubmitting(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <UserPlus className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl">Create an Account</CardTitle>
          <CardDescription>Join Ledger Lite to manage your finances.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" disabled={loading || isSubmitting} className="w-full">
                {(loading || isSubmitting) ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Account...</>
                ) : (
                  "Sign Up"
                )}
              </Button>
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Button variant="link" asChild className="p-0 h-auto">
                  <Link href="/login">Log in</Link>
                </Button>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
