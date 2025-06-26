import { LoginForm } from "@/components/forms/login"

export default function LoginPage() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-xs">
                <div className=" flex flex-col gap-2 items-center mb-7">
                    <h1 className="text-2xl font-semibold">Login to your account</h1>
                    <p className="text-muted-foreground text-sm text-balance">Enter your email below to login to your account</p>
                </div>
                <LoginForm />
            </div>
        </div>
    )
}
