import React from 'react';

interface TicketProps {
    title: string;
    assignee: string | null | undefined;
    storyPoint: number | null;
}

const Ticket = ({ title, assignee, storyPoint }: TicketProps) => {
  return (
    <div className='m-1 h-[200px] background-card p-3 rounded cursor-pointer relative'>
        <div className=''>{title}</div>
        {assignee && <div className='absolute top-2 right-2 rounded-full background-avatar text-white h-10 w-10 text-sm flex items-center justify-center font-semibold'>{assignee[0]}</div>}
        {storyPoint && <div className='absolute bottom-2 left-2 rounded-full background-box text-white h-7 w-7 text-sm flex items-center justify-center'>{storyPoint}</div>}
    </div>
  )
}

export { Ticket };