import React, { useCallback, useState } from "react";
import { Layout, Menu } from "antd";
import { history } from "src/router";
import { useLocation } from "react-router";
import { addRouters } from "src/router/routes";
import type { Routers } from 'src/router/routes.d';
import styles from "src/Layouts/styles/index.less";
import type { MenuItemType } from 'rc-menu/lib/interface';
import type { MenuInfo } from 'node_modules/rc-menu/lib/interface.d';

interface FilterHidden {
    (router: Array<Routers>) : Array<Routers>
}

const { Sider } = Layout;

const Sidebar:React.FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(!!JSON.parse(localStorage.getItem('collapsed') || 'false'));
    const location = useLocation();

    const filterHidden: FilterHidden = (router) => router.filter((r) => {
        if (r.children) {
            r.children = filterHidden(r.children);
        }
        return !r.hidden;
    });

    const getRouter: (router: Array<Routers>) => Array<MenuItemType> = (router) => {
        return router.map((r, i) => {
            if (r?.children) {
                return ({
                    key: i,
                    icon: r.icon,
                    label: r.label,
                    children: getRouter(r.children)
                });
            }
            return ({
                icon: r.icon,
                label: r.label,
                key: r.path as string
            });
        });
    };

    const routesCallback = useCallback(getRouter, []);

    const push = ({ key }: MenuInfo) => {
        history.push(key);
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
                onClick={push}
                selectedKeys={[location.pathname]}
                defaultSelectedKeys={[location.pathname]}
                items={routesCallback(filterHidden(addRouters))}
            />
        </Sider>
    );
};

export default Sidebar;
