declare interface Window<T, S = unknown> {
  acquireVsCodeApi: () => {
    getState: () => S;
    setState: (data: S) => void;
    postMessage: (payload: T) => void;
  };
  isVsCode: boolean;
}
