"use client";

import { TRPCReactProvider } from "@/trpc/client";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export function Provider({ children }: { children: React.ReactNode }) {

    return (
        <SessionProvider>
            <TRPCReactProvider>
                <Toaster />
                {children}
            </TRPCReactProvider>
        </SessionProvider>
    )
}