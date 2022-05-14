import React, { useLayoutEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from 'antd';
import { useLocation } from "react-router";
import type { Routers } from 'src/router/routes.d';
import { addRouters } from "src/router/routes";

const Index: React.FC<any> = () => {
    const location = useLocation();
    const breadcrumbNameMap = new Map();
    const [breadcrumbs, setBreadcrumbs] = useState<any>({});
    const pathSnippets = location.pathname.split('/').filter((i) => i);

    const homeBreadcrumb = [
        <Breadcrumb.Item key="/">
            <Link to="/">Dashboard</Link>
        </Breadcrumb.Item>
    ];

    const breadcrumbItems = useMemo(() => {
        return homeBreadcrumb.concat(pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            return (
                <Breadcrumb.Item key={url}>
                    <Link to={url}>{breadcrumbs[url]}</Link>
                </Breadcrumb.Item>
            );
        }));
    }, [breadcrumbs, location]);

    const initial:(router: Array<Routers>) => void = (router) => {
        const result: {[propsName:string]:string} = {};
        flatRoutes(router);
        for (const [key, value] of breadcrumbNameMap) {
            result[key] = value;
        }
        setBreadcrumbs(result);
    };

    const flatRoutes: (routes: Array<Routers>) => void = (routes) => {
        for (const { path, label, children } of routes) {
            if (path && label && !children) {
                breadcrumbNameMap.set(path, label);
            }
            if (children) {
                flatRoutes(children);
            }
        }
    };

    useLayoutEffect(() => {
        initial(addRouters);
    }, []);


    return (
        <Breadcrumb>
            {
                breadcrumbItems
            }
        </Breadcrumb>
    );
};

export default Index;
