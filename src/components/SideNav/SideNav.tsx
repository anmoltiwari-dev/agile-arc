import { getAllBoards } from '@/app/actions/board';
import React from 'react'
import { SideNavItem } from './SideNavItem';
import SideNavSeparator from './SideNavSeparator';
import { useSession } from 'next-auth/react';
import cx from 'classnames';
import { auth } from '@/lib/auth';

interface SideNavProps {
    isMobileView?: boolean;
}

const SideNav = async ({ isMobileView = false }: SideNavProps) => {
    const session= await auth();
    if (!session) return <></>;
    const boardsData = await getAllBoards();
  return (
    <div className={cx('w-full sm:w-[250px] sidebar-bg', {
        ['hidden sm:block fixed']: !isMobileView
    })}>{
        boardsData.map((board) =>
            <>
                <SideNavItem key={board.id} id={board.id} title={board.title} />
                <SideNavSeparator />
            </>)
    }</div>
  )
}

export { SideNav };