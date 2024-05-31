import type { BoardColumn, BoardTicket, TicketStatus, User } from "@prisma/client";
import React from "react";
import { Ticket } from "./Ticket";
import { BoardTicketWithUser } from "@/schema/general";

interface BoardProps {
  boardColumns: BoardColumn[];
  boardTickets: BoardTicketWithUser[];
}

const Board = ({ boardColumns, boardTickets }: BoardProps) => {
  const fetchTicketForColumn = (colId: string) => {
    return boardTickets.filter((ticket) => ticket.boardColumnId === colId);
  };
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {boardColumns.map((column) => {
        return (
          <div
            key={column.id}
            className="grow basis-full background-neutral-static p-2"
          >
            <div className="text-subtlest font-semibold text-sm mb-5">
              {column.label}
            </div>
            <div className="">
              {fetchTicketForColumn(column.id).map((tk) => (
                <Ticket
                  key={tk.id}
                  title={tk.title}
                  assignee={tk?.assignedUser?.name}
                  storyPoint={tk.storyPoints}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export { Board };
