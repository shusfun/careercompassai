import { Link } from "react-router-dom";
import { Github } from "lucide-react";
import { BrandLink } from "@/components/brand";
import { AuthIllustration } from "@/components/auth-illustration";

export function AuthLayout({ children, isTyping, showPassword, passwordLength, passwordActive }) {
  return (
    <div className="grid min-h-dvh lg:h-dvh lg:grid-cols-2 lg:overflow-hidden">
      <a
        href="https://github.com/shusfun/careercompassai"
        target="_blank"
        rel="noreferrer"
        aria-label="查看 GitHub 仓库"
        className="fixed right-4 top-4 z-50 inline-flex h-9 items-center justify-center gap-2 rounded-full border border-white/10 bg-stone-950/45 px-3 text-stone-100 shadow-[0_8px_24px_rgba(0,0,0,.18)] backdrop-blur-md transition-all duration-200 hover:border-white/20 hover:bg-stone-900/70 hover:text-white lg:right-6 lg:top-6 dark:border-white/10"
      >
        <Github className="size-4" aria-hidden="true" />
        <span className="hidden text-xs font-medium leading-none sm:inline">GitHub</span>
      </a>
      <div className="relative hidden flex-col justify-between bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 p-12 text-white lg:flex dark:from-white/90 dark:via-white/80 dark:to-white/70 dark:text-gray-900">
        <div className="relative z-20">
          <BrandLink />
        </div>
        <div className="relative z-20 flex h-[500px] items-end justify-center">
          <AuthIllustration isTyping={isTyping} showPassword={showPassword} passwordLength={passwordLength} passwordActive={passwordActive} />
        </div>
        <div className="relative z-20 flex items-center gap-8 text-sm text-gray-600 dark:text-gray-700">
          <Link to="/privacy-policy" className="transition-colors hover:text-gray-900 dark:hover:text-black">
            隐私说明
          </Link>
          <Link to="/terms" className="transition-colors hover:text-gray-900 dark:hover:text-black">
            使用条款
          </Link>
        </div>
        <div className="bg-grid-white/[0.05] absolute inset-0 bg-[size:20px_20px]" />
        <div className="absolute right-1/4 top-1/4 size-64 rounded-full bg-gray-400/20 blur-3xl dark:bg-gray-300/30" />
        <div className="absolute bottom-1/4 left-1/4 size-96 rounded-full bg-gray-300/20 blur-3xl dark:bg-gray-200/20" />
      </div>
      <div className="flex min-h-dvh items-center justify-center bg-background px-6 py-8 sm:p-8 lg:min-h-0 lg:overflow-y-auto">
        <div className="w-full max-w-[420px]">
          <div className="mb-12 flex items-center justify-center gap-2 text-lg font-semibold lg:hidden">
            <BrandLink centered />
          </div>
          <div className="auth-panel-enter">{children}</div>
        </div>
      </div>
    </div>
  );
}
