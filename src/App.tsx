import React from "react";
import './index.less';
import routes from "src/router/routes";
import { useRoutes, Link } from "react-router-dom";

const App: React.FC = () => {
    const element = useRoutes(routes);

    return (
        <div>
            {
                element
            }
        </div>
    );
};

export default App;

