import React from "react";
import App from "src/App";
import 'antd/dist/antd.less';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');

const root = createRoot(container!);

root.render(<App/>);
