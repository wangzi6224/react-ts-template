import routes from './routes';
import { renderRouterTypes } from './routes.d';
import { Route, Routes } from "react-router-dom";
import React from "react";

const renderRouter: renderRouterTypes = (routesConfig) => {
    return (
        <Routes {...routesConfig}>
            {
                routes.map((route) => {
                    return (
                        <Route key={route.path} path={route.path} element={route.element}/>
                    );
                })
            }
        </Routes>
    );
};

export default renderRouter;
