import React from 'react';
import { classNameCompiler } from '../../utils';
import './button-edit.css';


export const ButtonEdit = ({className, ...props}: React.PropsWithChildren<any>) => {
  return <button className={classNameCompiler(className, "button-edit")} {...props} />;
}
