import React, { useState } from "react";
import type { MenuProps } from 'antd';
import { Outlet } from 'react-router-dom';
import styles from './index.less';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return {
        key,
        icon,
        children,
        label
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Option 1', '1', <PieChartOutlined/>),
    getItem('Option 2', '2', <DesktopOutlined/>),
    getItem('User', 'sub1', <UserOutlined/>, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5')
    ]),
    getItem('Team', 'sub2', <TeamOutlined/>, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined/>)
];

const Layouts: React.FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider theme="light" collapsible collapsed={collapsed} onCollapse={setCollapsed}>
                <div className={styles.logo}>
                    Logo
                </div>
                <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={items}/>
            </Sider>
            <Layout>
                <Header className={styles.siteLayoutBackground} style={{ padding: 0 }}>
                    Header
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <Outlet/>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Layouts;
