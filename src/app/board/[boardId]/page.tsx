import { fetchBoard } from '@/app/actions/board'
import React from 'react'

interface BoardPageProps {
    params: {
        boardId: string;
    }
}

const BoardPage = async ({params}:BoardPageProps) => {
    const { data } = await fetchBoard(params.boardId);
    console.log(data)
  return (
    <div className='pt-16 sm:ml-[250px]'>{params.boardId}</div>
  )
}

export default BoardPage