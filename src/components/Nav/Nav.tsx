"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { get } from "@vercel/edge-config";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import NavAvatar from "./NavAvatar";
import ThemeToggle from "./ThemeToggle";
import { navData } from "@/lib/navData";
import { Composition } from "./nav.type";

const NavContainer = (props: Composition) => {
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
const NavItem = (props: Composition) => {
  const { children } = props;
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
  useEffect(() => {
    const fetchConfig = async () => {
      const greetings = await get("greeting");
      console.log(greetings);
    };
    fetchConfig();
  }, []);
  const navItemMap = {
    logo: NavLogo,
    item: NavItem,
    avatar: NavAvatar,
    themeToggle: ThemeToggle,
  };
  return (
    <NavContainer>
      <NavRenderer>
        {navData.map((navGroup) => {
          return (
            <NavGroup key={navGroup.id}>
              {navGroup.items.map((nI, id) => {
                const Item = navItemMap[nI.type] || <></>;
                return <Item key={id}>{nI.content ? nI.content : null}</Item>;
              })}
            </NavGroup>
          );
        })}
      </NavRenderer>
    </NavContainer>
  );
};
export { Navbar, NavLogo, NavItem };
