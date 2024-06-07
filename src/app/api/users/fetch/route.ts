import { prismaClient } from "@/lib/primsa";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const users = await prismaClient.user.findMany();
        return Response.json({
            users
        }, {
            status: 200
        })
    } catch (err) {
        return Response.json({ error: { message: "Something went wrong!" } },  { status: 500 });
    }
}