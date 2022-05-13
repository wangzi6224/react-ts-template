import React from "react";
import { Layout } from 'antd';
import styles from './index.less';
import { Outlet } from 'react-router-dom';
import Sidebar from "src/Layouts/Sidebar";
import Breadcrumbs from "src/Layouts/Breadcrumbs";

const { Header, Content } = Layout;

const Layouts: React.FC = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* 左侧边栏 */}
            <Sidebar />
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
