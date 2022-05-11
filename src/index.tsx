import React from "react";
import App from "src/App";
import 'antd/dist/antd.less';
import { createRoot } from 'react-dom/client';
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

const container = document.getElementById('root');

const root = createRoot(container!);

const history = createBrowserHistory({ window });

root.render(
    <React.StrictMode>
        <HistoryRouter history={history}>
            <App/>
        </HistoryRouter>
    </React.StrictMode>
);
