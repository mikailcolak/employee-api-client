import React from 'react';
import { classNameCompiler } from '../../utils';
import './button-add.css';


export const ButtonAdd = ({className, ...props}: React.PropsWithChildren<any>) => {
  return <button className={classNameCompiler(className, "button-add")} {...props} />;
}
