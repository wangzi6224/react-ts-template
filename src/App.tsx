import React, { createContext } from "react";
import './index.less';
import routes from "src/router/routes";
import { useRoutes } from "react-router-dom";
import { useGlobalData, getGlobalData } from "./hooks/useGlobalData";

export const GlobalContext = createContext({});

const App: React.FC = () => {
  const element = useRoutes(routes);

  const { contextData } = useGlobalData(async () => {
    try {
      return await getGlobalData();
    } catch (err) {
      console.warn(err);
    }
  });

  return (
    <GlobalContext.Provider value={contextData}>
      <>
        {
          contextData && element
        }
      </>
    </GlobalContext.Provider>
  );
};

export default App;

