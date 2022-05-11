import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import './index.less';
import renderRouter from "src/router/renderRouter";

const Suspense = (Component: any) => (props: any) => (
    <React.Suspense fallback={<span>111</span>}>
        <Component {...props} />
    </React.Suspense>
);

const Demo1 = Suspense(React.lazy(() => import('./pages/Demo1')));
const Demo2 = Suspense(React.lazy(() => import('./pages/Demo2')));

const App: React.FC = () => {
    return (
        <div>
            <nav>
                <Link to="/demo1">demo1</Link>
                <Link to="/demo2">demo2</Link>
            </nav>
            {
                renderRouter()
            }
        </div>
    );
};

export default App;

