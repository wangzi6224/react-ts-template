import React from "react";
import Layouts from "src/Layouts";
import { RouteObject } from "react-router-dom";
import { Demo1, Demo2, Demo3 } from "./routerElements";

const routes: Array<RouteObject> = [
    {
        path: "/",
        element: <Layouts/>,
        children: [
            {
                index: true,
                element: <Demo1/>
            },
            {
                path: "demo2",
                element: <Demo2/>
            },
            {
                path: 'demo3',
                element: <Demo3/>
            }
        ]
    }
];

export default routes;
