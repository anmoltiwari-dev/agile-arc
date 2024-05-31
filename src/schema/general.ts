import type { BoardTicket } from "@prisma/client";

export interface BoardTicketWithUser extends BoardTicket {
    assignedUser: {
        name: string | null;
    } | null;
};