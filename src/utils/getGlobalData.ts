export const getGlobalData: () => Promise<any> = () => {
  return new Promise((resolve, reject) => {
    try {
      resolve({ data: {} });
    } catch (e) {
      reject(e);
    }
  });
};
