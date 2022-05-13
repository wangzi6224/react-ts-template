import React from "react";
import Layouts from "src/Layouts";
import type { Routers } from './routes.d';
import { Demo1, Demo2, Demo3 } from "./elements";
import { PieChartOutlined } from '@ant-design/icons';

export const addRouters: Array<Routers> = [
    {
        path: '/',
        index: true,
        label: 'Dashboard',
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
                        path: '/demo2',
                        label: 'demo2',
                        icon: <PieChartOutlined/>,
                        element: <Demo2/>
                    },
                    {
                        path: '/demo2/demo3',
                        label: 'demo3',
                        icon: <PieChartOutlined/>,
                        element: <Demo3/>,
                        hidden: true
                    }
                ]
            }
        ]
    },
    {
        label: 'demo3',
        path: '/demo2/demo3',
        icon: <PieChartOutlined/>,
        element: <Demo3/>,
        hidden: true
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
