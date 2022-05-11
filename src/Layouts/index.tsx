import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layouts: React.FC = () => {
    return (
        <div>
            Layouts
            <nav>
                <Link style={{ marginRight: "10px" }} to="/">index</Link>
                <Link style={{ marginRight: "10px" }} to="demo2">demo2</Link>
                <Link style={{ marginRight: "10px" }} to="demo3">demo3</Link>
            </nav>
            <Outlet/>
        </div>
    );
};

export default Layouts;
