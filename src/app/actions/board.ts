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