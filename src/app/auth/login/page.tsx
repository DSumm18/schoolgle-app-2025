import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Schoolgle</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Sign in to access your school management dashboard
        </p>
      </div>
      <LoginForm />
    </div>
  )
}