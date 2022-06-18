declare interface Window {
  acquireVsCodeApi: <T = unknown>() => {
    getState: () => T;
    setState: (data: T) => void;
    postMessage: (msg: unknown) => void;
  };
  isVsCode: boolean;
}
