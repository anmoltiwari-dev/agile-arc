import * as Avatar from "@radix-ui/react-avatar";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useState } from "react";

const NavAvatar = () => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const isLoggedIn = status === "authenticated";
  const [toggleLogoutPopup, setToggleLogoutPopup] = useState(false);
  return (
    <div className="relative sm:mr-3">
      {isLoading && (
        <Avatar.Root className="bg-blackA1 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
          <Avatar.Fallback className="skeleton w-full h-full animate-pulse" />
        </Avatar.Root>
      )}
      {!isLoading && isLoggedIn && (
        <Avatar.Root className="bg-blackA1 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
          <Avatar.Image
            className="h-full w-full rounded-[inherit] object-cover cursor-pointer"
            src={session?.user?.image || ""}
            alt="Profile Picture"
            onClick={() => setToggleLogoutPopup(!toggleLogoutPopup)}
          />
          <Avatar.Fallback className="skeleton w-full h-full animate-pulse" />
        </Avatar.Root>
      )}
      {!isLoggedIn && !isLoading && (
        <button
        onClick={() => signIn()}
        className="absolute cursor-pointer text-inverse button-brand p-2 rounded-sm"
      >
        Login
      </button>
      )}
      {toggleLogoutPopup && (
        <button
          onClick={() => signOut()}
          className="absolute cursor-pointer text-inverse button-brand right-2 p-2 rounded-sm top-full"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default NavAvatar;
