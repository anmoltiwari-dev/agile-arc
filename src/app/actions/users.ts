"use server"

import { prismaClient } from '../../lib/primsa';
import type { Board, BoardTicket } from '@prisma/client';

export const getUsers = async () => {
    return (await prismaClient.user.findMany());
}