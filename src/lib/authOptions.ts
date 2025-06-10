import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./db";
import bcrypt from "bcryptjs";
import { registerSchema } from "./schema";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const { email, password } = await registerSchema.parseAsync(credentials)

                if (!email || !password) {
                    throw new Error("Email and password are required");
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: email
                    }
                })

                if (!user || !user.password) {
                    throw new Error("User not found with this email");
                }

                const passwordMatch = await bcrypt.compare(password, user.password);

                if (!passwordMatch) {
                    throw new Error("Invalid password")
                }

                return {
                    id: user.id,
                    email: user.email,
                }
            }
        })
    ],
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }: any) {
            if (session.user) {
                session.user.id = token.id
            }
            return session
        }
    },
    session: {
        strategy: "jwt" as "jwt",
        maxAge: 30 * 24 * 60 * 60
    }
}