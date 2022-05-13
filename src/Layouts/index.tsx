import React, { useCallback, useState } from "react";
import styles from './index.less';
import { Layout, Menu } from 'antd';
import { history } from "src/router";
import { Outlet } from 'react-router-dom';
import { addRouters } from "src/router/routes";
import Breadcrumbs from "src/Layouts/Breadcrumbs";
import type { Routers } from 'src/router/routes.d';
import type { MenuInfo } from 'node_modules/rc-menu/lib/interface.d';
import { useLocation } from "react-router";

const { Header, Content, Sider } = Layout;

const Layouts: React.FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(!!JSON.parse(localStorage.getItem('collapsed') || 'false'));
    const location = useLocation();

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
        <Layout style={{ minHeight: '100vh' }}>
            {/* 左侧边栏 */}
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
                    items={routesCallback(addRouters) as any}
                />
            </Sider>
            {/* 右侧布局 */}
            <Layout>
                <Header className={styles.siteLayoutHeader}>
                    <Breadcrumbs />
                </Header>
                <Content style={{ margin: '16px' }}>
                    <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                        <Outlet/>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Layouts;
