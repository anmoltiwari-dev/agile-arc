import { prismaClient } from '../../../../lib/primsa';
import { NextRequest } from 'next/server';
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const boardId = searchParams.get('boardId');
        const skip = searchParams.get('skip');
        const take = searchParams.get('take');
        if (!boardId || !skip || !take) {
            return Response.json({ error: { message: "Please provide correct params!" } },  { status: 400 });
        }
        const board = prismaClient.board.findUniqueOrThrow({
            where: {
                id: boardId
            }
        });
        const boardColumns = prismaClient.boardColumn.findMany({
            where: {
                boardId
            }
        });
        const boardTickets = prismaClient.boardTicket.findMany({
            where: {
                boardId
            },
            skip: Number(skip),
            take: Number(take)
        });

        const promiseArr = [board, boardColumns, boardTickets];
        const data = await Promise.all(promiseArr);
        return Response.json({ data: {
            board: data[0],
            boardColumns: data[1],
            boardTickets: data[2]
        } }, { status: 200 });
    } catch (err) {
        console.log(err);
        return Response.json({ error: { message: "Something went wrong!" } },  { status: 500 });
    }
}