import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { AuthLayout } from "@/components/auth-layout";
import { Checkbox } from "@/components/checkbox";
import { InteractiveHoverButton } from "@/components/interactive-hover-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
      <path
        fill="currentColor"
        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-76.2 76.2C322.3 113.2 289.4 96 248 96c-88.8 0-160.1 71.9-160.1 160.1s71.3 160.1 160.1 160.1c98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 26.9 3.9 41.4z"
      />
    </svg>
  );
}

export function LoginPage() {
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  return (
    <AuthLayout isTyping={emailFocused} showPassword={showPassword} passwordLength={password.length} passwordActive={passwordFocused}>
      <div className="mb-10 text-center">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">欢迎回来</h1>
        <p className="text-sm text-muted-foreground">继续查看你的求职计划</p>
      </div>

      <form className="space-y-5" onSubmit={(event) => event.preventDefault()}>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">邮箱地址</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            autoComplete="off"
            className="h-12 border-border/60 bg-background focus:border-primary"
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">登录密码</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="h-12 border-border/60 bg-background pr-10 focus:border-primary"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
            <button
              type="button"
              aria-label={showPassword ? "隐藏密码" : "显示密码"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setShowPassword((value) => !value)}
            >
              {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" checked={remember} onCheckedChange={setRemember} />
            <Label htmlFor="remember" className="cursor-pointer text-sm font-normal">在这台设备保持登录</Label>
          </div>
          <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">
            找回密码
          </Link>
        </div>

        <InteractiveHoverButton type="submit" text="进入账户" className="mt-5 h-12 w-full text-base font-medium" />
      </form>

      <div className="mt-6">
        <InteractiveHoverButton text="使用 Google 继续" icon={<GoogleIcon />} className="h-12 w-full border-border/60" />
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        还没有账户？{" "}
        <Link to="/signup" className="font-medium text-foreground hover:underline">立即创建</Link>
      </div>
    </AuthLayout>
  );
}

export function SignupPage() {
  const [role, setRole] = useState("employee");
  const [typing, setTyping] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  return (
    <AuthLayout isTyping={typing} showPassword={showPassword} passwordLength={password.length} passwordActive={passwordFocused}>
      <div className="mb-10 text-center">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">创建你的账户</h1>
        <p className="text-sm text-muted-foreground">保存职位偏好，开始规划下一步</p>
      </div>

      <form className="space-y-5" onSubmit={(event) => event.preventDefault()}>
        <div className="space-y-3">
          <Label className="text-sm font-medium">你想先完成什么？</Label>
          <div className="flex gap-4">
            {[
              ["employee", "找工作"],
              ["employer", "发布职位"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={`flex flex-1 items-center rounded-xl border px-4 py-3 text-left font-medium transition-colors hover:bg-muted/50 ${role === value ? "border-primary bg-primary/5" : "border-border"}`}
                onClick={() => setRole(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-sm font-medium">姓名或公司名称</Label>
          <Input id="fullName" type="text" placeholder="例如：李明 或 星河科技" autoComplete="off" className="h-12 border-border/60 bg-background focus:border-primary" onFocus={() => setTyping(true)} onBlur={() => setTyping(false)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="signupEmail" className="text-sm font-medium">邮箱地址</Label>
          <Input id="signupEmail" type="email" placeholder="name@example.com" autoComplete="off" className="h-12 border-border/60 bg-background focus:border-primary" onFocus={() => setTyping(true)} onBlur={() => setTyping(false)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="signupPassword" className="text-sm font-medium">设置密码</Label>
          <div className="relative">
            <Input id="signupPassword" type={showPassword ? "text" : "password"} placeholder="••••••••" className="h-12 border-border/60 bg-background pr-10 focus:border-primary" value={password} onChange={(event) => setPassword(event.target.value)} onFocus={() => setPasswordFocused(true)} onBlur={() => setPasswordFocused(false)} />
            <button type="button" aria-label={showPassword ? "隐藏密码" : "显示密码"} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground" onClick={() => setShowPassword((value) => !value)}>
              {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="privacy-terms" checked={agreed} onCheckedChange={setAgreed} required />
          <Label htmlFor="privacy-terms" className="cursor-pointer text-sm font-normal">
            我已阅读并同意 <Link to="/privacy-policy" className="mx-1 text-primary underline">隐私说明</Link> 和
            <Link to="/terms" className="mx-1 text-primary underline">使用条款</Link>
          </Label>
        </div>

        <InteractiveHoverButton type="submit" text="开始使用" className="h-12 w-full text-base font-medium" />
      </form>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        已有账户？{" "}
        <Link to="/login" className="font-medium text-foreground hover:underline">去登录</Link>
      </div>
    </AuthLayout>
  );
}

export function ForgotPasswordPage() {
  const [emailFocused, setEmailFocused] = useState(false);

  return (
    <AuthLayout isTyping={emailFocused} showPassword={false} passwordLength={0}>
      <div className="mb-10 text-center">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">重设密码</h1>
        <p className="text-sm text-muted-foreground">输入注册邮箱，我们会发送重设链接</p>
      </div>

      <form className="space-y-5" onSubmit={(event) => event.preventDefault()}>
        <div className="space-y-2">
          <Label htmlFor="resetEmail" className="text-sm font-medium">邮箱地址</Label>
          <Input
            id="resetEmail"
            type="email"
            placeholder="name@example.com"
            autoComplete="off"
            className="h-12 border-border/60 bg-background focus:border-primary"
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
          />
        </div>

        <InteractiveHoverButton type="submit" text="发送重设链接" className="h-12 w-full text-base font-medium" />
      </form>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        想起密码了？{" "}
        <Link to="/login" className="font-medium text-foreground hover:underline">返回登录</Link>
      </div>
    </AuthLayout>
  );
}
