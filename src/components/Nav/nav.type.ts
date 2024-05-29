import { ReactNode } from "react";

export interface NavGroupInterface {
    id: number;
    items: NavItemInterface[];
}
export interface NavItemInterface {
    id: number;
    type: NavTypes;
    content?: string;
}

export interface Composition {
    children: ReactNode;
}

export enum NavTypes {
    LOGO = "logo",
    ITEM = "item",
    AVATAR = "avatar",
    THEME_TOGGLE = "themeToggle",
}

export type NavDataType = NavGroupInterface[];