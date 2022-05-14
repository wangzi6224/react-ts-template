export interface UseGlobalData<T = GlobalData> {
  (fn?: () => Promise<T>) : {
    contextData: T;
    GlobalData: T;
  }
}

export type GlobalData = any
