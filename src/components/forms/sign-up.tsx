"use client";

import { Button } from "../ui/button";
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
import Link from "next/link";
import { registerSchema } from "@/lib/schema";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

export function SignUpForm() {

    const trpc = useTRPC();
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
            };
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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="jhondoe@example.com" {...field} />
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
                                    <Input placeholder="******" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button className="w-full cursor-pointer" type="submit">
                    {signUpMutation.isPending && (
                        <Loader className="w-4 h-4 animate-spin" />
                    )}
                    Sign Up
                </Button>
            </form>
            <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                    Login
                </Link>
            </div>
        </Form>
    )
}