"use client";

import { TRPCReactProvider } from "@/trpc/client";
import { SessionProvider } from "next-auth/react";

export function Provider({ children }: { children: React.ReactNode }) {

    return (
        <SessionProvider>
            <TRPCReactProvider>
                {children}
            </TRPCReactProvider>
        </SessionProvider>
    )
}