import { Link, Navigate, Route, Routes } from "react-router-dom";
import { ForgotPasswordPage, LoginPage, SignupPage } from "@/pages/auth-pages";

function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-8 text-center text-foreground">
      <div>
        <h1 className="mb-3 text-3xl font-bold">页面不存在</h1>
        <Link className="text-sm font-medium text-primary hover:underline" to="/login">
          返回登录
        </Link>
      </div>
    </main>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/auth" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
