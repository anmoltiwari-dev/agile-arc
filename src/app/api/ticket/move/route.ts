import { prismaClient } from '../../../../lib/primsa';
import { NextRequest } from 'next/server';
import { schema } from '../../../../schema/moveTicket';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const response = schema.safeParse(body);
        if (!response.success) {
            return Response.json({ error: { message: "Fields missing in the body!" } },  { status: 400 });
        }
        const { boardId, ticketId, boardColumnId, position } = body;
        const ticketData = await prismaClient.boardTicket.update({
            where: {
                id: ticketId
            },
            data: {
                boardId, position, boardColumnId
            }
        });
        return Response.json({
            data: {
                ticketData
            }
        },
        { status: 200 });
    } catch (err) {
        console.log(err)
        return Response.json({ error: { message: "Something went wrong!" } },  { status: 500 });
    }
}