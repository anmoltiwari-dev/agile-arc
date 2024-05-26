import GoogleProvider from "next-auth/providers/google";
import {NextAuthOptions} from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapter";
import { prismaClient } from "./primsa";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prismaClient) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || '',
            clientSecret: process.env.GOOGLE_SECRET || ''
        })
    ],
}