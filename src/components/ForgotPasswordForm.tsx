import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Mail, Lock, ThumbsUp, Eye, EyeOff } from "lucide-react";
import logo from "@/assets/logo.png";

import { motion } from "framer-motion";
import Confetti from "react-confetti";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

/* ---------------- ZOD SCHEMAS ---------------- */

const emailSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
});

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8-12 characters")
      .max(128),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Both Passwords must match",
    path: ["confirmPassword"],
  });

type EmailFormValues = z.infer<typeof emailSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

const ForgotPasswordForm = ({ onBackToLogin }: ForgotPasswordFormProps) => {
  const [step, setStep] = useState<"email" | "otp" | "createPassword">("email");
  const [otp, setOtp] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    mode: "onChange",
    defaultValues: { email: "" },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
    defaultValues: { password: "", confirmPassword: "" },
  });

  const isOtpDisabled = otp.length < 6;

  const handleOtpChange = (value: string) => {
    const numericOnly = value.replace(/\D/g, "");
    setOtp(numericOnly);
  };

  const handleEmailSubmit = (data: EmailFormValues) => {
    console.log("Email submitted:", data.email);
    setStep("otp");
  };

  const handlePasswordSubmit = (data: PasswordFormValues) => {
    console.log("Password changed:", data.password);
    setShowSuccess(true);
  };

  return (
    <>
      {/* Header */}
      <div className="mb-6 flex flex-col items-center text-center">
        <img src={logo} alt="logo" className="h-12 w-12 rounded-xl mb-2" />

        <h1 className="text-2xl font-bold">
          {step === "email" && "Forgot Password"}
          {step === "otp" && "Verify OTP"}
          {step === "createPassword" && "Create New Password"}
        </h1>

        <p className="text-sm text-muted-foreground mt-1">
          {step === "email" && "Enter your registered email to recover your account"}
          {step === "otp" && "Enter the OTP sent to your email"}
          {step === "createPassword" &&
            "Your New Password must be different from previous used passwords"}
        </p>
      </div>

      <div className="max-w-md space-y-4">

        {/* EMAIL STEP */}
        {step === "email" && (
          <Form {...emailForm}>
            <form
              onSubmit={emailForm.handleSubmit(handleEmailSubmit)}
              className="space-y-4"
            >
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <label className="text-xs font-semibold">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="example@gmail.com"
                          className="pl-9"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-[#6F6F6F] text-sm mt-1" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                variant="cruise"
                className="w-full"
                disabled={!emailForm.formState.isValid}
              >
                Get OTP
              </Button>
            </form>
          </Form>
        )}

        {/* OTP STEP */}
        {step === "otp" && (
          <div>
            <label className="text-xs font-semibold mb-1 block">
              Enter OTP Received
            </label>

            <InputOTP maxLength={6} value={otp} onChange={handleOtpChange}>
              <InputOTPGroup className="gap-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="border border-black rounded-md w-10 h-10 text-center focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>

            <Button
              className="w-full mt-3"
              variant="cruise"
              disabled={isOtpDisabled}
              onClick={() => setStep("createPassword")}
            >
              Verify OTP
            </Button>
          </div>
        )}

        {/* PASSWORD STEP */}
        {step === "createPassword" && (
          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
              className="space-y-4"
            >
              {/* New Password */}
              <FormField
                control={passwordForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <label className="text-xs font-semibold">New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-9 pr-10"
                          {...field}
                        />
                      </FormControl>

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <FormMessage className="text-[#6F6F6F] text-sm mt-1" />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <label className="text-xs font-semibold">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                      <FormControl>
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-9 pr-10"
                          {...field}
                        />
                      </FormControl>

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    <FormMessage className="text-[#6F6F6F] text-sm mt-1" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                variant="cruise"
                className="w-full"
                disabled={!passwordForm.formState.isValid}
              >
                Reset Password
              </Button>
            </form>
          </Form>
        )}
      </div>

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <>
          <Confetti numberOfPieces={200} recycle={false} />

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-[380px] rounded-2xl bg-white p-8 text-center shadow-2xl"
            >
              <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>

              <p className="text-sm text-muted-foreground">
                Your Password has been changed successfully
              </p>

              {/* Animated Thumbs Up */}
              <div className="flex justify-center my-6">
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 12,
                    delay: 0.2,
                  }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100"
                >
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatDelay: 1.5,
                    }}
                  >
                    <ThumbsUp className="h-10 w-10 text-blue-600" />
                  </motion.div>
                </motion.div>
              </div>

              <p className="text-sm text-muted-foreground">
                Continue with login to view information
              </p>

              <Button
                className="mt-6 w-full"
                variant="cruise"
                onClick={onBackToLogin}
              >
                Go to Login
              </Button>
            </motion.div>
          </div>
        </>
      )}
    </>
  );
};

export default ForgotPasswordForm;