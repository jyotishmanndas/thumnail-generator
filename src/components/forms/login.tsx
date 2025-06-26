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
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader } from "lucide-react";

export function LoginForm() {

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    try {
      setLoading(true);
      const signInResponse = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false
      });

      if (signInResponse?.ok) {
        toast.success("Login successfully");
        form.reset();
        router.push("/dashboard");
      } else {
        if (signInResponse?.error) {
          toast.error(signInResponse.error);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while logging in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          {loading && (
            <Loader className="w-4 h-4 animate-spin" />
          )}
         Log In
        </Button>
      </form>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </Form>
  )
}