"use client";

import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { registerSchema } from "@/lib/schema";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function SignUpForm() {

    const trpc = useTRPC()
    const router = useRouter();

    const form = useForm<z.infer<typeof registerSchema>>({
        mode: "all",
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });

    const signUpMutation = useMutation(trpc.auth.signup.mutationOptions({
        onSuccess: async (data) => {
            if (data) {
                try {
                    const signInResponse = await signIn("credentials", {
                        email: form.getValues().email,
                        password: form.getValues().password,
                        redirect: false
                    })

                    if (signInResponse?.ok) {
                        toast.success("Account created successfully!");
                        form.reset()
                        router.push("/dashboard");
                    }
                } catch (error) {
                    toast.error("Authentication error occurred after signup");
                    console.error("Sign-in error:", error);
                }
            }
        },
        onError: (error) => {
            if (error.data?.code === "CONFLICT") {
                toast.error("User with this email already exists.");
            } else {
                toast.error("An error occurred while signing up.");
            }
        }
    }))

    async function onSubmit(values: z.infer<typeof registerSchema>) {
        signUpMutation.mutate({
            email: values.email,
            password: values.password
        })
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Create an account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="jhondoe@example.com" {...field} className="focus-visible:ring-0 focus-visible:ring-offset-0" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="*********" type="password" {...field} className="focus-visible:ring-0 focus-visible:ring-offset-0" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={signUpMutation.isPending}>
                                Submit
                            </Button>
                        </form>
                    </Form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <Separator className="w-full" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-white px-2 text-sm text-muted-foreground">or</span>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <Button variant="outline" className="w-full">
                            <svg
                                className="mr-2 h-5 w-5"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill="#4285F4"
                                    d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82Z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.565 24 12.255 24Z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 0 0 0 10.76l3.98-3.09Z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96Z"
                                />
                            </svg>
                            Continue with Google
                        </Button>
                        <Button variant="outline" className="w-full">
                            <svg
                                className="mr-2 h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                            </svg>
                            Continue with Github
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/login" className="underline underline-offset-4">
                            login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}