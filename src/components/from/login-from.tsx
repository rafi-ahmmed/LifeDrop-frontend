"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building2,
  Eye,
  EyeClosed,
  EyeOff,
  LogIn,
  ShieldCheck,
  TriangleAlert,
  UserCheck,
} from "lucide-react";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { type LoginInput, loginZodSchema } from "@/validation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginZodSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<LoginInput> = (data) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-5", className)}
    >
      <FieldGroup>
        {/* Welcome Header */}
        <div className="flex flex-col items-center gap-1.5 text-center pb-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
            Welcome Back 👋
          </span>
          <h1 className="text-2xl font-bold tracking-tight">
            Login to your account
          </h1>
          <p className="text-xs text-muted-foreground">
            Enter your credentials or use quick demo logins below
          </p>
        </div>

        {/* Email Field */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            {...register("email", { required: true })}
            id="email"
            type="email"
            placeholder="m@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-[12px] flex items-center justify-start gap-1">
              <TriangleAlert size={13} /> {errors.email.message}
            </p>
          )}
        </Field>

        {/* Password Field */}
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            {/* <a
      href="#forgot-password"
      className="ml-auto text-xs text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
    >
      Forgot password?
    </a> */}
          </div>

         
          <div className="relative">
            <Input
              {...register("password", { required: true })}
              id="password"
              type={showPassword ? "text" : "password"}
              className="pr-10" 
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-[12px] flex items-center justify-start gap-1 mt-1">
              <TriangleAlert size={13} /> {errors.password.message}
            </p>
          )}
        </Field>

        {/* Primary Login Button */}
        <Field className="pt-1">
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-sm"
          >
            <LogIn className="w-4 h-4 mr-2" /> Login
          </Button>
        </Field>

        <FieldSeparator>Or quick demo login</FieldSeparator>

        {/* Quick Demo Login Grid (Admin, User, Provider) */}
        <div className="grid grid-cols-3 gap-2">
          {/* Admin Demo */}
          <button
            type="button"
            className="flex flex-col items-center justify-center p-2.5 rounded-lg border border-border bg-card hover:bg-accent/50 hover:border-primary/50 transition-all text-center group"
            onClick={() => {
              // Handle admin demo login fill logic here if needed
            }}
          >
            <ShieldCheck className="w-4 h-4 text-primary mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-foreground">Admin</span>
          </button>

          {/* User Demo */}
          <button
            type="button"
            className="flex flex-col items-center justify-center p-2.5 rounded-lg border border-border bg-card hover:bg-accent/50 hover:border-primary/50 transition-all text-center group"
            onClick={() => {
              // Handle user demo login fill logic here if needed
            }}
          >
            <UserCheck className="w-4 h-4 text-primary mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-foreground">User</span>
          </button>

          {/* Provider / Hospital Demo */}
          <button
            type="button"
            className="flex flex-col items-center justify-center p-2.5 rounded-lg border border-border bg-card hover:bg-accent/50 hover:border-primary/50 transition-all text-center group"
            onClick={() => {
              // Handle provider demo login fill logic here if needed
            }}
          >
            <Building2 className="w-4 h-4 text-primary mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-foreground">Donor</span>
          </button>
        </div>

        <FieldSeparator>Or connect with</FieldSeparator>

        {/* Google Login Button */}
        <Field>
          <Button
            variant="outline"
            type="button"
            className="w-full flex items-center justify-center gap-2 border-border hover:bg-accent"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" aria-label="Google">
              <title>Google</title>
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.18v3.15C3.18 21.34 7.22 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.18C.43 8.13 0 9.87 0 12s.43 3.87 1.18 5.39l4.09-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.22 0 3.18 2.66 1.18 6.61l4.09 3.15c.95-2.85 3.6-4.96 6.73-4.96z"
              />
            </svg>
            Continue with Google
          </Button>

          {/* Sign Up Link */}
          <FieldDescription className="text-center pt-2 text-xs">
            Don&apos;t have an account?{" "}
            <a
              href="/register"
              className="text-primary font-medium underline underline-offset-4 hover:underline"
            >
              Sign up
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
