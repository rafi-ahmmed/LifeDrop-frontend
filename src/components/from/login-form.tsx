"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building2,
  Eye,
  EyeClosed,
  ShieldCheck,
  TriangleAlert,
  UserCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { FetchError } from "ofetch";
import { Suspense, useState } from "react";
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
import { useLogin } from "@/hooks";
import { cn } from "@/lib/utils";
import type { LoginInput } from "@/types";
import { loginZodSchema } from "@/validation";
import GoogleLoginBtn from "../google-login/GoogleLoginBtn";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: Login, isPending: loginPending } = useLogin();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginInput>({
    defaultValues: {
      email: "admin@gmail.com",
      password: "@admin12345",
    },
    resolver: zodResolver(loginZodSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    const loginData = {
      email: data.email,
      password: data.password,
    };

    Login(loginData, {
      onSuccess: (res) => {
        console.log(res);
        router.push("/");
        toast.add({
          title: "Login Successful",
          description: "You are now logged in",
          type: "success",
        });
      },
      onError: (err) => {
        console.log(err);
        const message =
          err instanceof FetchError
            ? err.data?.message || err.message
            : "Something went wrong";
        toast.add({
          title: message,
          description: "Please try again",
          type: "error",
        });
      },
    });
  };

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
            disabled={loginPending}
          >
            {loginPending ? (
              <>
                <Spinner /> Loading...
              </>
            ) : (
              <> Login</>
            )}
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
        {/* Google Login Button */}
        <Suspense fallback={<div>Loading...</div>}>
          <GoogleLoginBtn />
        </Suspense>
        <FieldDescription className="text-center pt-2 text-xs">
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="text-primary font-medium underline underline-offset-4 hover:underline"
          >
            Sign up
          </a>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
