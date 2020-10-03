import React from "react";
import { classNameCompiler } from "../../utils";
import "./header.css";

export default ({ children, className }: any) => (
    <>
        <div className={classNameCompiler(className, "page-header")}>
            {children}
        </div>
    </>
);
