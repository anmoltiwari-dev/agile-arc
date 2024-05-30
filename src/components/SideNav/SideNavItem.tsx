"use client"

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import cx from 'classnames';

interface SideNavItemProps {
    id: string;
    title: string;
}

const SideNavItem = ({id, title}: SideNavItemProps) => {
    const path = usePathname();
    const boardId = path.split('/')[2];
    const router = useRouter();
  return (
    <div className={cx('p-4 hover:bg-blue-300 hover:dark:bg-blue-800 cursor-pointer font-semibold text-sm', {
        'bg-blue-800': boardId === id
    })}
    onClick={() => router.push(`/board/${id}`)}
    >{title}</div>
  )
}

export { SideNavItem };