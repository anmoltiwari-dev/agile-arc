"use server"

import { prismaClient } from '../../lib/primsa';
import type { Board, BoardTicket } from '@prisma/client';

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
        include: {
            assignedUser: {
                select: {
                    name: true,
                }
            }
        },
        skip: Number(skip),
        take: Number(take)
    });

    const data = await Promise.all([board, boardColumns, boardTickets]);
    return {
        data: {
            board: data[0],
            boardColumns: data[1],
            boardTickets: data[2]
        }
    }
}

export const updateTicketsOnBackend = async (ticketsToUpdate: BoardTicket[]) => {
    const transactions = ticketsToUpdate.map((tk) => {
        return prismaClient.boardTicket.update({
            where: {
                id: tk.id,
            },
            data: {
                boardColumnId: tk.boardColumnId,
                position: tk.position
            }
        })
    });
    await prismaClient.$transaction(transactions);
};