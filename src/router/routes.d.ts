import { RouteObject } from "react-router-dom";
import React from "react";
import type { MenuItemType } from 'rc-menu/lib/interface';

type GlobalRouter = Omit<MenuItemType, 'key'> & RouteObject;

interface Routers extends GlobalRouter {
    label?: string,
    icon?: React.ReactNode,
    children?: Array<Routers>,
    hidden?: boolean,
    meta?: {
        [propsName:string] :any
    },
}
