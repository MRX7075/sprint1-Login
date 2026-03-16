import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import logo from "@/assets/logo.png";

interface LoginFormProps {
  onForgotPassword: () => void;
}

/* ------------------ ZOD SCHEMA ------------------ */
const loginSchema = z.object({
  role: z.enum(["partner", "admin"]),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(255)
    .refine((email) => email.endsWith("@gmail.com"), {
      message: "Only Gmail addresses are allowed",
    }),
  password: z
    .string()
    .min(8, "Password must be at least 8-12 characters")
    .max(128),
  remember: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

/* ------------------ COMPONENT ------------------ */
const LoginForm = ({ onForgotPassword }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      role: "partner", // ✅ Add role default
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login data:", data);
    navigate("/dashboard");
  };

  return (
    <>
      {/* Welcome Section */}
<div className="mb-6 flex flex-col items-center text-center">
  {/* Logo */}
  <img
    src={logo}
    alt="iCruiseEgypt"
    className="h-16 w-16 rounded-xl mb-3" // slightly bigger logo
  />

  {/* Main Title */}
  <h1 className="text-3xl font-bold text-foreground"> {/* bigger font */}
    Welcome to iCruise
  </h1>

  {/* Subtext */}
  <p className="mt-1 text-sm text-muted-foreground">
    Login to access your iCruiseEgypt account
  </p>
</div>

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-md space-y-4"
        >
          {/* Role Select */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <label className="mb-1.5 block text-xs font-semibold text-foreground">
                  Select Role to Login
                </label>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="h-10 rounded-lg border-input text-sm">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="partner">Partner</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-[#6F6F6F] text-sm mt-1" />
              </FormItem>
            )}
          />

          {/* EMAIL FIELD */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <label className="mb-1.5 block text-xs font-semibold text-foreground">
                  Email Address
                </label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@gmail.com"
                      className="h-10 rounded-lg border-input pl-9 text-sm"
                      {...field}
                    />
                  </FormControl>
                </div>

                <FormMessage className="text-[#6F6F6F] text-sm mt-1" />
              </FormItem>
            )}
          />

          {/* PASSWORD FIELD */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <label className="mb-1.5 block text-xs font-semibold text-foreground">
                  Password
                </label>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="h-10 rounded-lg border-input pl-9 pr-9 text-sm"
                      {...field}
                    />
                  </FormControl>

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                <FormMessage className="text-[#6F6F6F] text-sm mt-1" />
              </FormItem>
            )}
          />

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={form.watch("remember")}
                onCheckedChange={(checked) =>
                  form.setValue("remember", Boolean(checked))
                }
              />
              <label
                htmlFor="remember"
                className="text-xs text-foreground cursor-pointer"
              >
                Remember me
              </label>
            </div>

            <button
              type="button"
              onClick={onForgotPassword}
              className="text-xs font-medium text-[#FF8682] hover:text-[#FF8682]/80"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            variant="cruise"
            className="h-10 w-full text-sm"
            disabled={!form.formState.isValid} // ✅ now works
          >
            Login to Your Account
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">
              Or login with
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <Button variant="social" className="h-10">
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path fill="#F25022" d="M1 1h10v10H1z" />
                <path fill="#00A4EF" d="M1 13h10v10H1z" />
                <path fill="#7FBA00" d="M13 1h10v10H13z" />
                <path fill="#FFB900" d="M13 13h10v10H13z" />
              </svg>
            </Button>

            <Button variant="social" className="h-10">
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            </Button>

            <Button variant="social" className="h-10">
              <svg
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83" />
              </svg>
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;