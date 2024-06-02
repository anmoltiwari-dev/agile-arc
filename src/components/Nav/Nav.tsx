"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { get } from "@vercel/edge-config";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import NavAvatar from "./NavAvatar";
import ThemeToggle from "./ThemeToggle";
import { navData } from "@/lib/navData";
import { Composition, NavItemsInterface } from "./nav.type";
import { useSession } from "next-auth/react";
import customHook from "@/hooks";
import { NavCreateBtn } from "./index";

const NavContainer = (props: Composition) => {
    const { useWindowDimensions } = customHook;
  const { isDesktop } = useWindowDimensions();
  const { children } = props;
  const [toggleNav, setToggleNav] = useState(false);

  useEffect(() => {
    setToggleNav(isDesktop);
  }, [isDesktop]);

  return (
    <div className="bg-navBg fixed w-screen">
      {!isDesktop && (
        <HamburgerMenuIcon
          onClick={() => setToggleNav(!toggleNav)}
          height={30}
          width={30}
          className="ml-auto my-3 mr-3 text-white cursor-pointer"
          data-testid='hamburger-icon'
        />
      )}
      {toggleNav && children}
    </div>
  );
};

const NavRenderer = (props: Composition) => {
  const { children } = props;
  return (
    <div className="h-screen sm:h-[60px] flex flex-col sm:flex-row  items-center sm:justify-between border-b border-base">
      {children}
    </div>
  );
};
const NavLogo = () => {
  return <div className="background-nav text-white sm:ml-3">Logo</div>;
};
const NavItem = (props: NavItemsInterface) => {
  const { data: session, status } = useSession();
  const { children, authOnly = false } = props;
  if (authOnly && status !== 'authenticated') return <></>;
  return (
    <div className="background-nav text-white sm:mr-3 p-2 border rounded font-semibold border-none">
      {children}
    </div>
  );
};

const NavGroup = (props: Composition) => {
  const { children } = props;
  return (
    <div className="flex flex-col sm:flex-row items-center sm:justify-between">
      {children}
    </div>
  );
};

const Navbar = () => {
  const navItemMap = {
    logo: NavLogo,
    item: NavItem,
    avatar: NavAvatar,
    themeToggle: ThemeToggle,
    create: NavCreateBtn
  };
  return (
    <NavContainer>
      <NavRenderer>
        {navData.map((navGroup) => {
          return (
            <NavGroup key={navGroup.id}>
              {navGroup.items.map((nI, id) => {
                const Item = navItemMap[nI.type] || <></>;
                return <Item key={id} authOnly={nI.authOnly}>{nI?.content ? nI.content : null}</Item>;
              })}
            </NavGroup>
          );
        })}
      </NavRenderer>
    </NavContainer>
  );
};
export { Navbar, NavLogo, NavItem };
