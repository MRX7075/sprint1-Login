import { useState } from "react";
import cruiseImage from "@/assets/curiseImageHD.png";
import logo from "@/assets/logo.png";
import LoginForm from "@/components/LoginForm";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";

const Login = () => {
  const [view, setView] = useState<"login" | "forgot">("login");

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Side - Form */}
      <div className="relative z-20 flex w-full flex-col justify-start bg-[#f1f2f5] px-8 py-5 md:w-[40%] lg:px-12 overflow-y-auto">
        {/* Blue accent shapes */}
        <div className="absolute left-0 top-0 h-32 w-10 rounded-br-full bg-primary" />
        
        {/* Brand Header */}
        <div className="relative flex items-center gap-2 mb-8">
          <img src={logo} alt="iCruiseEgypt" className="h-9 w-9 rounded-lg" />
          <div>
            <h2 className="text-sm font-bold text-primary">iCruiseEgypt</h2>
            <p className="text-xs text-muted-foreground">AI-Powered</p>
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="flex flex-1 flex-col justify-center">
          {view === "login" ? (
            <LoginForm onForgotPassword={() => setView("forgot")} />
          ) : (
            <ForgotPasswordForm onBackToLogin={() => setView("login")} />
          )}
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="relative hidden md:block md:w-[60%] overflow-hidden">
        <img src={cruiseImage} alt="Cruise ship" className="h-full w-full object-cover" style={{ aspectRatio: '1173/1620' }} />
      </div>
    </div>
  );
};

export default Login;
