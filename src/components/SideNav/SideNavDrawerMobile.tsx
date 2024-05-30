"use client"

import React, { ReactNode, useState } from 'react'
import { Drawer } from '@material-tailwind/react';
import { Component1Icon } from '@radix-ui/react-icons';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';

interface SideNavDrawerMobileProps {
    children: ReactNode;
}

const SideNavDrawerMobile = ({ children }: SideNavDrawerMobileProps) => {
    const [toggleDrawer, setToggleDrawer] = useState(false);
    const {isDesktop} = useWindowDimensions();
    if (isDesktop) return <></>;
  return (
    <>
        <Component1Icon height={30} width={30} className='text-white absolute left-3 top-3 z-[2]' onClick={() => setToggleDrawer(true)} />
        <Drawer placeholder={undefined} placement='bottom' className='sidebar-bg' open={toggleDrawer} onClose={() => setToggleDrawer(false)} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{children}</Drawer>
    </>
  );
}

export { SideNavDrawerMobile };