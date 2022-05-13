import {RouteObject} from "react-router-dom";
import React from "react";

interface Routers extends RouteObject {
    key?: string,
    label?: string,
    icon?: React.ReactNode,
    children?: Array<Routers>,
    meta?: {
        [propsName:string] :any
    },
}
