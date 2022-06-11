import "@testing-library/jest-dom";

import { render as rtlRender } from "@testing-library/react";
import { RenderOptions as RTLRenderOptions } from "@testing-library/react";
import { ReactElement, FC, ReactNode } from "react";

import Providers from "containers/Providers/Providers";

export interface RenderOptions extends Omit<RTLRenderOptions, "queries"> {
  // Initial route for the default browser history
  route?: string;
}

export interface WrapperProps {
  children: ReactNode;
}

export interface Cases {
  [key: string]: string | number | boolean | undefined | null;
}

export const render = (ui: ReactElement, options: RenderOptions = {}) => {
  const { ...returnOptions } = options;
  // Wrapper component of the render function
  const Wrapper: FC<WrapperProps> = props => {
    const { children } = props;
    return <Providers>{children}</Providers>;
  };
  // Return renderer function with base options set
  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...returnOptions })
  };
};

export const casify = (cases: Cases) => {
  return Object.entries(cases).map(([caseTitle, testValue], index: number) => {
    return {
      name: `${index + 1}. ${caseTitle} - ${testValue}`,
      testValue
    };
  });
};

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
});

vi.mock("artisn/init", () => {
  return {
    createApp: vi.fn()
  };
});

vi.mock("aws-amplify", () => {
  return {
    Auth: {
      currentSession: vi.fn(() => ({
        getIdToken: vi.fn(() => ({
          getJwtToken: vi.fn(() => "fakeToken")
        }))
      })),
      currentAuthenticatedUser: vi.fn(() => ({}))
    },
    default: {
      configure: () => {}
    }
  };
});

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}));
