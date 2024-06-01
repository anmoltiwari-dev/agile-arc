"use client";

import type { BoardColumn } from "@prisma/client";
import React, { useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import type { OnDragEndResponder } from "@hello-pangea/dnd";
import cx from "classnames";
import { Ticket } from "./Ticket";
import { BoardTicketWithUser } from "@/schema/general";

interface BoardProps {
  boardColumns: BoardColumn[];
  boardTickets: BoardTicketWithUser[];
}

const Board = ({ boardColumns, boardTickets }: BoardProps) => {
  const [tickets, setTickets] = useState(boardTickets);
  const fetchTicketForColumn = (colId: string) => {
    return tickets.filter((ticket) => ticket.boardColumnId === colId).sort((a, b) => a.position - b.position);
  };

  const handleDragEnd: OnDragEndResponder = (result) => {
    const currentTickets = JSON.parse(JSON.stringify(tickets));
    const updatedTickets = currentTickets.map((tk: BoardTicketWithUser) => {
      if (tk.id === result.draggableId) {
        return {...tk, boardColumnId: result.destination?.droppableId, position: result.destination?.index}
      } else if (tk.boardColumnId === result.destination?.droppableId && tk.position >= result.destination?.index) {
        return {...tk, position: result.destination?.index + 1};
      } else if (tk.boardColumnId === result.source.droppableId && tk.position > result.source.index) {
        return {...tk, position: result.destination?.index - 1};
      }
      return tk;
    });
    setTickets(updatedTickets);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col sm:flex-row gap-3">
        {boardColumns.map((column) => {
          return (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cx("grow basis-full background-neutral-static p-2", {
                    ['background-board-drop'] : snapshot.isDraggingOver
                  })}
                >
                  <div className="text-subtlest font-semibold text-sm mb-5">
                    {column.label}
                  </div>
                  <div className="">
                    {fetchTicketForColumn(column.id).map((tk, index) => (
                      <Ticket
                        index={index}
                        id={tk.id}
                        key={tk.id}
                        title={tk.title}
                        assignee={tk?.assignedUser?.name}
                        storyPoint={tk.storyPoints}
                      />
                    ))}
                  </div>
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export { Board };
