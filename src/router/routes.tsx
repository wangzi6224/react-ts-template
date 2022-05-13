import React from "react";
import Layouts from "src/Layouts";
import type { Routers } from './routes.d';
import { Demo1, Demo2, Demo3 } from "./elements";
import { PieChartOutlined } from '@ant-design/icons';

export const addRouters: Array<Routers> = [
    {
        index: true,
        label: 'Dashboard',
        path: '/',
        key:'/',
        icon: <PieChartOutlined/>,
        element: <Demo1/>
    },
    {
        label: 'Father',
        icon: <PieChartOutlined/>,
        children: [
            {
                label: 'Child',
                icon: <PieChartOutlined/>,
                element: <Demo2/>,
                children: [
                    {
                        label: 'demo2',
                        path: '/demo2',
                        key:'/demo2',
                        icon: <PieChartOutlined/>,
                        element: <Demo2/>
                    }
                ]
            }
        ]
    },
    {
        label: 'demo3',
        path: '/demo3',
        key:'/demo3',
        icon: <PieChartOutlined/>,
        element: <Demo3/>
    }
];

const routes: Array<Routers> = [
    {
        path: "/",
        element: <Layouts/>,
        children: [
            ...addRouters
        ]
    }
];

export default routes;
