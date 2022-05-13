import React, { useCallback, useState } from "react";
import styles from "src/Layouts/index.less";
import { Layout, Menu } from "antd";
import { addRouters } from "src/router/routes";
import { useLocation } from "react-router";
import { history } from "src/router";
import type { Routers } from 'src/router/routes.d';
import type { MenuInfo } from 'node_modules/rc-menu/lib/interface.d';

const { Sider } = Layout;

const Sidebar:React.FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(!!JSON.parse(localStorage.getItem('collapsed') || 'false'));
    const location = useLocation();

    const filterHidden: (router: Array<Routers>) => Array<Routers> = (router) => router.filter((r) => {
        if (r.children) {
            r.children = filterHidden(r.children);
        }
        return !r.hidden;
    });

    const getRouter: (router: Array<Routers>) => Array<Routers> = (router) => {
        return router.map((r) => {
            if (r.children) {
                return ({
                    label: r.label,
                    icon: r.icon,
                    children: getRouter(r.children)
                });
            }
            return ({
                key: r.path,
                label: r.label,
                icon: r.icon
            });
        });
    };

    const routesCallback = useCallback(getRouter, []);

    const handle = (ev: MenuInfo) => {
        history.push(ev.key);
    };

    const onCollapse = (ev: boolean) => {
        localStorage.setItem('collapsed', JSON.stringify(ev));
        setCollapsed(ev);
    };

    return (
        <Sider theme="light" collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className={styles.logo}>
                Logo
            </div>
            <Menu
                theme="light"
                mode="inline"
                onClick={handle}
                selectedKeys={[location.pathname]}
                defaultSelectedKeys={[location.pathname]}
                items={routesCallback(filterHidden(addRouters)) as any}
            />
        </Sider>
    );
};

export default Sidebar;
