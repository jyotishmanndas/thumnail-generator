
import { prisma } from "@/lib/db";
import { baseProcedure, createTRPCRouter } from "../init";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs"
import { registerSchema } from "@/lib/schema";

export const authRouter = createTRPCRouter({
    signup: baseProcedure
        .input(registerSchema)
        .mutation(async ({ input }) => {
            try {
                const { email, password } = input;

                if (email) {
                    const existingUser = await prisma.user.findUnique({
                        where: {
                            email: email
                        }
                    })

                    if (existingUser) {
                        throw new TRPCError({
                            code: "CONFLICT",
                            message: "User with this email already exists."
                        })
                    }

                    const hashedPassword = await bcrypt.hash(password, 12)

                    const user = await prisma.user.create({
                        data: {
                            email,
                            password: hashedPassword,
                            emailVerified: new Date()
                        }
                    })
                    return user;
                }
            } catch (error) {
                console.log(error);

                if (error instanceof TRPCError) {
                    throw error; // Re-throw our business logic errors unchanged
                }

                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "An error occurred while signing up."
                })
            }
        })
})