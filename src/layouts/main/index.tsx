import React from "react";
import Header from '../../components/header';
import Logo from '../../components/logo';
import { classNameCompiler } from "../../utils";

import "./main-layout.css";

export default ({ children, className }: any) => (
    <>
      <Header>
        <Logo />
      </Header>
        <div className={classNameCompiler(className, "main-wrapper")}>
            {children}
        </div>
    </>
);
