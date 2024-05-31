import { fetchBoard } from '@/app/actions/board'
import { Board } from '@/components/Board'
import { BoardTicketWithUser } from '@/schema/general';
import React from 'react'

interface BoardPageProps {
    params: {
        boardId: string;
    }
}

const BoardPage = async ({ params }:BoardPageProps) => {
    const { data } = await fetchBoard(params.boardId);
  return (
    <div className='pt-16 px-0 sm:ml-[250px] sm:px-3'>
        <Board boardColumns={data.boardColumns} boardTickets={data.boardTickets} />
    </div>
  )
}

export default BoardPage