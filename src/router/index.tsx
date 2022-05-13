import { createBrowserHistory, BrowserHistory } from "history";

export const history: {listen: (...params: any[]) => any} & BrowserHistory = createBrowserHistory({ window });
