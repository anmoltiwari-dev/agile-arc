"use client"

import { Draggable } from "@hello-pangea/dnd";
import React from "react";

interface TicketProps {
  index: number;
  id: string;
  title: string;
  assignee: string | null | undefined;
  storyPoint: number | null;
}

const Ticket = ({ id, title, assignee, storyPoint, index }: TicketProps) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="m-1 h-[200px] background-card p-3 rounded cursor-pointer relative"
        >
          <div className="">{title}</div>
          {assignee && (
            <div className="absolute top-2 right-2 rounded-full background-avatar text-white h-10 w-10 text-sm flex items-center justify-center font-semibold">
              {assignee[0]}
            </div>
          )}
          {storyPoint && (
            <div className="absolute bottom-2 left-2 rounded-full background-box text-white h-7 w-7 text-sm flex items-center justify-center">
              {storyPoint}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export { Ticket };
