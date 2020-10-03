import React from "react";

export default ({ className }: any) => (
  <div className={[...(className || []), "logo"].filter((v, i, s) => s.indexOf(v) === i).join(" ")} >
    Employee Test App
  </div >
);
