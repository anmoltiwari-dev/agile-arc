"use server"

import { prismaClient } from '../../lib/primsa';
import type { Board } from '@prisma/client';

export async function getAllBoards() {
    const boards = await prismaClient.board.findMany({
        select: {
            id: true,
            title: true
        }
    }) as Board[];
    return boards;
}

export async function fetchBoard(boardId: string, skip: number = 0, take: number = 10) {
    if (!boardId) {
        throw Error("Fields are missing")
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
    return {
        data: {
            board: data[0],
            boardColumns: data[1],
            boardTickets: data[2]
        }
    }
}