import React from "react";
import { history } from "src/router";

const Demo2: React.FC<any> = () => {
  return (
    <div>
      <button onClick={() => {
        history.push('/demo2/demo3');
      }}>跳转子页面 /demo2/demo3</button>
      Demo2
    </div>
  );
};

export default Demo2;
