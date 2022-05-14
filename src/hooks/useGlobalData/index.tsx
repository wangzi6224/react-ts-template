import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "src/App";
import type { UseGlobalData, GlobalData } from './index.d';

export const useGlobalData: UseGlobalData = (getDataCallback) => {
  const GlobalData = useContext(GlobalContext);
  const [contextData, setContextData] = useState<GlobalData>({ name: '' });

  useEffect(() => {
    getInitial();
  }, []);

  const getInitial = async () => {
    try {
      !!getDataCallback && setContextData(await getDataCallback());
    } catch (err) {
      console.log(err);
    }
  };

  return {
    contextData,
    GlobalData
  };
};
