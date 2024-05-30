import { getAllBoards } from '@/app/actions/board';
import React from 'react'
import { SideNavItem } from './SideNavItem';
import SideNavSeparator from './SideNavSeparator';
import { useSession } from 'next-auth/react';
import { auth } from '@/lib/auth';

const SideNav = async () => {
    const session= await auth();
    if (!session) return <></>;
    const boardsData = await getAllBoards();
  return (
    <div className='fixed w-full sm:w-[250px] sidebar-bg h-[calc(100vh-60px)] mt-[60px]'>{
        boardsData.map((board) =>
            <>
                <SideNavItem key={board.id} id={board.id} title={board.title} />
                <SideNavSeparator />
            </>)
    }</div>
  )
}

export { SideNav };