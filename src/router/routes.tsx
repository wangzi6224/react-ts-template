import React from "react";
import { RouteProps } from "react-router";
import { Demo1, Demo2 } from "./routerElements";

const routes: Array<RouteProps> = [
    {
        path: "demo1",
        element: <Demo1/>
    },
    {
        path: "demo2",
        element: <Demo2/>
    }
];

export default routes;
