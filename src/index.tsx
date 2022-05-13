import React from "react";
import App from "src/App";
import 'antd/dist/antd.less';
import { history } from "src/router";
import { createRoot } from 'react-dom/client';
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <React.StrictMode>
        <HistoryRouter history={history}>
            <App/>
        </HistoryRouter>
    </React.StrictMode>
);
