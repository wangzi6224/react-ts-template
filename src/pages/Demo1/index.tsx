import React, { useEffect } from "react";
import { useGlobalData } from "src/hooks/useGlobalData";

const Demo1: React.FC<any> = (props) => {
  const { GlobalData } = useGlobalData();

  useEffect(() => {
    console.log(GlobalData);
  }, []);

  return (
    <div>
      index
    </div>
  );
};

export default Demo1;
